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

function circle(color, x, y, r) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}
function newSymbol(type='circle', color='red') {
    const symbol = {};
    symbol.pos = { x: 0, y: 0 };
    symbol.size = 50;
    symbol.type = type;
    symbol.color = color;
    symbol.update = (pos, size) => {
        symbol.pos = pos;
        symbol.size = size;
    }
    symbol.draw = () => {
        if(symbol.type === 'circle') {
            circle(symbol.color, symbol.pos.x, symbol.pos.y, symbol.size * 0.38);
        } else if(symbol.type === 'flower') {
            circle(symbol.color,
                symbol.pos.x - symbol.size / 4,
                symbol.pos.y,
                symbol.size * 0.17);
            circle(symbol.color,
                symbol.pos.x + symbol.size / 4,
                symbol.pos.y,
                symbol.size * 0.17);
            circle(symbol.color,
                symbol.pos.x,
                symbol.pos.y - symbol.size / 4,
                symbol.size * 0.17);
            circle(symbol.color,
                symbol.pos.x,
                symbol.pos.y + symbol.size / 4,
                symbol.size * 0.17);
            circle(symbol.color,
                symbol.pos.x,
                symbol.pos.y,
                symbol.size * 0.17);
        }
    }
    return symbol;
}
function newSquare(symbolType='circle', symbolColor='red') {
    const square = {};
    square.pos = { x: 0, y: 0 };
    square.size = 50;
    square.bgColor = 'black';
    square.symbol = newSymbol('flower', 'red');
    square.symbol.update(square.pos, square.size);
    square.update = () => {
        square.symbol.update(square.pos, square.size);
    };
    square.draw = () => {
        ctx.fillStyle = square.bgColor;
        ctx.fillRect(
            square.pos.x - square.size/2,
            square.pos.y - square.size/2,
            square.size,
            square.size
        );
        square.symbol.draw();
    }
    return square;
}
const square = newSquare('flower');
square.pos = cnv.center;
cnv.entities.push(square);
draw();
