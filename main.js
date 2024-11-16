let score = 0;
let timer = 10;
let gameInterval;
let targetInterval;

function startGame() {
    score = 0;
    timer = 10;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timer;

    document.getElementById('target').style.display = 'block';

    gameInterval = setInterval(updateTimer, 1000);
    targetInterval = setInterval(moveTarget, 300);
}

function updateTimer() {
    if (timer > 0) {
        timer--;
        document.getElementById('timer').textContent = timer;
    } else {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        alert("Fim de Jogo! Você fez " + score + " pontos.");
        document.getElementById('target').style.display = 'none';
    }
}

function moveTarget() {
    const gameArea = document.getElementById('gameArea');
    const target = document.getElementById('target');
    
    const maxX = gameArea.offsetWidth - target.offsetWidth;
    const maxY = gameArea.offsetHeight - target.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

document.getElementById('target').addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
});
