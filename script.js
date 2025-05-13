const playBoard = document.querySelector(".play-board"); //playboard = tabuleiro. container onde a cobra e a comida sao renderizadas
const scoreElement = document.querySelector(".score"); //pontuação atual do jogador
const highScoreElement = document.querySelector(".high-score"); //recorde maior pontuaçao
const controls = document.querySelectorAll(".controls i"); //controle de movimento. seleciona os icones (i) de botoes mobile


//cadastro de variaveis
let gameOver = false; //variavel booleana que indica se o jogo terminou
let foodX, foodY; //variavel para armazenar as coordenadas x e y da comida
let snakeX = 5, snakeY = 5; //armazena as coordenadas x e y da cabeça da cobra (posição inicial de 5)
let velocityX = 0, velocityY = 0; //armazena a velocidade nas direçoes x e y inicialmente em 0 pos a cobra esta parada
let snakeBody = []; //array para armazenar as coordenadas de cada segmento do corpo, sendo o primeiro a cabeça
let setIntervalId; //variavel para manter o controle da pontuaçao atual do jogador
let score = 0;

let highScore = localStorage.getItem(".high-score") || 0; /* obtenha pontuaçao alta do armazenamento local e tenta recuperar 
o valor associado à chave "high-score" do armazenamento local do navegador */
// se o localStorage retornar null (caso ele nao exista) a váriavel highScore será = 0

const updateFoodPosition = () => {
    //Math.random() = retorna um numero de ponto flutuante pseudoaleatório entre 0 e 1
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Você perdeu! ＞﹏＜ Aperte Ok para reiniciar.")
    location.reload();
}

const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityY != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityY != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key})));

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.getItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i --) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }

        playBoard.innerHTML = html;
    }
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);