document.addEventListener('DOMContentLoaded', function() {
    // Faz a requisição GET para a API
    fetch('/api/conteudo/intro.json')
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
        // Pega os elementos do HTML onde o conteúdo será inserido
        const titulo = document.getElementById('titulo');
        const texto = document.getElementById('texto');

        // Preenche os campos com os dados recebidos da API
        titulo.textContent = data.titulo;
        texto.textContent = data.texto;
    })
    .catch(error => console.error('Erro ao carregar o conteúdo:', error));
});
