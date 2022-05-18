var balls = document.querySelectorAll(".ball");
var body = document.querySelector("body");
var limitX = body.offsetWidth;
var limitY = body.offsetHeight;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
console.log(limitY);
var i = 0;
async function loop() {
  var forceX = null;
  var forceY = null;
  while (true) {
    if (i % 40 == 0) {
      forceX += 20;
      forceY += -20;
    }
    update(forceX, forceY);
    forceY = forceY < 0 ? forceY + 1 : forceY - 1;
    forceX = forceX < 0 ? forceX + 1 : forceX - 1;

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
