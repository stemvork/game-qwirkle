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
bag.draw = () => {
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#000000cc';
    ctx.fillText(bag.length, 20, 40);
}
bag.update = () => {};
cnv.entities.push(bag);
shuffle(bag);

const cursor = {};
cursor.square = { move: () => {} };
cursor.last   = { i: -1, j: -1 };

window.addEventListener('mousemove', e => {
    const [ci, cj] = [
        Math.round(e.offsetX/square.default_size),
        Math.round(e.offsetY/square.default_size),
    ];
    cursor.square.move({
        x: ci*square.default_size,
        y: cj*square.default_size
    });
    cursor.last = { i: ci, j: cj };
});
window.addEventListener('mousedown', () => {
    cursor.square = bag.pop()
    console.log(cursor.last);
});

import { hand } from "./hand.js";
const hands = [];
hands.positions = [
    { x: 50, y: cnv.height - 75 },
    { x: 50, y: cnv.height - 25 },
]
hands.push(new hand(cnv, bag, hands.positions[0]));
hands.push(new hand(cnv, bag, hands.positions[1]));
hands.update = () => {};
hands.draw = () => {
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#000000cc';
    ctx.fillText(0, hands.positions[0].x - 45, hands.positions[0].y + 7);
    ctx.fillText(1, hands.positions[1].x - 45, hands.positions[1].y + 7);
}
cnv.entities.push(hands);
