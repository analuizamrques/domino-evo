const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Domino EVO Server OK');
});

const wss = new WebSocket.Server({ server });

// Salas de jogo: roomId -> { players: [ws, ws], state: {} }
const rooms = {};


// Logger para debugging
function logGame(roomId, action, data) {
  const room = rooms[roomId];
  if (!room || !room.state) return;
  console.log(`[${new Date().toISOString()}] ${action}`, {
    players: room.players.length,
    board: room.state.board.length,
    turn: room.state.currentTurn,
    ...data
  });
}

// Validar jogada
function validateMove(tile, side, state, playerIndex) {
  const hand = state.hands[playerIndex];
  if (!hand) return { valid: false, reason: 'Mão não encontrada' };
  
  const tileInHand = hand.find(t => t.a === tile.a && t.b === tile.b);
  if (!tileInHand) return { valid: false, reason: 'Peça não está na mão' };
  
  if (state.currentTurn !== playerIndex) {
    return { valid: false, reason: 'Não é a sua vez' };
  }
  
  if (!canPlayTile(tile, state)) {
    return { valid: false, reason: 'Peça não encaixa no board' };
  }
  
  return { valid: true };
}


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
  rooms[room].players.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN)
      ws.send(JSON.stringify(msg));
  });
}

function sendTo(ws, msg) {
  if (ws.readyState === WebSocket.OPEN)
    ws.send(JSON.stringify(msg));
}

function startGame(roomId) {
  const room = rooms[roomId];
  const all = shuffle(createAllTiles());
  const hand0 = all.slice(0, 7);
  const hand1 = all.slice(7, 14);
  const boneyard = all.slice(14);

  const max0 = hand0.reduce((m, t) => t.a === t.b && t.a > m ? t.a : m, -1);
  const max1 = hand1.reduce((m, t) => t.a === t.b && t.a > m ? t.a : m, -1);
  const currentTurn = max0 >= max1 ? 0 : 1;

  room.state = {
    hands: [hand0, hand1],
    boneyard,
    board: [],
    boardLeftEnd: null,
    boardRightEnd: null,
    currentTurn,
    scores: [0, 0],
    gameOver: false,
    canPass: false
  };

  // Envia para cada jogador a sua mão e o estado público
  room.players.forEach((ws, idx) => {
    sendTo(ws, {
      type: 'game_start',
      myHand: room.state.hands[idx],
      myIndex: idx,
      currentTurn,
      boneyardCount: boneyard.length,
      oppHandCount: room.state.hands[1 - idx].length,
      scores: room.state.scores
    });
  });
}

function tileEnds(tile, side, leftEnd, rightEnd) {
  if (side === 'left') {
    if (leftEnd === null) return tile;
    if (tile.b === leftEnd) return tile;
    if (tile.a === leftEnd) return { a: tile.b, b: tile.a };
    return null;
  } else {
    if (rightEnd === null) return tile;
    if (tile.a === rightEnd) return tile;
    if (tile.b === rightEnd) return { a: tile.b, b: tile.a };
    return null;
  }
}

function canPlayTile(tile, state) {
  if (!state.board.length) return true;
  return tile.a === state.boardLeftEnd || tile.b === state.boardLeftEnd ||
         tile.a === state.boardRightEnd || tile.b === state.boardRightEnd;
}

function sumHand(hand) {
  return hand.reduce((s, t) => s + t.a + t.b, 0);
}

function endGame(roomId, winnerMsg) {
  const room = rooms[roomId];
  const s = room.state;
  s.gameOver = true;
  const sum0 = sumHand(s.hands[0]);
  const sum1 = sumHand(s.hands[1]);
  if (sum0 < sum1) s.scores[0] += sum1;
  else if (sum1 < sum0) s.scores[1] += sum0;

  broadcast(roomId, {
    type: 'game_over',
    message: winnerMsg,
    scores: s.scores,
    handSums: [sum0, sum1]
  });
}

function checkBlock(roomId) {
  const s = rooms[roomId].state;
  const p0Can = s.hands[0].some(t => canPlayTile(t, s));
  const p1Can = s.hands[1].some(t => canPlayTile(t, s));
  if (!p0Can && !p1Can && s.boneyard.length === 0) {
    const sum0 = sumHand(s.hands[0]);
    const sum1 = sumHand(s.hands[1]);
    let msg;
    if (sum0 < sum1) { rooms[roomId].state.scores[0] += sum1; msg = 'Bloqueou! Jogador 1 vence!'; }
    else if (sum1 < sum0) { rooms[roomId].state.scores[1] += sum0; msg = 'Bloqueou! Jogador 2 vence!'; }
    else msg = 'Empate no bloqueio!';
    broadcast(roomId, { type: 'game_over', message: msg, scores: rooms[roomId].state.scores });
    return true;
  }
  return false;
}

function sendStateUpdate(roomId) {
  const room = rooms[roomId];
  const s = room.state;
  room.players.forEach((ws, idx) => {
    sendTo(ws, {
      type: 'state_update',
      myHand: s.hands[idx],
      board: s.board,
      currentTurn: s.currentTurn,
      boneyardCount: s.boneyard.length,
      oppHandCount: s.hands[1 - idx].length,
      boardLeftEnd: s.boardLeftEnd,
      boardRightEnd: s.boardRightEnd,
      scores: s.scores,
      canPass: s.canPass && s.currentTurn === idx
    });
  });
}

wss.on('connection', (ws) => {
  // Ping every 30s to keep connection alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) ws.ping();
  }, 30000);
  ws.on('pong', () => {});
  ws.on('close', () => { clearInterval(pingInterval); });
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    console.log('JOIN from', msg.playerName, 'room', msg.roomId);
      const roomId = msg.roomId || 'default';
      if (!rooms[roomId]) rooms[roomId] = { players: [], state: null };
      const room = rooms[roomId];

      if (room.players.length >= 2) {
        sendTo(ws, { type: 'error', message: 'Sala cheia!' });
        return;
      }

      ws.roomId = roomId;
      ws.playerIndex = room.players.length;
      room.players.push(ws); console.log('Player added, total:', room.players.length);

      sendTo(ws, { type: 'joined', playerIndex: ws.playerIndex, roomId });

      if (room.players.length === 2) {
        console.log('BROADCAST opponent_joined to room', roomId, 'players:', room.players.length);
        setTimeout(() => startGame(roomId), 500);
      } else {
        sendTo(ws, { type: 'waiting', message: 'Aguardando oponente...' });
      }
    }

    if (msg.type === 'place') {
      const room = rooms[ws.roomId];
      if (!room) return;
      const s = room.state;
      if (s.gameOver || s.currentTurn !== ws.playerIndex) return;

      const hand = s.hands[ws.playerIndex];
      const tileIdx = msg.tileIndex;
      if (tileIdx < 0 || tileIdx >= hand.length) return;

      const tile = hand[tileIdx];
      const oriented = tileEnds(tile, msg.side, s.boardLeftEnd, s.boardRightEnd);
      if (!oriented) {
        sendTo(ws, { type: 'error', message: 'Peça não encaixa!' });
        return;
      }

      if (s.board.length === 0) {
        s.board.push({ tile: oriented });
        s.boardLeftEnd = oriented.a;
        s.boardRightEnd = oriented.b;
      } else if (msg.side === 'left') {
        s.board.unshift({ tile: oriented });
        s.boardLeftEnd = oriented.a;
      } else {
        s.board.push({ tile: oriented });
        s.boardRightEnd = oriented.b;
      }

      hand.splice(tileIdx, 1);
      s.canPass = false;

      if (hand.length === 0) {
        endGame(ws.roomId, `Jogador ${ws.playerIndex + 1} venceu! 🎉`);
        return;
      }

      s.currentTurn = 1 - ws.playerIndex;

      if (checkBlock(ws.roomId)) return;
      sendStateUpdate(ws.roomId);
    }

    if (msg.type === 'draw') {
      const room = rooms[ws.roomId];
      if (!room) return;
      const s = room.state;
      if (s.gameOver || s.currentTurn !== ws.playerIndex || s.boneyard.length === 0) return;

      const drawn = s.boneyard.pop();
      s.hands[ws.playerIndex].push(drawn);

      if (!s.hands[ws.playerIndex].some(t => canPlayTile(t, s)) && s.boneyard.length === 0) {
        s.canPass = true;
      }

      sendStateUpdate(ws.roomId);
    }

    if (msg.type === 'pass') {
      const room = rooms[ws.roomId];
      if (!room) return;
      const s = room.state;
      if (s.gameOver || s.currentTurn !== ws.playerIndex || !s.canPass) return;

      s.canPass = false;
      s.currentTurn = 1 - ws.playerIndex;

      if (checkBlock(ws.roomId)) return;
      sendStateUpdate(ws.roomId);
    }

    if (msg.type === 'rematch') {
      const room = rooms[ws.roomId];
      if (!room) return;
      if (!room.rematchVotes) room.rematchVotes = 0;
      room.rematchVotes++;
      if (room.rematchVotes >= 2) {
        room.rematchVotes = 0;
        startGame(ws.roomId);
      } else {
        broadcast(ws.roomId, { type: 'rematch_waiting' });
      }
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
  });
});

const PORT = process.env.PORT || 3000;
// Keep-alive: ping every 14 min to prevent sleep
setInterval(() => {
  require('https').get('https://domino-evo.onrender.com', (res) => {
    console.log('Keep-alive:', res.statusCode);
  }).on('error', () => {});
}, 14 * 60 * 1000);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  const https = require('https');
  setInterval(() => {
    https.get('https://domino-evo.onrender.com', () => {
      console.log('Keep-alive ping enviado');
    }).on('error', () => {});
  }, 14 * 60 * 1000);
});
# Rebuild trigger Mon May 11 22:46:45 WEST 2026
