const h1 = document.getElementById("h1");
const x1 = document.getElementById("X1");
const y1 = document.getElementById("Y1");
const x2 = document.getElementById("X2");
const y2 = document.getElementById("Y2");
const select = document.getElementById("selection");


const button = document.getElementById("button");
const colorselector = document.getElementById("colorselector");

function clearCanvas(){
    console.log("clear")
    x1.value = "";
    y1.value = "";
    x2.value = "";
    y2.value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fourConnectedFill(x, y, fillColor){
    ctx.beginPath();
    ctx.fillStyle = fillColor

    // ctx.strokeRect(x, y, 1, 1) 
    ctx.fillRect(x+10, y, 10, 10) 
    ctx.fillRect(x, y+10, 10, 10) 
    ctx.fillRect(x-10, y, 10, 10) 
    ctx.fillRect(x, y-10, 10, 10) 

    ctx.stroke();
    ctx.closePath();
}

function eightConnectedFill(x, y, fillColor){
    ctx.fillStyle = fillColor

    // ctx.strokeRect(x, y, 1, 1) 
    ctx.fillRect(x+10, y, 10, 10) 
    ctx.fillRect(x, y+10, 10, 10) 
    ctx.fillRect(x-10, y, 10, 10) 
    ctx.fillRect(x, y-10, 10, 10) 
    ctx.fillRect(x+10, y+10, 10, 10) 
    ctx.fillRect(x-10, y+10, 10, 10) 
    ctx.fillRect(x+10, y-10, 10, 10) 
    ctx.fillRect(x-10, y-10, 10, 10) 

    ctx.stroke();
    
}

function floodFillAlgorithm(x, y, oldColor, newColor){
    let currentColor = ctx.getImageData(x, y, 1, 1).data;
    if(currentColor[0] === oldColor[0] && currentColor[1] === oldColor[1] && currentColor[2] === oldColor[2]){
        ctx.fillRect(x, y, 1, 1);
        floodFillAlgorithm(x+1, y, oldColor, newColor);
        floodFillAlgorithm(x-1, y, oldColor, newColor);
        floodFillAlgorithm(x, y+1, oldColor, newColor);
        floodFillAlgorithm(x, y-1, oldColor, newColor);
    }
}

function draw(){
    const selectValue = parseInt(select.value)
    const colorvalue = colorselector.value
    const x1Value = parseInt(x1.value);
    const y1Value = parseInt(y1.value);
    const x2Value = parseInt(x2.value);
    const y2Value = parseInt(y2.value);
    console.log("calculate", x1Value, y1Value, x2Value, y2Value, selectValue);
    let linePoints = ddaLine(x1Value, y1Value, x2Value, y2Value);
    switch(selectValue){
        case 1:
            drawLineOnCanvas(linePoints);
            break
        case 2:
            bresenhamLine(x1Value, y1Value, x2Value, y2Value, selectValue);
            break
        case 3:
            midpointCircle(50, x1Value, y1Value)
            break
        case 4:
            bresenhamCircle(50, x1Value, y1Value)
            break
        case 5:
            fourConnectedFill1(x1Value, y1Value, colorvalue)
            break
        case 6:
            eightConnectedFill(x1Value, y1Value, colorvalue)
            break
        case 7:
            boundaryFill(x1Value, y1Value, [0, 0, 254], [254, 0, 0]);
            break
        case 8:
            console.log(colorvalue) // #0000ff
            let colorarray = colorvalue.match(/.{1,2}/g).map((val) => parseInt(val, 16)).filter((val) => !isNaN(val))
            console.log(colorarray)
            floodFillAlgorithm(x1Value, y1Value, colorarray, [254, 0, 0]);
            break
        default:
            alert("Coming soon")
            break
    }
}


fillAll()