let data = {
  labels: [
    "Attribute 1",
    "Attribute 2",
    "Attribute 3",
    "Attribute 4",
    "Attribute 5",
    "Attribute 6",
    "Attribute 7",
    "Attribute 8",
    "Attribute 9",
    "Attribute 10",
  ],
  datasets: [],
};

const canvas = document.getElementById("radarChart");
const context = canvas.getContext("2d", { willReadFrequently: true });

const chartWidth = canvas.width;
const chartHeight = canvas.height;

const datasetcount = document.getElementById("datasetcount");
const dataset = document.getElementById("dataset");
const attributecount = document.getElementById("attributecount");

function draw() {
  // context.clearRect(0, 0, chartWidth, chartHeight);

  const dcount = parseInt(datasetcount.value);
  const tcount = parseInt(attributecount.value);

  console.log(dcount, tcount, data);

  const numAttributes = tcount;

  const angle = (2 * Math.PI) / numAttributes;

  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  const maxValue =
    Math.max(...data.datasets.flatMap((dataset) => dataset.data)) + 30;

  const radius = Math.min(chartWidth, chartHeight) / 2 - 20;

  // Draw circles in the background
  for (let i = 20; i <= maxValue; i += 20) {
    bresenhamCircleAlgorithm(centerX, centerY, radius * (i / maxValue));
    context.strokeStyle = "rgba(0, 0, 0, 0.1)";
    context.stroke();
  }

  // Draw attribute lines
  for (let i = 0; i < numAttributes; i++) {
    const currentAngle = i * angle;
    const startX = centerX + Math.cos(currentAngle) * radius;
    const startY = centerY + Math.sin(currentAngle) * radius;
    drawLineDDA(centerX, centerY, startX, startY);
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
    context.stroke();
  }

  // Draw attribute labels
  for (let i = 0; i < numAttributes; i++) {
    const currentAngle = i * angle;
    const labelX = centerX + Math.cos(currentAngle) * (radius + 10);
    const labelY = centerY + Math.sin(currentAngle) * (radius + 10);

    context.fillStyle = "black";
    context.font = "12px Arial";
    context.textAlign = "center";
    context.fillText(data.labels[i], labelX, labelY);
  }

  // Draw data polygons
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
        //     sx = x1, sy = y1
        //     x = x1, y = y1
        // continue
      } else {
        context.lineTo(x1, y1);
        // drawLineDDA(x, y, x1, y1);
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

  points.map((point) => context.fillRect(point.x, point.y, 1, 1));
}

//Line drawing algorithm
function drawLineDDA(x1, y1, x2, y2, color) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;

  let x = x1;
  let y = y1;
  for (let i = 0; i <= steps; i++) {
    context.fillRect(Math.round(x), Math.round(y), 1, 1);
    x += xIncrement;
    y += yIncrement;
  }
}

function handleChange() {
  const dcount = parseInt(datasetcount.value);
  const tcount = parseInt(attributecount.value);
  console.log(dcount, tcount);
  dataset.innerHTML = "";

  let tableheader = "";
  for (let i = 0; i < tcount; i++) {
    tableheader += `<th>Attribute ${i + 1}</th>`;
  }

  // insert a table row for each dataset with the dataset name and color and { attributecount} attributes
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
function hexToRgb(hex) {
  // Remove the '#' symbol if present
  hex = hex.replace("#", "");

  // Convert the hexadecimal values to decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB color string
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
}
function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function initializeTable() {}

function addDataset(row) {
  const tcount = parseInt(attributecount.value);
  let tabletemplate = "";
  for (let i = 0; i < tcount; i++) {
    tabletemplate += `<td><input type="number" id="row${row}column${i}" value=${getRandomNumber()} /></td>`;
  }
  tabletemplate += "";

  return tabletemplate;
}

function handleGenerate() {
  const dcount = parseInt(datasetcount.value);
  const tcount = parseInt(attributecount.value);

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
      backgroundColor: hexToRgb(dcolor),
      borderColor: getRandomColor(),
      borderWidth: 1,
    };
    data.datasets.push(set);
  }
  draw();
}

handleChange();
