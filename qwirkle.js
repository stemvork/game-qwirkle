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

const board = {};
board.tiles = [];
board.update = () => {};
board.draw = () => { board.tiles.map(t => t.draw()); };
board.isConnected = () => {
    console.log('board size', board.tiles.length);
    console.log('cursor index', cursor.last);
    if(board.tiles.length === 0) return true;
    return board.tiles.some(tile => {
        console.log('tile index', tile.index);
        return (Math.abs(cursor.last.i - tile.index.i) === 1.0 &&
        Math.abs(cursor.last.j - tile.index.j) === 0.0) ||
        (Math.abs(cursor.last.i - tile.index.i) === 0.0 &&
        Math.abs(cursor.last.j - tile.index.j) === 1.0)
    });
}

const cursor = {};
cursor.square = { move: () => {} };
cursor.get_index = pp => {
    console.log('pp', pp);
    return {
        i: Math.round(pp.x / square.default_size),
        j: Math.round(pp.y / square.default_size)
    }
}
cursor.get_pos = cc => {
    return {
        x: cc.i * square.default_size,
        y: cc.j * square.default_size
    };
}
cursor.last   = cursor.get_index({ x: cnv.width/2, y: cnv.height/2 });
console.log(cursor.last);
cursor.from   = (_square) => {
    if(hands.selectedTile !== null) {
        cnv.entities.pop();
        cnv.entities.pop();
    }
    const new_pos = cursor.get_pos(cursor.last);
    cursor.square = _square.copy(new_pos);
}
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
import { last } from "./utils.js";
window.addEventListener('mousedown', () => {
    if(hands.selectedTile === null) return;
    if(!board.isConnected()) return;
    const new_pos = cursor.get_pos(cursor.last);
    board.tiles.push(cursor.square.copy(new_pos));
    last(board.tiles).index = cursor.last;
    const new_tile = bag.pop();
    hands[hands.current].tiles[hands.selectedTile] = new_tile;
    cursor.from(new_tile);
});

import { hand } from "./hand.js";
const hands = [];
hands.current = 0;
hands.selectedTile = null;
hands.positions = [
    { x: 50, y: cnv.height - 75 },
    { x: 50, y: cnv.height - 25 },
]
hands.push(new hand(cnv, bag, hands.positions[0]));
hands.push(new hand(cnv, bag, hands.positions[1]));
hands.update = () => {};
hands.next = () => {
    hands.current = hands.current < hands.length - 1 ? hands.current + 1 : 0;
}
hands.draw = () => {
    ctx.font = '24px sans-serif';
    ctx.fillStyle = hands.current !== 0 ? '#000000cc' : '#ff0000cc';
    ctx.fillText(0, hands.positions[0].x - 45, hands.positions[0].y + 7);
    ctx.fillStyle = hands.current !== 1 ? '#000000cc' : '#ff0000cc';
    ctx.fillText(1, hands.positions[1].x - 45, hands.positions[1].y + 7);
}
cnv.entities.push(hands);
window.addEventListener('keydown', e => {
    if(e.key === ' ') {
        hands.next();
    } else if(e.key === '1') {
        cursor.from(hands[hands.current].tiles[0]);
        hands.selectedTile = 0;
    } else if(e.key === '2') {
        cursor.from(hands[hands.current].tiles[1]);
        hands.selectedTile = 1;
    } else if(e.key === '3') {
        cursor.from(hands[hands.current].tiles[2]);
        hands.selectedTile = 2;
    } else if(e.key === '4') {
        cursor.from(hands[hands.current].tiles[3]);
        hands.selectedTile = 3;
    } else if(e.key === '5') {
        cursor.from(hands[hands.current].tiles[4]);
        hands.selectedTile = 4;
    } else if(e.key === '6') {
        cursor.from(hands[hands.current].tiles[5]);
        hands.selectedTile = 5;
    }
});

const scoreboard = {};
scoreboard.update = () => {};
scoreboard.draw = () => {
    ctx.fillStyle = '#000000cc';
    ctx.fillStyle = hands.current !== 0 ? '#000000cc' : '#ff0000cc';
    ctx.fillText(`Score: ${hands[0].score}`,
       hands.positions[0].x + 282,
       hands.positions[0].y + 7);
    ctx.fillStyle = hands.current !== 1 ? '#000000cc' : '#ff0000cc';
    ctx.fillText(`Score: ${hands[1].score}`,
       hands.positions[1].x + 282,
       hands.positions[1].y + 7);
};
cnv.entities.push(scoreboard);
