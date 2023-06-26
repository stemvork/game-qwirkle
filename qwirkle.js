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

// Game specific logic
import { game } from "./game.js";
const g = new game(cnv);
window.addEventListener('keydown', e => {
    if(e.key === ' ') {
        g.hands.next();
    } else if(e.key === '1') {
        g.cursor.from(g.hands.hands[g.hands.current].tiles[0]);
        g.hands.selectedTile = 0;
    } else if(e.key === '2') {
        g.cursor.from(g.hands.hands[g.hands.current].tiles[1]);
        g.hands.selectedTile = 1;
    } else if(e.key === '3') {
        g.cursor.from(g.hands.hands[g.hands.current].tiles[2]);
        g.hands.selectedTile = 2;
    } else if(e.key === '4') {
        g.cursor.from(g.hands.hands[g.hands.current].tiles[3]);
        g.hands.selectedTile = 3;
    } else if(e.key === '5') {
        g.cursor.from(g.hands.hands[g.hands.current].tiles[4]);
        g.hands.selectedTile = 4;
    } else if(e.key === '6') {
        g.cursor.from(g.hands.hands[g.hands.current].tiles[5]);
        g.hands.selectedTile = 5;
    }
});


import { square } from "./square.js";
window.addEventListener('mousemove', e => {
    const [ci, cj] = [
        Math.round(e.offsetX/square.default_size),
        Math.round(e.offsetY/square.default_size),
    ];
    g.cursor.square.move({
        x: ci*square.default_size,
        y: cj*square.default_size
    });
    g.cursor.last = { i: ci, j: cj };
});
import { last } from "./utils.js";
window.addEventListener('mousedown', () => {
    if(g.hands.selectedTile === null) return;
    if(!g.board.isConnected()) return;
    const new_pos = g.cursor.get_pos(g.cursor.last);
    g.board.tiles.push(g.cursor.square.copy(new_pos));
    last(g.board.tiles).index = g.cursor.last;
    const new_tile = g.bag.tiles.pop();
    // BUG: would be easier to "change" tiles, instead of creating new
    new_tile.hidden = true;
    g.hands.hands[g.hands.current].tiles[g.hands.selectedTile] = new_tile;
    g.cursor.from(new_tile);
});

