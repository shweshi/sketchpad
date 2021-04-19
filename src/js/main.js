var canvas, context, colors, current, sketching = false;
function init() {
    canvas = document.getElementsByClassName('whiteboard')[0];
    colors = document.getElementsByClassName('color');
    context = canvas.getContext('2d');
    current = {
        x: 0,
        y: 0,
        color: '',
    };

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    window.addEventListener('resize', onResize, false);
    onResize();
}

function drawLine(x0, y0, x1, y1, color) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
}

function onMouseDown(e) {
    sketching = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
}

function onMouseUp(e) {
    if (!sketching) { return; }
    sketching = false;
    drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
}

function onMouseMove(e) {
    if (!sketching) { return; }
    drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
}

function onsketchingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function onColorUpdate(color) {
    current.color = color;
}

function onClear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
        var time = new Date().getTime();

        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
    };
}

init();

function printConsoleArt() {
    const consoleStr = `
    
    ███████ ██   ██ ███████ ████████  ██████ ██   ██ ██████   █████  ██████  
    ██      ██  ██  ██         ██    ██      ██   ██ ██   ██ ██   ██ ██   ██ 
    ███████ █████   █████      ██    ██      ███████ ██████  ███████ ██   ██ 
         ██ ██  ██  ██         ██    ██      ██   ██ ██      ██   ██ ██   ██ 
    ███████ ██   ██ ███████    ██     ██████ ██   ██ ██      ██   ██ ██████  
                                                                             
    Github: https://github.com/shweshi/sketchpad
    `
    console.log(consoleStr);
}

printConsoleArt();
