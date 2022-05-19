var balls = document.querySelectorAll(".ball");
var body = document.querySelector("body");

var limitX = body.offsetWidth;
var limitY = body.offsetHeight;
var maxLimit = Math.max(limitX, limitY);
var normalize = { x: limitX / maxLimit, y: limitY / maxLimit };

var setForceX = 0;
var setForceY = 0;

var initialPos = { x: 0, y: 0 };

var finalPos = { x: 0, y: 0 };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

body.addEventListener("mousedown", (e) => {
  initialPos.x = e.clientX;
  initialPos.y = e.clientY;
});
body.addEventListener("mousemove", (e) => {
  finalPos.x = e.clientX;
  finalPos.y = e.clientY;
});
body.addEventListener("mouseup", (e) => {
  setForceX = (finalPos.x - initialPos.x) / (normalize.x * 10);
  setForceY = (finalPos.y - initialPos.y) / (normalize.y * 10);
});

body.addEventListener("touchstart", (e) => {
  initialPos.x = e.touches[0].clientX;
  initialPos.y = e.touches[0].clientY;
});
body.addEventListener("touchmove", (e) => {
  finalPos.x = e.touches[0].clientX;
  finalPos.y = e.touches[0].clientY;
});
body.addEventListener("touchend", (e) => {
  setForceX = (finalPos.x - initialPos.x) / (normalize.x * 10);
  setForceY = (finalPos.y - initialPos.y) / (normalize.y * 10);
});

async function loop() {
  while (true) {
    update(setForceX, setForceY);

    if (setForceY > 1 || setForceY < -1) {
      setForceY = setForceY < 0 ? setForceY + 1 : setForceY - 1;
    } else {
      setForceY = 0;
    }

    console.log(setForceX);
    if (setForceX > 1 || setForceX < -1) {
      setForceX = setForceX < 0 ? setForceX + 1 : setForceX - 1;
    } else {
      setForceX = 0;
    }

    await sleep(10);
  }
}

function update(forceX, forceY) {
  balls.forEach((x) => {
    var height = Number.parseFloat(x.style.top);
    height = isNaN(height) ? 0 : height;
    height += 30;
    var width = Number.parseFloat(x.style.left);
    width = isNaN(width) ? 0 : width;

    height += forceY;
    width += forceX;

    if (height + 100 >= limitY) {
      height = limitY - 100;
    }
    if (width + 100 >= limitX) {
      width = limitX - 100;
    }
    x.style.top = `${height}px`;
    x.style.left = `${width}px`;
  });
}

loop();
