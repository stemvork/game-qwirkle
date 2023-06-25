// Set up the canvas
document.body.style.margin = '0';
const root = document.querySelector('#root');
const cnv = document.createElement('canvas');
const ctx = cnv.getContext('2d');
cnv.ctx = ctx;
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

// import { centerDot } from "./center_dot.js";
// const center_dot = new centerDot(cnv);

import { square } from "./square.js";
const first_square = new square(cnv, 'circle');
first_square.pos = cnv.center;
const second_square = new square(cnv, 'flower');
second_square.pos = { x: cnv.center.x, y: cnv.center.y + 50 };
const third_square = new square(cnv, 'star4');
third_square.pos = { x: cnv.center.x, y: cnv.center.y + 100 };
const fourth_square = new square(cnv, 'star8');
fourth_square.pos = { x: cnv.center.x, y: cnv.center.y + 150 };
