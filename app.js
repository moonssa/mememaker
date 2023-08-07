
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("palette");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800;
ctx.lineWidth = lineWidth.value;


let isPainting=false;
let isFilled = false;

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



function cancelPainting(e){
    isPainting=false;
    ctx.beginPath();
}

function startPainting(e){
    isPainting=true;
}

function onMove(e) {
    if (isPainting){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    
    ctx.moveTo(e.offsetX, e.offsetY)

}
function onLineWithChange(event) {
    ctx.lineWidth = event.target.value;
}
  
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick(event){
    if(isFilled){
        isFilled = false;
        modeBtn.innerText = "Fill";
    }else {
        isFilled = true;
        modeBtn.innerText="Draw"
    }
}

function onCanvasClick() {
    if(isFilled){
        ctx.fillRect(0,0,800,800);
    }
}

function onDestoyClick() {
    ctx.fillStyle="white";
    ctx.fillRect(0,0,800,800);
}

function onEraserClick() {
    ctx.strokeStyle="white";
    isFilled=false;
    modeBtn.innerText="Fill";
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("mousemove", onMove);

canvas.addEventListener("click", onCanvasClick);

// canvas.addEventListener("click", onDestoyClick);

lineWidth.addEventListener("change", onLineWithChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestoyClick);

eraserBtn.addEventListener("click", onEraserClick );