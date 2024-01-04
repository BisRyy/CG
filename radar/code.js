let data = {
  labels: ["Apple", "Banana", "Cherry"],
  datasets: [
    {
      label: "Sample Data",
      data: [10, 20, 30],
      backgroundColor: "rgba(255, 99, 132, 0.4)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    },
  ],
};

const canvas = document.getElementById("radarChart");
const context = canvas.getContext("2d", { willReadFrequently: true });

const chartWidth = canvas.width;
const chartHeight = canvas.height;

const datasetcount = document.getElementById("datasetcount");
const dataset = document.getElementById("dataset");
const attributecount = document.getElementById("attributecount");

function draw() {
  const dcount = parseInt(datasetcount.value);
  const tcount = parseInt(attributecount.value);

  const numAttributes = tcount;

  const angle = (2 * Math.PI) / numAttributes;

  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  const maxValue =
    Math.max(...data.datasets.flatMap((dataset) => dataset.data)) + 30;

  const radius = Math.min(chartWidth, chartHeight) / 2 - 20;

  // circles in the background
  context.fillStyle = "rgba(0, 0, 0, 0.4)";
  for (let i = 20; i <= maxValue; i += 20) {
    bresenhamCircleAlgorithm(centerX, centerY, radius * (i / maxValue));
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.fillText(i, centerX, centerY + radius * (i / maxValue));
  }

  // attribute lines
  for (let i = 0; i < numAttributes; i++) {
    const currentAngle = i * angle;
    const startX = centerX + Math.cos(currentAngle) * radius;
    const startY = centerY + Math.sin(currentAngle) * radius;
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.strokeStyle = "rgba(0, 0, 0, 1)";
    drawLineDDA(centerX, centerY, startX, startY);
  }

  // attribute labels
  context.fillStyle = "rgba(0, 0, 0, 1)";
  for (let i = 0; i < numAttributes; i++) {
    const currentAngle = i * angle;
    const labelX = centerX + Math.cos(currentAngle) * (radius + 10);
    const labelY = centerY + Math.sin(currentAngle) * (radius + 10);

    context.fillStyle = "black";
    context.font = "12px Arial";
    context.textAlign = "center";
    context.strokeStyle = "rgba(0, 0, 0, 0.1)";
    context.fillText(data.labels[i], labelX, labelY);
  }

  // data polygons
  for (let i = 0; i < dcount; i++) {
    const dataset = data.datasets[i];
    context.beginPath();
    for (let j = 0; j < numAttributes; j++) {
      const value1 = dataset.data[j];
      const currentAngle1 = j * angle;
      const percentage1 = value1 / maxValue;

      const x1 = centerX + Math.cos(currentAngle1) * (radius * percentage1);
      const y1 = centerY + Math.sin(currentAngle1) * (radius * percentage1);
      var x;
      var y;

      if (j === 0) {
        context.moveTo(x1, y1);

        // put circle on the edge
        context.beginPath();
        context.arc(x1, y1, 2, 0, 2 * Math.PI);
        context.stroke();

        //     sx = x1, sy = y1
        //     x = x1, y = y1
        //     continue
      } else {
        context.lineTo(x1, y1);
        context.arc(x1, y1, 2, 0, 2 * Math.PI);

        //     drawLineDDA(x, y, x1, y1);
        //     x = x1
        //     y = y1
      }

      // if ( j + 1 == numAttributes){
      //     drawLineDDA(x1, y1, sx, sy);
      // }
    }
    context.closePath();
    context.fillStyle = dataset.backgroundColor;
    context.fill();
    context.strokeStyle = dataset.borderColor;
    context.stroke();
    context.lineWidth = dataset.borderWidth;
  }
}

//Circle drawing algorithm
function bresenhamCircleAlgorithm(centerX, centerY, radius) {
  let x = 0;
  let y = radius;
  let d = 3 - 2 * radius;

  const points = [];

  while (x <= y) {
    points.push(
      { x: centerX + x, y: centerY + y },
      { x: centerX + y, y: centerY + x },
      { x: centerX - y, y: centerY + x },
      { x: centerX - x, y: centerY + y },
      { x: centerX - x, y: centerY - y },
      { x: centerX - y, y: centerY - x },
      { x: centerX + y, y: centerY - x },
      { x: centerX + x, y: centerY - y }
    );

    x++;

    if (d < 0) {
      d += 4 * x + 6;
    } else {
      d += 4 * (x - y) + 10;
      y--;
    }
  }

  points.map((point) => putPixel(point.x, point.y));
}

function putPixel(x, y) {
  context.fillRect(x, y, 1, 1);
}

//Line drawing algorithm
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

function handleChange() {
  const dcount = parseInt(datasetcount.value);
  const tcount = parseInt(attributecount.value);
  console.log(dcount, tcount);
  dataset.innerHTML = "";
  dataset.innerHTML += `${addDataHead()}`;
  for (let i = 0; i < dcount; i++) {
    dataset.innerHTML += `
      <tr>
      ${addDataset(i)}
      <td><input type="color" id="row${i}column${tcount}" value=${getRandomColor()} /></td>
      </tr>
    `;
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function hexToRgb(hex, opacity = 0.2) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function getRandomNumber() {
  // multiple of 10 between 10 and 100
  return Math.ceil(Math.random() * 10) * 10;
}

function addDataset(row) {
  const tcount = parseInt(attributecount.value);
  let tabletemplate = "";
  for (let i = 0; i < tcount; i++) {
    tabletemplate += `<td><input type="number" id="row${row}column${i}" value=${getRandomNumber()} step="10" max="100" min="0" /></td>`;
  }
  tabletemplate += "";

  return tabletemplate;
}

function addDataHead() {
  const tcount = parseInt(attributecount.value);
  let tabletemplate = "";
  for (let i = 0; i < tcount; i++) {
    tabletemplate += `<td><input type="text" id="attribute${i}" value="attribute${i}" /></td>`;
  }
  tabletemplate += `<td>Border Color</td><br/>`;
  return tabletemplate;
}

function handleGenerate() {
  handleClear();
  const dcount = parseInt(datasetcount.value);
  const tcount = parseInt(attributecount.value);

  for (let i = 0; i < tcount; i++) {
    const elem = document.getElementById(`attribute${i}`);
    data.labels[i] = elem.value;
  }

  for (let i = 0; i < dcount; i++) {
    let dcolor = "";
    let dlist = [];
    for (let j = 0; j < tcount; j++) {
      const elem = document.getElementById(`row${i}column${j}`);
      dlist.push(parseInt(elem.value));
    }
    dcolor = document.getElementById(`row${i}column${tcount}`).value;

    let set = {
      label: `Dataset ${i + 1}`,
      data: dlist,
      backgroundColor: hexToRgb(getRandomColor()),
      borderColor: hexToRgb(dcolor, 1),
      borderWidth: 2,
    };
    data.datasets.push(set);
  }
  context.clearRect(0, 0, chartWidth, chartHeight);
  draw();
}

function handleClear() {
  context.clearRect(0, 0, chartWidth, chartHeight);
  data = {
    labels: [],
    datasets: [],
  };
}

draw();
