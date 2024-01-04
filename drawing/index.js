const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// DDA Line Algorithm
function ddaLine(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = Math.max(Math.abs(dx), Math.abs(dy));
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;
  let x = x1;
  let y = y1;
  let pointsOnLine = [];
  pointsOnLine.push({ x: Math.round(x), y: Math.round(y) });

  for (let i = 1; i <= steps; i++) {
    x += xIncrement;
    y += yIncrement;
    pointsOnLine.push({ x: Math.round(x), y: Math.round(y) });
  }

  return pointsOnLine;
}

function drawLineOnCanvas(points) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.stroke();
  ctx.closePath();
}


function putPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

// Bresenham's Line Algorithm
function bresenhamLine(x1, y1, x2, y2) {
  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let slope = dy > dx;

  if (slope) {
    [x1, y1] = [y1, x1];
    [x2, y2] = [y2, x2];
  }

  if (x1 > x2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
  }

  let dx2 = x2 - x1;
  let dy2 = Math.abs(y2 - y1);
  let error = 0;
  let deltaError = dy2 / dx2;
  let y = y1;

  for (let x = x1; x <= x2; x++) {
    putPixel(slope ? y : x, slope ? x : y);
    error += deltaError;
    if (error >= 0.5) {
      y += y2 > y1 ? 1 : -1;
      error -= 1.0;
    }
  }
}

// Midpoint Circle Drawing Algorithm
function midpointCircle(radius, xc, yc) {
  let x = radius;
  let y = 0;
  let decision = 1 - radius;

  while (y <= x) {
    putPixel(xc + x, yc - y);
    putPixel(xc - x, yc - y);
    putPixel(xc + x, yc + y);
    putPixel(xc - x, yc + y);
    putPixel(xc + y, yc - x);
    putPixel(xc - y, yc - x);
    putPixel(xc + y, yc + x);
    putPixel(xc - y, yc + x);
    y++;

    if (decision <= 0) {
      decision += 2 * y + 1;
    } else {
      x--;
      decision += 2 * (y - x) + 1;
    }
  }
}

// Bresenham's Circle Drawing Algorithm
function bresenhamCircle(radius, xc, yc) {
  let x = 0;
  let y = radius;
  let d = 3 - 2 * radius;

  while (x <= y) {
    putPixel(xc + x, yc - y);
    putPixel(xc - x, yc - y);
    putPixel(xc + x, yc + y);
    putPixel(xc - x, yc + y);
    putPixel(xc + y, yc - x);
    putPixel(xc - y, yc - x);
    putPixel(xc + y, yc + x);
    putPixel(xc - y, yc + x);

    x++;

    if (d < 0) {
      d = d + 4 * x + 6;
    } else {
      y--;
      d = d + 4 * (x - y) + 10;
    }
  }
}

function fourConnectedFill1(x, y, fillColor){
    const currentColor = ctx.getImageData(x, y, 1, 1).data;
    if(currentColor[0] === fillColor[0] && currentColor[1] === fillColor[1] && currentColor[2] === fillColor[2]){
        return;
    }
    ctx.fillRect(x, y, 1, 1);
    fourConnectedFill(x+1, y, fillColor);
    fourConnectedFill(x-1, y, fillColor);
    fourConnectedFill(x, y+1, fillColor);
    fourConnectedFill(x, y-1, fillColor);
}

function boundaryFill(x, y, fillColor, borderColor, c=1){
    if(c > 1000){
        return;
    }
    const currentColor = ctx.getImageData(x, y, 1, 1).data;
    if(currentColor[0] === fillColor[0] && currentColor[1] === fillColor[1] && currentColor[2] === fillColor[2]){
        return;
    }
    if(currentColor[0] === borderColor[0] && currentColor[1] === borderColor[1] && currentColor[2] === borderColor[2]){
        return;
    }
    ctx.fillRect(x, y, 1, 1);
    boundaryFill(x+1, y, fillColor, borderColor, c+1);
    boundaryFill(x-1, y, fillColor, borderColor, c+1);
    boundaryFill(x, y+1, fillColor, borderColor, c+1);
    boundaryFill(x, y-1, fillColor, borderColor, c+1);

    // handle max recursion depth
    // setTimeout(() => {
    //     boundaryFill(x+1, y, fillColor, borderColor);
    
}

function fillAll(){
    // fill all the convas with red
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(100,100,100,100);
    
}



// // Example usage
// let startPoint = { x: 10, y: 10 };
// let endPoint = { x: 100, y: 50 };

// // DDA Line Algorithm
// let linePoints = ddaLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
// drawLineOnCanvas(linePoints);

// startPoint = { x: 10, y: 100 };
// endPoint = { x: 100, y: 150 };

// // Bresenham's Line Algorithm
// bresenhamLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

// // Midpoint Circle Drawing Algorithm
// let circleRadius = 30;
// let circleCenter = { x: 150, y: 150 };
// midpointCircle(circleRadius, circleCenter.x, circleCenter.y);

// // Bresenham's Circle Drawing Algorithm
// let bresenhamCircleRadius = 40;
// let bresenhamCircleCenter = { x: 250, y: 150 };
// bresenhamCircle(bresenhamCircleRadius, bresenhamCircleCenter.x, bresenhamCircleCenter.y);

