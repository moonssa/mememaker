
const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800;


// ctx.fillRect(50,50,100,200)
ctx.rect(50,50,100,100); // 라인생성
ctx.stroke();  //실제 라인 그림
ctx.fill();  // 색 채움

ctx.rect(150,150,100,100);
ctx.rect(250,250,100,100);
ctx.fill();

ctx.beginPath();
ctx.fillStyle="tomato";
ctx.rect(450,450,100,100);
ctx.fill();

setTimeout(()=> {ctx.fill();},5000);

ctx.beginPath();
ctx.moveTo(300,100);
ctx.lineTo(400,100);
ctx.lineTo(400,200);
ctx.lineTo(300,200);
ctx.lineTo(300,100);
ctx.stroke();
ctx.fillStyle="yellow";