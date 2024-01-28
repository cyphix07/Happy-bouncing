console.log("hello world");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let vx = window.innerWidth;
let vy = window.innerHeight;
canvas.width = vx;
canvas.height = vy;

let mousex = 0;
let mousey = 0;

addEventListener("mousemove", (e) => {
  mousex = e.clientX;
  mousey = e.clientY;
});

const gravity = 0.99;
ctx.strokeWidth = 5;
function randomColor() {
  return `rgba(${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.ceil((Math.random() * 10) / 10)})`;
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startRadius = this.radius;
  this.x = Math.random() * (vx - this.radius * 2) + this.radius;
  this.y = Math.random() * (vy - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round(Math.random() - 0.5 * 10);
  this.vel = Math.random() / 5;
  this.update = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}
let bal = [];
for (let i = 0; i < 50; i++) {
  bal.push(new Ball());
}
function animate() {
  if (vx != window.innerWidth || vy != window.innerHeight) {
    vx = window.innerWidth;
    vy = window.innerHeight;
    canvas.width = vx;
    canvas.height = vy;
  }

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, vx, vy);
  for (let i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].dy;

    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= vy) {
      bal[i].dy = -bal[i].dy * gravity;
    } else {
      bal[i].dy += bal[i].vel;
    }
    if (bal[i].x + bal[i].radius > vx || bal[i].x - bal[i].radius < 0) {
      bal[i].dx = -bal[i].dx;
    }
    if (
      mousex > bal[i].x - 20 &&
      mousex < bal[i].x + 20 &&
      mousey > bal[i].y - 50 &&
      mousey < bal[i].y + 50 &&
      bal[i].radius < 70
    ) {
      bal[i].radius += 5;
    } else {
      if (bal[i].radius > bal[i].startRadius) {
        bal[i].radius += -5;
      }
    }
  }
}
animate();
setInterval(function () {
  bal.push(new Ball());
  bal.splice(0, 1);
}, 400);
