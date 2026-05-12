import os

DOMINO_PATH = "."

def ler_codigo(path):
    codigo_total = ""

    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith((".py", ".js", ".ts")):
                full_path = os.path.join(root, file)

                try:
                    with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                        codigo_total += f"\n\n===== FILE: {full_path} =====\n"
                        codigo_total += f.read()
                except Exception as e:
                    print(f"Erro ao ler {full_path}: {e}")

    return codigo_total


def analisar():
    codigo = ler_codigo(DOMINO_PATH)

    print("\n==============================")
    print("📦 CÓDIGO DO DOMINÓ CARREGADO")
    print("==============================\n")

    print(codigo[:4000])  # preview seguro

    print("\n==============================")
    print("🧠 PRÓXIMO PASSO")
    print("==============================")
    print("Agora este código pode ser enviado para a IA (OpenClaw / MiniMax / etc)")

if __name__ == "__main__":
    analisar()

