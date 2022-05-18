var balls = document.querySelectorAll(".ball");
var body = document.querySelector("body");
var limitX = body.offsetWidth;
var limitY = body.offsetHeight;
var setForceX = null;
var setForceY = null;
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
  setForceX = (finalPos.x - initialPos.x) / 10;
  setForceY = (finalPos.y - initialPos.y) / 10;
});
console.log(limitY);
var i = 0;
async function loop() {
  while (true) {
    update(setForceX, setForceY);

    if (setForceY && setForceY != 0) {
      setForceY = setForceY < 0 ? setForceY + 1 : setForceY - 1;
    }
    if (setForceX && setForceX != 0) {
      setForceX = setForceX < 0 ? setForceX + 1 : setForceX - 1;
    }

    await sleep(60);
    i++;
  }
}
function update(forceX, forceY) {
  balls.forEach((x) => {
    var height = Number.parseFloat(x.style.top);
    height = isNaN(height) ? 0 : height;
    height += 10;
    var width = Number.parseFloat(x.style.left);
    width = isNaN(width) ? 0 : width;
    if (forceY) {
      height += forceY;
    }
    if (forceX) {
      width += forceX;
    }
    if (height + 100 >= limitY) {
      height += -10 - forceY;
    }
    if (width + 100 >= limitX) {
      width -= forceX;
    }
    x.style.top = `${height}px`;
    x.style.left = `${width}px`;
  });
}

loop();
