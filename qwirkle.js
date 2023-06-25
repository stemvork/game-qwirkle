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
const types = ['square', 'circle', 'diamond', 'flower', 'star4', 'star8'];
const colors = ['red', 'gold', 'darkorange', 'forestgreen', 'royalblue', 'slateblue'];
const bag = [];
for(let i=0; i<6; i++) {
    for(let j=0; j<6; j++) {
        for(let k=0; k<3; k++) {
            const _square = new square(cnv, types[j], colors[i]);
            _square.pos = { x: -(2**32), y: -(2**32) };
            bag.push(_square);
        }
    }
}
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
shuffle(bag);

const cursor = {};
cursor.square = { move: () => {} };
window.addEventListener('mousemove', e => {
    const [cx, cy] = [
        Math.round(e.offsetX/square.default_size)*square.default_size,
        Math.round(e.offsetY/square.default_size)*square.default_size,
    ];
    cursor.square.move({ x: cx, y: cy });
});

window.addEventListener('mousedown', () => cursor.square = bag.pop());
