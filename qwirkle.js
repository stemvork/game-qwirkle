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
first_square.pos = { x: cnv.center.x, y: cnv.center.y - 100 };
const second_square = new square(cnv, 'flower');
second_square.pos = { x: cnv.center.x, y: cnv.center.y - 50 };
const third_square = new square(cnv, 'star4');
third_square.pos = { x: cnv.center.x, y: cnv.center.y + 0 };
const fourth_square = new square(cnv, 'star8');
fourth_square.pos = { x: cnv.center.x, y: cnv.center.y + 50 };
const fifth_square = new square(cnv, 'diamond');
fifth_square.pos = { x: cnv.center.x, y: cnv.center.y + 100 };
const sixth_square = new square(cnv, 'square');
sixth_square.pos = { x: cnv.center.x, y: cnv.center.y + 150 };

const types = ['square', 'circle', 'diamond', 'flower', 'star4', 'star8'];
const colors = ['red', 'yellow', 'orange', 'green', 'blue', 'purple'];
const squares = [];
for(let i=0; i<6; i++) {
    for(let j=0; j<6; j++) {
        for(let k=0; k<3; k++) {
            const _square = new square(cnv, types[j], colors[i]);
            _square.pos = {
                x: cnv.center.x - 100 + 50*i,
                y: cnv.center.y - 100 + 50*j
            };
            squares.push(_square);
        }
    }
}
