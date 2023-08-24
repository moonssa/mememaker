


const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("palette");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const undoBtn = document.getElementById("undo");

const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_W = 800, CANVAS_H=800;

canvas.width=CANVAS_W;
canvas.height=CANVAS_H;
ctx.lineWidth = lineWidth.value;
ctx.lineCap="round";   // 직선 끝을 둥글게 하기 위하여


let isPainting=false;
let isFilled = false;

let undoStack=[];

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

function saveCanvasState() {
    const state = canvas.toDataURL(); // Canvas 상태를 이미지 데이터 URL로 저장
    undoStack.push(state);
    console.log("hahaha", undoStack.length);
}

function cancelPainting(e){
    console.log(e);
    isPainting=false;
    ctx.beginPath();

    saveCanvasState(); //new
}

function cancelPainting_nosave(e){
    console.log(e);
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
    if (isFilled) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.fill();     
        return;
    }
    
    ctx.moveTo(e.offsetX, e.offsetY);
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
    // ctx.fillStyle="white";
    // ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
    const confirm_msg = confirm(" ❗ 정말로 이 작업을 수행하시겠습니까? 이 작업은 되돌릴 수 없습니다. ❗ ");
    if(confirm_msg){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas 초기화
    }
    return;
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

    ctx.fillText(textInput.value, event.offsetX, event.offsetY);
   
    ctx.restore();
    saveCanvasState();
  
}

function onSave(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onUndoClick(){
    console.log(undoStack.length);
    if (undoStack.length == 1){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else if (undoStack.length > 0) {
        const previousState = undoStack.pop(); // 스택에서 이전 상태를 꺼냄
        const image = new Image();
        
  
        image.src = previousState; 
        console.log("pop한 이미지 스테이트", image.src);
        image.onload =function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);   
            ctx.drawImage(image,0,0);

        };

    }
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting_nosave);
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
undoBtn.addEventListener("click", onUndoClick);