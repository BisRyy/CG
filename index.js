const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let points = [
  { x: 40, y: 20 },
  { x: 50, y: 10 },
  { x: 60, y: 20 },
  { x: 60, y: 40 },
  { x: 40, y: 40 },
];

for (let i = 100; i < canvas.width; i += 100) {
  context.fillStyle = "black";
  context.fillText(i, i, 10);
  context.fillStyle = "rgba(0, 0, 0, 0.1)";
  drawLineDDA(i, 0, i, canvas.height);
}

for (let i = 100; i < canvas.width; i += 100) {
  context.fillStyle = "black";
  context.fillText(i, 10, i);
  context.fillStyle = "rgba(0, 0, 0, 0.1)";
  drawLineDDA(0, i, canvas.width, i);
}

draw(points);

function draw(points) {
  context.fillStyle = "black";
  let prev = points[points.length - 1];
  for (point in points) {
    drawLineDDA(prev.x, prev.y, points[point].x, points[point].y);
    prev = points[point];
  }
}

function scale(points, sx, sy) {
  return points.map((point) => ({
    x: point.x * sx,
    y: point.y * sy,
  }));
}

function scaleWithPivot(points, sx, sy, pivot) {
  return points.map((point) => ({
    x: (point.x - pivot.x) * sx + pivot.x,
    y: (point.y - pivot.y) * sy + pivot.y,
  }));
}

function rotateWithPivot(points, angle, pivot) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return points.map((point) => ({
    x: (point.x - pivot.x) * cos - (point.y - pivot.y) * sin + pivot.x,
    y: (point.x - pivot.x) * sin + (point.y - pivot.y) * cos + pivot.y,
  }));
}

function drawLineDDA(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;
  let x = x1;
  let y = y1;
  for (let i = 0; i <= steps; i++) {
    putPixel(Math.round(x), Math.round(y));
    x += xIncrement;
    y += yIncrement;
  }
}

x = 1;
// setInterval(() => {
//   context.clearRect(10, 10, 90, 90);
//   draw(rotateWithPivot(points, (x % 5) * (Math.PI / 2), { x: 50, y: 25 }));
//   x += 1;
// }, 2000);

document.body.addEventListener("keypress", (e) => {
  if (e.key == "w") {
    context.clearRect(10, 10, 90, 90);
    draw(rotateWithPivot(points, ((x % 5) * Math.PI) / 2, { x: 50, y: 25 }));
    x += 1;
  }
});

function drawLineDDA(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;
  let x = x1;
  let y = y1;
  for (let i = 0; i <= steps; i++) {
    putPixel(Math.round(x), Math.round(y));
    x += xIncrement;
    y += yIncrement;
  }
}

function putPixel(x, y) {
  context.fillRect(x, y, 1, 1);
}
