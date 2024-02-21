const board = document.getElementById('game-board');
let snake = [{x:10, y:10}];
let food = generateFood();
let direction = 'right';

function draw () {
  board.innerHTML = '';
  drawSnake();
  drawFood();
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
  const foodItem = createGameItem('div', 'food');
  setPosition(foodItem, food);
  board.appendChild(foodItem);
}

function generateFood() {
  const x = Math.floor(Math.random() * 20) + 1;
  const y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

draw();

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
  snake.pop();
}

setInterval(() => {
  move();
  draw();
}, 200);