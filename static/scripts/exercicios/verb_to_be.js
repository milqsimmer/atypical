document.addEventListener('DOMContentLoaded', function() {
    // Carrega o JSON dos exercícios
    fetch('/api/conteudo/exercicios_verb_to_be.json')
    .then(response => response.json())
    .then(data => {
        const titulo = document.querySelector('#exercicio h1');
        titulo.textContent = data.titulo;

        // Carrega os exercícios
        data.exercicios.forEach((exercicio, index) => {
            const perguntasDiv = document.createElement('div');
            perguntasDiv.id = `exercicio-${index + 1}`;
            perguntasDiv.innerHTML = `<h2>${index + 1}. ${exercicio.titulo}</h2>`;

            // Adiciona cada pergunta ao exercício correspondente
            exercicio.perguntas.forEach(pergunta => {
                const perguntaHtml = `
                    <p>${pergunta.pergunta} <input type="text" id="${pergunta.id}" />
                    <span id="feedback${pergunta.id}" class="feedback"></span></p>
                `;
                perguntasDiv.innerHTML += perguntaHtml;
            });

            // Adiciona um botão de verificação ao final de cada exercício
            perguntasDiv.innerHTML += `
                <div style="text-align: center; margin-top: 20px">
                    <button type="button" onclick="verificarExercicio(${index + 1})">Verificar Exercício ${index + 1}</button>
                </div>
            `;

            // Adiciona o exercício ao DOM
            document.querySelector('#exercicio').appendChild(perguntasDiv);
        });
    })
    .catch(error => console.error('Erro ao carregar os exercícios:', error));
});

// Função para verificar as respostas dos exercícios
function verificarExercicio(numeroExercicio) {
    fetch('/api/conteudo/exercicios_verb_to_be.json')
    .then(response => response.json())
    .then(data => {
        const exercicio = data.exercicios[numeroExercicio - 1]; // Seleciona o exercício correto

        exercicio.perguntas.forEach(pergunta => {
            const respostaUsuario = document.getElementById(pergunta.id).value.trim().toLowerCase(); // Pega a resposta do usuário
            const feedbackElement = document.getElementById(`feedback${pergunta.id}`); // Seleciona o elemento de feedback

            // Verifica se a resposta correta é um array (para respostas múltiplas como "am not" e "'m not")
            if (Array.isArray(pergunta.resposta_correta)) {
                // Verifica se a resposta do usuário está dentro do array de respostas corretas
                if (pergunta.resposta_correta.includes(respostaUsuario)) {
                    feedbackElement.textContent = " Correto";
                    feedbackElement.className = "feedback correct";
                } else {
                    feedbackElement.textContent = ` Errado. Resposta correta: "${pergunta.resposta_correta.join(' ou ')}"`;
                    feedbackElement.className = "feedback incorrect";
                }
            } else {
                // Se for uma única resposta correta
                if (respostaUsuario === pergunta.resposta_correta.toLowerCase()) {
                    feedbackElement.textContent = " Correto";
                    feedbackElement.className = "feedback correct";
                } else {
                    feedbackElement.textContent = ` Errado. Resposta correta: "${pergunta.resposta_correta}"`;
                    feedbackElement.className = "feedback incorrect";
                }
            }
        });
    })
    .catch(error => console.error('Erro ao verificar as respostas do exercício:', error));
}
