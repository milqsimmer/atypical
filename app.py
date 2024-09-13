from flask import Flask, jsonify, request, send_file, render_template
import os
import json

# Inicializa a aplicação Flask
app = Flask(__name__)

# Define o diretório onde os arquivos de conteúdo estão localizados
CONTEUDO_DIR = os.path.join(os.getcwd(), "conteudo")

# Função para ler arquivos JSON
def ler_arquivo_json(nome_arquivo):
    caminho_arquivo = os.path.join(CONTEUDO_DIR, nome_arquivo)
    with open(caminho_arquivo, 'r', encoding='utf-8') as f:
        dados = json.load(f)
    return dados

# Rota para a página inicial
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/material')
def material():
    return render_template('menu/material.html')

@app.route('/contato')
def contato():
    return render_template('menu/contato.html')

@app.route('/exercicios')
def exercicios():
    return render_template('menu/exercicios.html')

@app.route('/jogos')
def jogos():
    return render_template('menu/jogos.html')

# Rota para buscar um arquivo JSON e retornar o conteúdo
@app.route('/api/conteudo/<nome_arquivo>', methods=['GET'])
def pegar_conteudo_json(nome_arquivo):
    try:
        conteudo = ler_arquivo_json(nome_arquivo)
        return jsonify(conteudo)
    except FileNotFoundError:
        return jsonify({"erro": "Arquivo não encontrado"}), 404

# Iniciar o servidor
if __name__ == '__main__':
    app.run(debug=True)
