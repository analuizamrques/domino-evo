import os

DOMINO_PATH = "/Users/anamarques/Library/Mobile Documents/iCloud~md~obsidian/Documents/Assistência Bea/EVO/prototypes/DOMINO EVO"

def listar_ficheiros(path):
    ficheiros = []
    for root, dirs, files in os.walk(path):
        for f in files:
            ficheiros.append(os.path.join(root, f))
    return ficheiros

def analisar_projeto():
    print("\n=== DOMINO EVO ANALYSIS ===\n")

    ficheiros = listar_ficheiros(DOMINO_PATH)

    print("Ficheiros encontrados:")
    for f in ficheiros:
        print(" -", f)

    print("\n=== SUGESTÕES BÁSICAS ===\n")

    print("1. Separar lógica do jogo em módulos (rules / engine / UI)")
    print("2. Garantir estado central do jogo (GameState único)")
    print("3. Criar sistema de validação de jogadas")
    print("4. Adicionar logs para debugging de jogadas")
    print("5. Preparar estrutura para IA futura (OpenClaw / bots)")

    print("\n=== PRÓXIMO PASSO RECOMENDADO ===")
    print("- Identificar ficheiro principal do jogo")
    print("- Refatorar lógica de jogadas primeiro")
    print("- Depois melhorar UI")

if __name__ == "__main__":
    analisar_projeto()

