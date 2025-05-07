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