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

const game = {};

import { bag } from "./bag.js";
game.bag = new bag(cnv);

import { hands } from "./hand.js";
game.hands = new hands(cnv, game.bag);
window.addEventListener('keydown', e => {
    if(e.key === ' ') {
        game.hands.next();
    } else if(e.key === '1') {
        game.cursor.from(game.hands.hands[game.hands.current].tiles[0]);
        game.hands.selectedTile = 0;
    } else if(e.key === '2') {
        game.cursor.from(game.hands.hands[game.hands.current].tiles[1]);
        game.hands.selectedTile = 1;
    } else if(e.key === '3') {
        game.cursor.from(game.hands.hands[game.hands.current].tiles[2]);
        game.hands.selectedTile = 2;
    } else if(e.key === '4') {
        game.cursor.from(game.hands.hands[game.hands.current].tiles[3]);
        game.hands.selectedTile = 3;
    } else if(e.key === '5') {
        game.cursor.from(game.hands.hands[game.hands.current].tiles[4]);
        game.hands.selectedTile = 4;
    } else if(e.key === '6') {
        game.cursor.from(game.hands.hands[game.hands.current].tiles[5]);
        game.hands.selectedTile = 5;
    }
});

import { cursor } from "./cursor.js";
game.cursor = new cursor(cnv, game.hands);

import { board } from "./board.js";
game.board = new board(cnv, game.cursor);

import { square } from "./square.js";
window.addEventListener('mousemove', e => {
    const [ci, cj] = [
        Math.round(e.offsetX/square.default_size),
        Math.round(e.offsetY/square.default_size),
    ];
    game.cursor.square.move({
        x: ci*square.default_size,
        y: cj*square.default_size
    });
    game.cursor.last = { i: ci, j: cj };
});
import { last } from "./utils.js";
window.addEventListener('mousedown', () => {
    if(game.hands.selectedTile === null) return;
    if(!game.board.isConnected()) return;
    const new_pos = game.cursor.get_pos(game.cursor.last);
    game.board.tiles.push(game.cursor.square.copy(new_pos));
    last(game.board.tiles).index = game.cursor.last;
    const new_tile = game.bag.tiles.pop();
    // BUG: would be easier to "change" tiles, instead of creating new
    new_tile.hidden = true;
    game.hands.hands[game.hands.current].tiles[game.hands.selectedTile] = new_tile;
    game.cursor.from(new_tile);
});

import { scoreboard } from "./scoreboard.js";
game.scoreboard = new scoreboard(cnv, game.hands);
