document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas and its context
  const canvas = document.getElementById("radarChart");
  const ctx = canvas.getContext("2d");

  // Radar chart data
  const datasets = [
    [80, 60, 75, 45, 90], // Dataset 1
    [50, 70, 80, 60, 85], // Dataset 2
    [80, 60, 75, 45, 90], // Dataset 1
    [50, 70, 80, 60, 85], // Dataset 2
  ];    


  // Radar chart options
  const options = {
    max: 100, // Maximum value on the radar chart
    levels: 5, // Number of concentric levels
    colors: ["#3498db", "#e74c3c"], // Colors of the radar chart for each dataset
  };

  // Function to draw the radar chart
  function drawRadarChart(datasets, options) {
    const { max, levels, colors } = options;

    const totalAngles = datasets[0].length;
    const angleIncrement = (2 * Math.PI) / totalAngles;

    // Calculate the radius of each level
    const levelRadius = canvas.width / 2 / levels;

    // Function to convert data value to a point on the canvas
    function getPoint(value, index, datasetIndex) {
      const angle = index * angleIncrement - Math.PI / 2;
      const radius = (value / max) * levelRadius * (levels - 1);
      const x = canvas.width / 2 + radius * Math.cos(angle);
      const y = canvas.height / 2 + radius * Math.sin(angle);
      return { x, y };
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw concentric circles
    for (let level = 1; level <= levels; level++) {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        level * levelRadius,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }

    // Draw lines connecting data points for each dataset
    datasets.forEach((dataset, datasetIndex) => {
      ctx.beginPath();
      dataset.forEach((value, index) => {
        const point = getPoint(value, index, datasetIndex);
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = colors[datasetIndex];
      ctx.globalAlpha = 0.7; // Transparency
      ctx.fill();
      ctx.globalAlpha = 1; // Reset transparency

      // Draw data points for each dataset
      dataset.forEach((value, index) => {
        const point = getPoint(value, index, datasetIndex);
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = colors[datasetIndex];
        ctx.stroke();
      });
    });
  }

  // Initial drawing
  drawRadarChart(datasets, options);
});
