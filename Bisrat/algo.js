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

function star(centerX, centerY, outerRadius, innerRadius) {
  const angleIncrement = Math.PI / 2.5;

  let firstPointX = centerX + Math.cos(0) * innerRadius;
  let firstPointY = centerY + Math.sin(0) * innerRadius;

  for (let i = 0; i < 5; i++) {
    let outerX = centerX + Math.cos(i * angleIncrement) * innerRadius;
    let outerY = centerY + Math.sin(i * angleIncrement) * innerRadius;
    let innerX = centerX + Math.cos((i + 0.5) * angleIncrement) * outerRadius;
    let innerY = centerY + Math.sin((i + 0.5) * angleIncrement) * outerRadius;
    if (i == 0) {
      drawLineDDA(firstPointX, firstPointY, outerX, outerY);
      drawLineDDA(outerX, outerY, innerX, innerY);
    } else {
      drawLineDDA(x, y, outerX, outerY);
      drawLineDDA(outerX, outerY, innerX, innerY);
    }
    (x = innerX), (y = innerY);
  }
  drawLineDDA(x, y, firstPointX, firstPointY);
}

function isSameColor(color1, color2) {
  return (
    color1[0] === color2[0] &&
    color1[1] === color2[1] &&
    color1[2] === color2[2] &&
    color1[3] === color2[3]
  );
}
function boundaryFill(x, y, fillColor, boundaryColor) {
  const stack = [];
  stack.push({ x, y });

  while (stack.length) {
    const { x, y } = stack.pop();
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixel = imageData.data;

    if (
      x >= 0 &&
      y >= 0 &&
      x < canvas.width &&
      y < canvas.height &&
      !isSameColor(pixel, boundaryColor) &&
      !isSameColor(pixel, fillColor)
    ) {
      ctx.fillStyle = `rgba(${fillColor[0]}, ${fillColor[1]}, ${
        fillColor[2]
      }, ${fillColor[3] / 255})`;
      putPixel(x, y);

      stack.push({ x: x + 1, y });
      stack.push({ x: x - 1, y });
      stack.push({ x, y: y + 1 });
      stack.push({ x, y: y - 1 });
    }
  }
}

function putPixel(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

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

function floodFill(x, y, newColor, targetColor) {
  const stack = [];
  const initialColor = ctx.getImageData(x, y, 1, 1).data;

  if (
    initialColor[0] === newColor[0] &&
    initialColor[1] === newColor[1] &&
    initialColor[2] === newColor[2]
  ) {
    return;
  }

  stack.push({ x, y });

  while (stack.length) {
    const { x, y } = stack.pop();
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    if (
      x >= 0 &&
      y >= 0 &&
      x < canvas.width &&
      y < canvas.height &&
      pixel[0] === targetColor[0] &&
      pixel[1] === targetColor[1] &&
      pixel[2] === targetColor[2] &&
      pixel[3] === targetColor[3]
    ) {
      ctx.fillStyle = newColor;
      putPixel(x, y);

      stack.push({ x: x + 1, y });
      stack.push({ x: x - 1, y });
      stack.push({ x, y: y + 1 });
      stack.push({ x, y: y - 1 });
    }
  }
}
