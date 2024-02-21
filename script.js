const board = document.getElementById('game-board');
let snake = [{x:10, y:10}];
let food = generateFood();
let direction = 'right';
const title = document.getElementById('title');
const logo = document.getElementById('logo');
let gameStart = false;
let gameSpeedDelay = 200;
let gameInterval;
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
let highScore = 0;

function draw () {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore()
}

function drawSnake () {
  snake.forEach((item) => {
    const snakeItem = createGameItem('div', 'snake');
    setPosition(snakeItem, item);
    board.appendChild(snakeItem);
  });
} 

function createGameItem (tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function drawFood() {
  if (gameStart) {
    const foodItem = createGameItem('div', 'food');
    setPosition(foodItem, food);
    board.appendChild(foodItem);
  }
}

function generateFood() {
  const x = Math.floor(Math.random() * 20) + 1;
  const y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

function move() {
  const head = {...snake[0]};
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function play() {
  gameStart = true;
  title.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay)
}

function handlePress(evt) {
  if (
    (!gameStart && evt.code === 'Space') ||
    (!gameStart && evt.key === '')
  ) {
    play();
  } else {
    switch (evt.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }
  }
}

document.addEventListener('keydown', handlePress);

function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if( head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
    reserGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      reserGame()
    }
  }
}

function reserGame() {
  updateHighScore();
  stopGame();
  snake = [{x:10, y:10}];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}

function stopGame() {
  clearInterval(gameInterval);
  gameStart = false;
  title.style.display = 'block';
  logo.style.display = 'block';
}