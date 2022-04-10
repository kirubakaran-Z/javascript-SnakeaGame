document.onkeydown = function (e) {
  switch (e.which) {
    case 32: // space
      startGame();
      break;
    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
};
let rows = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
];
let snakespeed = 600;
let indictor = document.querySelector(".indicator");
indictor.style.marginLeft = "-" + (snakespeed - 100) / 50 + "vw";
function increaseSpeed() {
  snakespeed -= 100;
  if (snakespeed < 100) {
    snakespeed = 100;
  }
  indictor.style.marginLeft = "-" + (snakespeed - 100) / 50 + "vw";
}
function decreaseSpeed() {
  snakespeed += 100;
  if (snakespeed > 1000) {
    snakespeed = 1000;
  }
  indictor.style.marginLeft = "-" + (snakespeed - 100) / 50 + "vw";
}
function home() {
  window.location.reload();
}
function restartGame() {
  let gameoverscreen = document.querySelector(".gameover");
  gameoverscreen.style.display = "none";
  startGame();
}
function startGame() {
  let scorepoints = 0;
  let direction = "right";
  const startscreen = document.querySelector(".start");
  startscreen.style.display = "none";
  foodlocation = SpanFood();
  let snakepresentX = [1, 1, 1, 1];
  let snakepresentY = [6, 6, 6, 6];
  document.onkeydown = function (e) {
    switch (e.which) {
      case 32: // space
        home();
        break;

      case 37: // left
        if (direction != "right") {
          direction = "left";
        }
        break;

      case 38: // up
        if (direction != "bottom") {
          direction = "top";
        }
        break;

      case 39: // right
        if (direction != "left") {
          direction = "right";
        }
        break;

      case 40: // down
        if (direction != "top") {
          direction = "bottom";
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  };
  let intervalId = window.setInterval(function () {
    renderSnake(snakepresentX, snakepresentY, direction, foodlocation);
  }, snakespeed);
  function gameover() {
    clearInterval(intervalId);
    for (let i = 0; i < snakepresentX.length - 1; i++) {
      let snake = document.querySelector(".snake");
      snake.classList.remove("snake");
    }
    let food = document.querySelector(".food");
    food.classList.remove("food");
    let score = document.querySelector(".scoreOver");
    score.innerHTML = scorepoints;
    let gameoverscreen = document.querySelector(".gameover");
    gameoverscreen.style.display = "grid";
  }
  function eat(x, y, foodlocation) {
    if (
      snakepresentX[x.length - 1] == foodlocation[0] &&
      y[y.length - 1] == foodlocation[1]
    ) {
      let food = document.querySelector(`.food`);
      food.classList.remove("food");
      x.unshift(x[x.length - 1]);
      y.unshift(y[y.length - 1]);
      foodlocation = SpanFood();
      scorepoints += 20;
      let score = document.querySelector(".score-board");
      score.innerHTML = scorepoints;
    }
    return foodlocation;
  }
  function SpanFood() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    let food = document.querySelector(`.${rows[y]}${x}`);
    food.classList.add("food");
    let foodAt = [x, y];
    return foodAt;
  }
  function colidesnake(headx, heady, x, y) {
    for (let i = 0; i < x.length - 1; i++) {
      if (headx == x[i] && y[i] == heady) {
        gameover();
      }
    }
  }
  function renderSnake(x, y, direction) {
    if (direction == "right") {
      colidesnake(x[x.length - 1] + 1, y[y.length - 1], x, y);
      x.push(x[x.length - 1] + 1);
      let snake = document.querySelector(`.${rows[y[0]]}${x[0]}`);
      snake.classList.remove("snake");
      y.push(y[y.length - 1]);
      x.shift(1);
      y.shift(1);
    } else if (direction == "left") {
      colidesnake(x[x.length - 1] - 1, y[y.length - 1], x, y);
      x.push(x[x.length - 1] - 1);
      let snake = document.querySelector(`.${rows[y[0]]}${x[0]}`);
      snake.classList.remove("snake");
      y.push(y[y.length - 1]);
      x.shift(1);
      y.shift(1);
    } else if (direction == "bottom") {
      colidesnake(x[x.length - 1], y[y.length - 1] + 1, x, y);
      y.push(y[y.length - 1] + 1);
      let snake = document.querySelector(`.${rows[y[0]]}${x[0]}`);
      snake.classList.remove("snake");
      x.push(x[x.length - 1]);
      y.shift(1);
      x.shift(1);
    } else if (direction == "top") {
      colidesnake(x[x.length - 1], y[y.length - 1] - 1, x, y);
      y.push(y[y.length - 1] - 1);
      let snake = document.querySelector(`.${rows[y[0]]}${x[0]}`);
      snake.classList.remove("snake");
      x.push(x[x.length - 1]);
      y.shift(1);
      x.shift(1);
    }
    moveSnake(x, y);
    foodlocation = eat(x, y, foodlocation);
  }
  function moveSnake(x, y) {
    if (
      x[x.length - 1] > 19 ||
      y[y.length - 1] < 0 ||
      x[x.length - 1] < 0 ||
      y[y.length - 1] > 19
    ) {
      gameover();
    } else if (x[x.length - 1] >= 0 && x[x.length - 1] < 20) {
      for (let i = 0; i < x.length; i++) {
        x[x.length - 1];
        let snake = document.querySelector(`.${rows[y[i]]}${x[i]}`);
        snake.classList.add("snake");
      }
    }
  }
}
