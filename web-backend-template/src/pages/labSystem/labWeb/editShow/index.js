let canvas = document.getElementById('borad')
let ctx = canvas.getContext('2d')
let range = document.getElementById('range')
let colorBtns = document.getElementsByClassName('color-item')
let brush = document.getElementById('brush')
let eraser = document.getElementById('eraser')
let reSetBoard = document.getElementById('clear')
let undo = document.getElementById('undo')
let save = document.getElementById('save')
let activeColor = 'black'
let bgColor = 'white'
let clear = false

let lWidth = 4

canvasAutoSet()
canvasSetBg(bgColor)
ListenRunning(canvas)
getColor()

window.onload = function () {
  canvasAutoSet()
  canvasSetBg(bgColor)
}
function canvasAutoSet() {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}
function canvasSetBg(color) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = activeColor
  ctx.strokeStyle = activeColor
}

function getColor() {
  for (let i = 0; i < colorBtns.length; i++) {
    colorBtns[i].onclick = function () {
      for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].classList.remove('active')
        this.classList.add('active')
        activeColor = this.style.backgroundColor
        ctx.fillStyle = activeColor
        ctx.strokeStyle = activeColor
      }
    }
  }
}

range.onchange = function(e){
  lWidth = e.target.value
}

function ListenRunning(canvas) {
  let painting = false
  let oldPoint = { x: undefined, y: undefined }
  if (document.body.ontouchstart !== undefined) {
    console.log('暂无手机端')
  } else {
    canvas.onmousedown = function (e) {
      let aData =  ctx.getImageData(0,0,canvas.width,canvas.height)
      saveImgHistory(aData)
      painting = true
      let x = e.clientX
      let y = e.clientY
      oldPoint = {x: x,y: y}
      ctx.save()
      drawCircle(x, y, 0)
    }
    canvas.onmousemove = function (e) {
      if (painting) {
        let x = e.clientX
        let y = e.clientY
        let newPoint = { x: x, y: y }
        drawLine(oldPoint.x, oldPoint.y, newPoint.x, newPoint.y)
        oldPoint = newPoint
      }
    }
    canvas.onmouseup = function () {
      painting = false
    }
    canvas.onmouseleave = function () {
      painting = false
    }
  }
}

function drawCircle(x, y, radius) {
  //绘制起始点
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  if (clear) {
    ctx.clip();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.restore();
  }
}
function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = lWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (clear) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.restore();
  } else {
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }
}





brush.onclick = function () {
  clear = false
  eraser.classList.remove('active')
  this.classList.add('active')
}

eraser.onclick = function () {
  clear = true
  brush.classList.remove('active')
  this.classList.add('active')
}

reSetBoard.onclick = function () {
  this.classList.add('active')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvasSetBg(bgColor)
  this.classList.remove('active')
}


let dataSaveArray = [] 

function saveImgHistory(imgDate){
  (dataSaveArray.length===10)&&(dataSaveArray.shift())
  dataSaveArray.push(imgDate)
  console.log(dataSaveArray)
}


undo.onclick = function(e){
  if(dataSaveArray.length===0) return 
  ctx.putImageData(dataSaveArray[dataSaveArray.length-1],0,0)
  dataSaveArray.pop()
}

save.onclick = function(){
  let a = canvas.toDataURL("image/png", 1.0)
  let  bstr = atob(a);
  console.log(bstr)
}