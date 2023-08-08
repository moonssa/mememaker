
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("palette");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_W = 800, CANVAS_H=800;

canvas.width=CANVAS_W;
canvas.height=CANVAS_H;
ctx.lineWidth = lineWidth.value;
ctx.lineCap="round";   // 직선 끝을 둥글게 하기 위하여


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
        ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
    }
}

function onDestoyClick() {
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
}

function onEraserClick() {
    ctx.strokeStyle="white";
    isFilled=false;
    modeBtn.innerText="Fill";
}

function onFileChange(event){
    console.dir(event.target);
    const file = event.target.files[0];
    url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image,0,0);
        fileInput.value=null;
    }
}

function onDoubleClick(event){
    ctx.save();
    console.log(event.offsetX, event.offsetX);
    ctx.lineWidth =1;
    ctx.font="48px serif";
    // ctx.strokeText(textInput.value, event.offsetX, event.offsetY);
    ctx.fillText(textInput.value, event.offsetX, event.offsetY);
    ctx.restore();
}

function onSave(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("mousemove", onMove);

canvas.addEventListener("click", onCanvasClick);




lineWidth.addEventListener("change", onLineWithChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestoyClick);

eraserBtn.addEventListener("click", onEraserClick );
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSave);