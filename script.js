const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
let changingDirection = false;
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  if (changingDirection) return;
  changingDirection = true;
  const keyPressed = event.keyCode;
  if (keyPressed === LEFT_KEY && dx !== 10) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === RIGHT_KEY && dx !== -10) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && dy !== 10) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === DOWN_KEY && dy !== -10) {
    dx = 0;
    dy = 10;
  }
}
let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];
let foodX;
let foodY;
let dx = 10;
let dy = 0;
let score = 0;
main();
function main() {
  if (didGameEnd()) return;
  setTimeout(() => {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  }, 50);
  function didGameEnd() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }
}
let clearCanvas = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
};
let randomNumber = (max, min) =>
  Math.round((Math.random() * (max - min) + min) / 10) * 10;
let createFood = () => {
  foodX = randomNumber(0, gameCanvas.width - 10);
  foodY = randomNumber(0, gameCanvas.height - 10);
  snake.forEach((snakePart) => {
    if (snakePart.x === foodX && snakePart.y === foodY) {
      createFood();
    }
  });
};
let advanceSnake = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === foodX && head.y === foodY) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
};
let drawSnake = () => snake.forEach(drawSnakePart);
let drawSnakePart = (snakePart) => {
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "black";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};
let drawFood = () => {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};
createFood();
