const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//>   strokeRect(x, y, width, height)
// ctx.strokeStyle = "blue";
// ctx.strokeRect(20, 20, 150, 100);

// TODO: draw a pixel at 50,50

//>   fillRect(x, y, width, height)
// ctx.fillStyle = "blue";
// ctx.fillRect(50, 0, 100, 100);

//>   clearRect(x, y, width, height) -- clear part of the canvas
// ctx.fillRect(45, 45, 60, 60);
// setTimeout(() => {
//   ctx.clearRect(45, 45, 60, 60);
// }, 500);

//>   clearRect(x, y, width, height) -- erasing the whole canvas
// ctx.fillRect(45, 45, 60, 60);
// ctx.fillRect(50, 0, 100, 100);
// ctx.strokeRect(20, 20, 150, 100);
// setTimeout(() => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }, 1000);

//> lineTo(x, y)
// ctx.beginPath();
// ctx.moveTo(30, 50);
// ctx.lineTo(40, 60);
// ctx.stroke();

// TODO: Draw a triangle

//> lineWidth & lineCap
// ctx.beginPath();
// ctx.lineWidth = 15;
// ctx.lineCap = "round"; // "square"
// ctx.moveTo(30, 50);
// ctx.lineTo(150, 100);
// ctx.stroke();

//> setLineDash(lineLength, gap)
// ctx.beginPath();
// ctx.setLineDash([18, 20]);
// ctx.moveTo(30, 50);
// ctx.lineTo(150, 100);
// ctx.stroke();

//> arc(x, y, radius, startAngle, endAngle, ?counterclockwise) -- radian
// ctx.beginPath();
// ctx.arc(250, 75, 50, 0, Math.PI, true);
// ctx.stroke();

// TODO: Draw a circle

//> arc(x, y, radius, startAngle, endAngle, ?counterclockwise) -- degree
// function degRad(d) {
//   return d * (Math.PI / 180) - Math.PI / 2;
// }
// ctx.beginPath();
// ctx.arc(100, 75, 50, degRad(0), degRad(90));
// ctx.stroke();

//> ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, ?counterclockwise)
// ctx.beginPath();
// ctx.ellipse(100, 100, 50, 100, 0, 0, Math.PI, true);
// ctx.stroke();
