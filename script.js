let score = 0;
let gameInterval;
let squareInterval;
let gameTimer;
let timeRemaining;
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time-remaining");
const startButton = document.getElementById("start-button");
const difficultySelect = document.getElementById("difficulty");

function startGame() {
    score = 0;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    timeRemaining = getGameTime();  // Tempo baseado na dificuldade
    timeDisplay.textContent = `Tempo: ${timeRemaining / 1000}s`;
    startButton.disabled = true;

    // Cria os quadrados a intervalos baseados na dificuldade
    gameInterval = setInterval(createSquare, getSquareInterval());  // Quadrados aparecem em intervalos rápidos

    // Decrementa o tempo restante a cada segundo
    squareInterval = setInterval(decreaseTime, 1000);  // A cada 1 segundo, o tempo diminui

    // Inicia o temporizador do jogo
    gameTimer = setTimeout(endGame, timeRemaining);
}

function createSquare() {
    const square = document.createElement("div");
    square.classList.add("square");
    const size = 50;
    const maxX = gameArea.offsetWidth - size;
    const maxY = gameArea.offsetHeight - size;

    square.style.left = `${Math.random() * maxX}px`;
    square.style.top = `${Math.random() * maxY}px`;

    square.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = `Pontuação: ${score}`;
        square.remove();

        // Adiciona 2 segundos ao tempo restante sempre que o jogador clicar em um quadrado
        timeRemaining += 2000;  // Adiciona 2 segundos
        clearTimeout(gameTimer); // Cancela o temporizador atual
        gameTimer = setTimeout(endGame, timeRemaining); // Reinicia o temporizador com o novo tempo
    });

    gameArea.appendChild(square);

    // Diminui o tempo que o quadrado permanece na tela (mais rápido no modo difícil)
    setTimeout(() => {
        if (gameArea.contains(square)) {
            square.remove();
        }
    }, 200);  // O quadrado desaparece após 200ms, mais rápido no nível difícil
}

function decreaseTime() {
    // Decrementa o tempo restante a cada segundo
    timeRemaining -= 1000;
    timeDisplay.textContent = `Tempo: ${timeRemaining / 1000}s`;

    // Se o tempo chegar a 0, o jogo termina
    if (timeRemaining <= 0) {
        clearInterval(gameInterval);
        clearInterval(squareInterval);
        clearTimeout(gameTimer);
        endGame();  // Finaliza o jogo quando o tempo acabar
    }
}

function endGame() {
    // Finaliza o jogo e exibe a pontuação final
    alert(`Tempo esgotado! Sua pontuação final é: ${score}`);
    startButton.disabled = false;
}

function getGameTime() {
    const difficulty = difficultySelect.value;
    if (difficulty === "easy") {
        return 15000;  // Fácil: 15 segundos
    } else if (difficulty === "medium") {
        return 10000;   // Médio: 10 segundos
    } else {
        return 8000;   // Difícil: 8 segundos
    }
}

function getSquareInterval() {
    const difficulty = difficultySelect.value;
    if (difficulty === "easy") {
        return 1000;  // Fácil: quadrados aparecem a cada 1 segundo (mais devagar)
    } else if (difficulty === "medium") {
        return 700;  // Médio: quadrados aparecem a cada 0.7 segundo (mais devagar)
    } else {
        return 400;  // Difícil: quadrados aparecem a cada 0.4 segundo (ainda mais rápido)
    }
}

startButton.addEventListener("click", startGame);