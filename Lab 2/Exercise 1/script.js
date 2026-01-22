const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.style.position = 'absolute';
canvas.style.left = (window.innerWidth - canvas.width) / 2 + 'px';
canvas.style.top = (window.innerHeight - canvas.height) / 2 + 'px';

const rectWidth = 150;
const rectHeight = 100;

const circleRadius = 50;

const circleX = (canvas.width ) / 4;
const circleY = canvas.height / 4*3;

const rectX = (canvas.width - rectWidth) / 4;
const rectY = (canvas.height - rectHeight) / 4;

ctx.fillStyle = "green"; 
ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

ctx.fillStyle = "blue"; 
ctx.beginPath();
ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();



ctx.moveTo(canvas.width / 4 * 3, canvas.height / 4);
ctx.lineTo(canvas.width / 4 * 3 - 75, canvas.height / 4 + 100);
ctx.stroke();

ctx.fillStyle = "purple "; 
ctx.font = "30px Dancing Script";
ctx.fillText("HTML5 Canvas", canvas.width / 4 * 3 - 100, canvas.height / 4 * 3);
