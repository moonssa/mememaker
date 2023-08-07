
const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800;


ctx.fillRect(200, 200-20, 10, 100);
ctx.fillRect(240, 200-20, 50, 200);
ctx.fillRect(330, 200-20, 10, 100);

ctx.arc(260,100,50,0,2*Math.PI);
ctx.fill();

ctx.beginPath();
ctx.arc(240-10,90-10,8,0,2*Math.PI);
ctx.moveTo(270,80);
ctx.arc(280-10,90-10,8, 0.8*Math.PI,1.9*Math.PI);

ctx.fillStyle="yellow";
ctx.fill();