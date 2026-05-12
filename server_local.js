// Dominó EVO - Local Server
// Para testar localmente: node domino_local.js

const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Dominó EVO Local Server OK');
});

const wss = new WebSocket.Server({ server });

const rooms = {};

function createAllTiles() {
  const t = [];
  for (let i = 0; i <= 6; i++)
    for (let j = i; j <= 6; j++)
      t.push({ a: i, b: j });
  return t;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function broadcast(room, msg) {
  room.players.forEach(ws => {
    if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg));
  });
}

function sendTo(ws, msg) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg));
}

function logGame(action, data) {
  console.log(`[${new Date().toISOString()}] ${action}`, data);
}

function canPlayTile(tile, state) {
  if (!state.board || state.board.length === 0) return true;
  const left = state.boardLeftEnd;
  const right = state.boardRightEnd;
  return tile.a === left || tile.b === left || tile.a === right || tile.b === right;
}

function tileEnds(tile, side, leftEnd, rightEnd) {
  if (side === 'left') {
    if (tile.b === leftEnd) return { a: tile.a, b: tile.b };
    if (tile.a === leftEnd) return { a: tile.b, b: tile.a };
  } else {
    if (tile.a === rightEnd) return { a: tile.a, b: tile.b };
    if (tile.b === rightEnd) return { a: tile.b, b: tile.a };
  }
  return null;
}

function validateMove(tile, side, state, playerIndex) {
  const hand = state.hands[playerIndex];
  if (!hand) return { valid: false, reason: 'Mão não encontrada' };
  
  const tileInHand = hand.find(t => t.a === tile.a && t.b === tile.b);
  if (!tileInHand) return { valid: false, reason: 'Peça não está na mão' };
  
  if (state.currentTurn !== playerIndex) {
    return { valid: false, reason: 'Não é a sua vez' };
  }
  
  if (!canPlayTile(tile, state)) {
    return { valid: false, reason: 'Peça não encaixa' };
  }
  
  return { valid: true };
}

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'join') {
      const roomId = msg.roomId || 'local';
      if (!rooms[roomId]) rooms[roomId] = { players: [], state: null };
      const room = rooms[roomId];

      if (room.players.length >= 2) {
        sendTo(ws, { type: 'error', message: 'Sala cheia!' });
        return;
      }

      ws.roomId = roomId;
      ws.playerIndex = room.players.length;
      room.players.push(ws);

      sendTo(ws, { type: 'joined', playerIndex: ws.playerIndex, roomId });
      logGame('PLAYER_JOIN', { roomId, playerIndex: ws.playerIndex });

      if (room.players.length === 2) {
        broadcast(room, { type: 'opponent_joined' });
        
        const all = shuffle(createAllTiles());
        const hand0 = all.slice(0, 7);
        const hand1 = all.slice(7, 14);
        
        room.state = {
          hands: [hand0, hand1],
          board: [],
          boardLeftEnd: null,
          boardRightEnd: null,
          currentTurn: 0,
          scores: [0, 0],
          gameOver: false
        };

        sendTo(room.players[0], { type: 'game_start', myIndex: 0, myHand: hand0, currentTurn: 0, oppHandCount: hand1.length, scores: [0, 0] });
        sendTo(room.players[1], { type: 'game_start', myIndex: 1, myHand: hand1, currentTurn: 0, oppHandCount: hand0.length, scores: [0, 0] });
        
        logGame('GAME_START', { roomId, tiles: all.length });
      } else {
        sendTo(ws, { type: 'waiting', message: 'Aguardando oponente...' });
      }
    }

    if (msg.type === 'place') {
      const room = rooms[ws.roomId];
      if (!room || !room.state) return;
      const s = room.state;
      
      const tile = s.hands[ws.playerIndex][msg.tileIndex];
      const validation = validateMove(tile, msg.side, s, ws.playerIndex);
      
      if (!validation.valid) {
        sendTo(ws, { type: 'error', message: validation.reason });
        logGame('VALIDATION_FAILED', { player: ws.playerIndex, reason: validation.reason });
        return;
      }
      
      const oriented = tileEnds(tile, msg.side, s.boardLeftEnd, s.boardRightEnd);
      s.hands[ws.playerIndex].splice(msg.tileIndex, 1);
      
      if (s.board.length === 0) {
        s.board.push({ tile: oriented });
        s.boardLeftEnd = oriented.a;
        s.boardRightEnd = oriented.b;
      } else {
        s.board.push({ tile: oriented });
        if (msg.side === 'left') s.boardLeftEnd = oriented.a;
        else s.boardRightEnd = oriented.b;
      }
      
      logGame('PLAYER_MOVE', { player: ws.playerIndex, tile: tile, side: msg.side });
      broadcast(room, { type: 'state_update', board: s.board, currentTurn: 1 - ws.playerIndex, hands: [s.hands[0].length, s.hands[1].length] });
      
      s.currentTurn = 1 - s.currentTurn;
    }

    if (msg.type === 'draw') {
      const room = rooms[ws.roomId];
      if (!room || !room.state) return;
      const s = room.state;
      
      if (s.boneyard && s.boneyard.length > 0) {
        const tile = s.boneyard.pop();
        s.hands[ws.playerIndex].push(tile);
        sendTo(ws, { type: 'draw', tile: tile });
        logGame('PLAYER_DRAW', { player: ws.playerIndex });
      }
    }

    if (msg.type === 'pass') {
      const room = rooms[ws.roomId];
      if (!room || !room.state) return;
      const s = room.state;
      s.currentTurn = 1 - s.currentTurn;
      broadcast(room, { type: 'pass', nextPlayer: s.currentTurn });
      logGame('PLAYER_PASS', { player: ws.playerIndex });
    }
  });

  ws.on('close', () => {
    if (!ws.roomId || !rooms[ws.roomId]) return;
    const room = rooms[ws.roomId];
    const idx = room.players.indexOf(ws);
    if (idx > -1) room.players.splice(idx, 1);
    if (room.players.length > 0) {
      broadcast(ws.roomId, { type: 'opponent_left' });
    }
    if (room.players.length === 0) {
      delete rooms[ws.roomId];
    }
    logGame('PLAYER_LEFT', { roomId: ws.roomId, playerIndex: idx });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Dominó EVO Local Server running on ws://localhost:${PORT}`);
});