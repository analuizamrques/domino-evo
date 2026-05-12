#!/bin/bash
# Dominó EVO - Development Script
# Usa o Mac + Aider para desenvolver
# Usage: ./dev.sh

cd "$(dirname "$0")"

echo "🎮 Dominó EVO - Development"
echo "============================"
echo "1. Editar código (Aider)"
echo "2. Testar no Browser"
echo "3. Ver logs"
echo "4. Push para GitHub"
echo "5. Sair"
echo ""

while true; do
  echo -n "> "
  read choice

  case $choice in
    1)
      echo "📝 A abrir Aider..."
      aider index-2.html server.js
      ;;
    2)
      echo "🌐 A abrir no Browser..."
      open index-2.html
      ;;
    3)
      echo "📜 Logs do servidor..."
      if command -v curl &> /dev/null; then
        curl -s http://localhost:3000 2>/dev/null || echo "Servidor não está a correr"
      fi
      ;;
    4)
      echo "🚀 A fazer push..."
      git add -A
      git commit -m "Update via dev script" || echo "Nada para commit"
      git push origin main
      ;;
    5)
      echo "👋 Ade!"
      break
      ;;
    *)
      echo "Opção inválida"
      ;;
  esac
done