const canvas = document.getElementById('canv');
// Context, to draw inside the canvas
const ctx = canvas.getContext("2d");

ctx.beginPath();
// The first two value sspecifies the coordinates, while the other two the width and height -> ctx.rect(x, y, width, height)
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle, directionOfDrawing);
    // StartAngle and endAngle must be in radians
    // directionOfDrawing is optional, being false for clockwise [default], or true for anti-clockwise
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

// Also, we can use either fill() or stroke()
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();