document.body.style.margin = '0';
const root = document.querySelector('#root');
const cnv = document.createElement('canvas');
const ctx = cnv.getContext('2d');
root.appendChild(cnv);

cnv.bgColor = 'moccasin';
cnv.entities = [];

function windowResized() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    cnv.center = { x: cnv.width/2, y: cnv.height/2 };
}
window.addEventListener('resize', windowResized);
windowResized();

function draw() {
    ctx.fillStyle = cnv.bgColor;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    cnv.entities.map(e => e.update());
    cnv.entities.map(e => e.draw());
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

const centerDot = {};
centerDot.radius = 5;
centerDot.color = 'red'
centerDot.update = () => { centerDot.pos = cnv.center; }
centerDot.draw = () => {
    ctx.beginPath();
    ctx.arc(centerDot.pos.x, centerDot.pos.y, centerDot.radius, 0, 2*Math.PI);
    ctx.fillStyle = centerDot.color;
    ctx.fill();
}
cnv.entities.push(centerDot);
draw();

function newSquare(symbolType='circle', symbolColor='red') {
    const square = {};
    square.pos = { x: 0, y: 0 };
    square.size = 50;
    square.bgColor = 'black';
    square.symbolType = symbolType;
    square.symbolColor = symbolColor;
    square.symbolSize = square.size * 0.38;
    square.update = () => {};
    square.draw = () => {
        ctx.fillStyle = square.bgColor;
        ctx.fillRect(
            square.pos.x - square.size/2,
            square.pos.y - square.size/2,
            square.size,
            square.size
        );

        ctx.fillStyle = square.symbolColor;
        if(square.symbolType === 'circle') {
            ctx.beginPath();
            ctx.arc(square.pos.x, square.pos.y, square.symbolSize, 0, 2*Math.PI);
            ctx.fill();
        } else if(square.symbolType === 'flower') {
            ctx.beginPath();
            ctx.arc(square.pos.x - square.size/4, square.pos.y, square.symbolSize / 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(square.pos.x + square.size/4, square.pos.y, square.symbolSize / 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(square.pos.x, square.pos.y - square.size/4, square.symbolSize / 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(square.pos.x, square.pos.y + square.size/4, square.symbolSize / 2, 0, 2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(square.pos.x, square.pos.y, square.symbolSize / 2, 0, 2*Math.PI);
            ctx.fill();
        }
    }
    return square;
}
const square = newSquare('flower');
square.pos = cnv.center;
cnv.entities.push(square);
draw();
