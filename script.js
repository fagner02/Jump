var balls = document.querySelectorAll(".ball");
var body = document.querySelector("body");

// Define the limits of the screen
var limitX = body.offsetWidth;
var limitY = body.offsetHeight;
// Define the max limit
var maxLimit = Math.max(limitX, limitY);
// Define normalization vector
var normalize = { x: limitX / maxLimit, y: limitY / maxLimit };

// Define force with default values
var setForceX = 0;
var setForceY = 0;

// Define positions to calculate the movement
var initialPos = { x: 0, y: 0 };

var finalPos = { x: 0, y: 0 };

// Define function for waiting
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

// Define function to update forces and call update function
async function loop() {
  while (true) {
    update(setForceX, setForceY);

    if (setForceY > 1 || setForceY < -1) {
      setForceY = setForceY < 0 ? setForceY + 1 : setForceY - 1;
    } else {
      setForceY = 0;
    }

    if (setForceX > 1 || setForceX < -1) {
      setForceX = setForceX < 0 ? setForceX + 1 : setForceX - 1;
    } else {
      setForceX = 0;
    }

    await sleep(10);
  }
}

// Define function to update the position of the balls
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
