const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  res.end('Domino EVO Server OK');

// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});

const wss = new WebSocket.Server({ server 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});

// Salas de jogo: roomId -> { players: [ws, ws], state: {} }
const rooms = {};

function createAllTiles() {
  const t = [];
  for (let i = 0; i <= 6; i++)
    for (let j = i; j <= 6; j++)
      t.push({ a: i, b: j 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
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
  
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

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
    
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

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
  
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

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
    broadcast(roomId, { type: 'game_over', message: msg, scores: rooms[roomId].state.scores 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
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
    
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
}

wss.on('connection', (ws) => {
  // Ping every 30s to keep connection alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) ws.ping();
  }, 30000);
  ws.on('pong', () => {
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  ws.on('close', () => { clearInterval(pingInterval); 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'join') {
      const roomId = msg.roomId || 'default';
      if (!rooms[roomId]) rooms[roomId] = { players: [], state: null };
      const room = rooms[roomId];

      if (room.players.length >= 2) {
        sendTo(ws, { type: 'error', message: 'Sala cheia!' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
        return;
      }

      ws.roomId = roomId;
      ws.playerIndex = room.players.length;
      ws.playerName = msg.playerName || 'Jogador';
      room.players.push(ws);

      const playerNames = room.players.map(p => p.playerName);
      sendTo(ws, { type: 'joined', playerIndex: ws.playerIndex, roomId, playerNames 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});

      
// If room is BOT, add bot player
if (roomId === 'BOT' && room.players.length === 1) {
  // Create bot
  const bot = {
    isBot: true,
    playerName: 'Computador',
    roomId: 'BOT'
  };
  room.players.push(bot);
  room.state = {
    tiles: createAllTiles(),
    playersHands: [[], []],
    boneyard: [],
    board: [],
    boardLeft: null,
    boardRight: null,
    currentTurn: 0,
    scores: [0, 0],
    canPass: false
  };
  // Deal cards
  const shuffled = shuffle(room.state.tiles);
  room.state.playersHands[0] = shuffled.slice(0, 7);
  room.state.playersHands[1] = shuffled.slice(7, 14);
  room.state.boneyard = shuffled.slice(14);
  
  sendTo(bot, {type:'game_start',myIndex:1,myHand:room.state.playersHands[1],currentTurn:0,boneyardCount:room.state.boneyard.length,oppHandCount:room.state.playersHands[0].length,scores:[0,0]
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  sendTo(room.players[0], {type:'game_start',myIndex:0,myHand:room.state.playersHands[0],currentTurn:0,boneyardCount:room.state.boneyard.length,oppHandCount:room.state.playersHands[1].length,scores:[0,0]
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  
  // Start bot moves
  botPlay(roomId);
  return;
}

if (room.players.length === 2) {
        broadcast(roomId, { type: 'opponent_joined' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
        setTimeout(() => startGame(roomId), 500);
      } else {
        sendTo(ws, { type: 'waiting', message: 'Aguardando oponente...' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
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
        sendTo(ws, { type: 'error', message: 'Peça não encaixa!' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
        return;
      }

      if (s.board.length === 0) {
        s.board.push({ tile: oriented 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
        s.boardLeftEnd = oriented.a;
        s.boardRightEnd = oriented.b;
      } else if (msg.side === 'left') {
        s.board.unshift({ tile: oriented 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
        s.boardLeftEnd = oriented.a;
      } else {
        s.board.push({ tile: oriented 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
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
        broadcast(ws.roomId, { type: 'rematch_waiting' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
      }
    }
  
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});

  ws.on('close', () => {
    if (!ws.roomId || !rooms[ws.roomId]) return;
    broadcast(ws.roomId, { type: 'opponent_left' 
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
    delete rooms[ws.roomId];
  
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});

// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});

const PORT = process.env.PORT || 3000;
// Keep-alive: ping every 14 min to prevent sleep
setInterval(() => {
  require('https').get('https://domino-evo.onrender.com', (res) => {
    console.log('Keep-alive:', res.statusCode);
  }).on('error', () => {
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
}, 14 * 60 * 1000);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  const https = require('https');
  setInterval(() => {
    https.get('https://domino-evo.onrender.com', () => {
      console.log('Keep-alive ping enviado');
    }).on('error', () => {
// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
  }, 14 * 60 * 1000);

// Bot simple logic
function botPlay(roomId) {
  const room = rooms[roomId];
  if (!room || room.players.length < 2) return;
  
  const bot = room.players.find(p => p.isBot);
  const human = room.players.find(p => !p.isBot);
  if (!bot || !human) return;
  
  // Wait a bit then play
  setTimeout(() => {
    const hand = room.state.botHand;
    const boardLeft = room.state.boardLeft;
    const boardRight = room.state.boardRight;
    
    // Find playable tile
    let tileIdx = -1;
    for (let i = 0; i < hand.length; i++) {
      const t = hand[i];
      if (t.a === boardLeft || t.b === boardLeft || t.a === boardRight || t.b === boardRight) {
        tileIdx = i;
        break;
      }
    }
    
    if (tileIdx >= 0) {
      const tile = hand[tileIdx];
      const side = (tile.a === boardLeft || tile.b === boardLeft) ? 'left' : 'right';
      bot.send(JSON.stringify({type:'place',tileIndex:tileIdx,side}));
    } else if (room.state.boneyard.length > 0) {
      bot.send(JSON.stringify({type:'draw'}));
    } else {
      bot.send(JSON.stringify({type:'pass'}));
    }
  }, 1500 + Math.random() * 2000);
}

});
# Rebuild trigger Mon May 11 22:46:45 WEST 2026
# Bot update Tue May 12 00:37:35 WEST 2026
