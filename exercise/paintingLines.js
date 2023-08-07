
const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800;
var x_orgin=0, y_origin=0;
const colors = [
    "#cd84f1",
    "#ffcccc",
    "#ff4d4d",
    "#ffaf40",
    "#fffa65",
    "#c56cf0",
    "#ffb8b8",
    "#ff3838",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff",
    "#4b4b4b",
    "#3ae374",
    "#67e6dc",
    "#17c0eb",
    "#7158e2",
    "#3d3d3d",
];

function onClick(e) {
    console.log("click",e);
    x_origin = e.offsetX;
    y_origin=e.offsetY;
    // canvas.addEventListener("mousemove", onMove);
}
function onMove(e){
    console.log(e);
    ctx.beginPath();
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.moveTo(x_origin,y_origin);
    ctx.strokeStyle=color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMove);
