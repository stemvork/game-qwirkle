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
