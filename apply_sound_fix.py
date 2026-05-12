#!/usr/bin/env python3
"""
Sound fix - Faz som funcionar
Executar: python3 apply_sound_fix.py
"""

HTML_FILE = "index-2.html"

with open(HTML_FILE, 'r') as f:
    content = f.read()

# Replace problematic audio with click-activated sound
OLD_AUDIO = '''const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Init sound on first interaction
let soundReady = false;
function initSound() {
  if (soundReady) return;
  try {
    audioCtx.resume();
    soundReady = true;
  } catch(e) {}
}
document.addEventListener('click', initSound, {once: true});
document.addEventListener('touchstart', initSound, {once: true});

function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();'''

NEW_AUDIO = '''// Sound - click to enable
let audioCtx = null;
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}
document.addEventListener('click', initAudio, {once:true});

function playSound(type) {
  if (!audioCtx) initAudio();
  if (audioCtx.state === 'suspended') initAudio();'''

content = content.replace(OLD_AUDIO, NEW_AUDIO)

# Replace auto-timeout sound with click handler
content = content.replace(
    "setTimeout(()=>{try{playSound('select');console.log('[SOUND TEST]')}catch(e){}},1500);",
    "// Click on pieces to play sounds"
)

with open(HTML_FILE, 'w') as f:
    f.write(content)

print("Sound fix applied!")
print("Agora usa 'open index-2.html' para testar")
