window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  class Obstacle {
    constructor() {
      this.x = Math.random()*400;
      this.y = 0;
      this.h = 10;
      this.w = Math.random()*300;
    }
  }

  const obstaclesArray = [];

  function addObstacle() {
    obstaclesArray.push(new Obstacle());
  }

  const car = {
    x: 230,
    y: 600,
    w: 40,
    h: 80,
    score:0
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const carImage = new Image();
  carImage.src = "images/car.png";
  carImage.onload = function () {
    ctx.drawImage(carImage, car.x, car.y, car.w, car.h);
  };

  function move(event) {
    let key = event.key;
    if(key === "ArrowLeft") {
      moveLeft();
    }
    else if(key === "ArrowRight") {
      moveRight();
      
    }
  }

  function moveLeft() {
    if(car.x > 60) {
      car.x -= 10;
    }
  }

  document.addEventListener("keydown", move);

  function moveRight() {
    if(car.x < 400) {
      car.x += 10;
    }
  }

  function detectCollision(car, obstacle) {
    const carVerticalStart = car.x;
    const carVerticalEnd = car.x + car.w;
    const carHorizontalStart = car.y;
    const carHorizontalEnd = car.y + car.h;
    const obsVerticalStart = obstacle.x;
    const obsVerticalEnd = obstacle.x + obstacle.w;
    const obsHorizontalStart = obstacle.y;
    const obsHorizontalEnd = obstacle.y + obstacle.h;

    const verticalOverlapping = carVerticalStart < obsVerticalEnd && carVerticalStart > obsVerticalStart;
    const horizontalOverlapping = carHorizontalStart > obsHorizontalStart && carHorizontalEnd < obsHorizontalEnd;

    return verticalOverlapping && horizontalOverlapping;
  }
  let intervalId;
  function startGame() {
    intervalId = setInterval(addObstacle, 2000);
    playGame();
  }

  let game;

  function playGame() {
    game = window.requestAnimationFrame(playGame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Score: ${car.score}`, 70, 30);
    ctx.drawImage(carImage, car.x, car.y, car.w, car.h);
    ctx.fillStyle = "red"
    for(let i = 0; i < obstaclesArray.length; i++) {
      ctx.fillRect(obstaclesArray[i].x, obstaclesArray[i].y, obstaclesArray[i].w, obstaclesArray[i].h);
      obstaclesArray[i].y += 4;

      if(detectCollision(car, obstaclesArray[i])) {
        console.log("yes");
        gameEnds();
        break;
      }
    }
    car.score++;
  }

  function gameEnds() {
    window.cancelAnimationFrame(playGame);
    clearInterval(intervalId);
  }
};
