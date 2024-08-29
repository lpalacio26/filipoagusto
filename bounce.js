const logo = document.getElementById('logo');
const maxX = window.innerWidth - logo.width;
let x = 0;
let dx = 2;

function updatePosition() {
  x += dx;
  
  if (x <= 0 || x >= maxX) {
    dx = -dx;
  }
  
  logo.style.left = 2*x + 'px';
  
  requestAnimationFrame(updatePosition);
}

updatePosition();