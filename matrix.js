const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setupCanvas(); // Call the function initially to set up the canvas dimensions

const columns = Math.floor(canvas.width / 20);
const matrix = [];

for (let i = 0; i < columns; i++) {
  matrix[i] = Math.floor(Math.random() * canvas.height);
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.font = "15px Courier";
  for (let i = 0; i < columns; i++) {
    ctx.fillText(
      String.fromCharCode(Math.floor(Math.random() * 128)),
      i * 20,
      matrix[i] * 20
    );
    if (matrix[i] * 20 > canvas.height && Math.random() > 0.975) {
      matrix[i] = 0;
    }
    matrix[i]++;
  }
}

function update() {
  draw();
  // Adjust the value (e.g., 60) to change the speed. Lower values make it faster.
  setTimeout(() => requestAnimationFrame(update), 1000 / 10);
}

update();

