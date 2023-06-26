import { bag } from "./bag.js";
import { hands } from "./hand.js";
import { cursor } from "./cursor.js";
import { board } from "./board.js";
import { scoreboard } from "./scoreboard.js";
import { square } from "./square.js";
import { last } from "./utils.js";
export class game {
    constructor(cnv) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.bag = new bag(this.cnv);
        this.hands = new hands(this.cnv, this.bag);
        this.cursor = new cursor(this.cnv, this.hands);
        this.board = new board(this.cnv, this.cursor);
        this.scoreboard = new scoreboard(this.cnv, this.hands);
    }
    update() {}
    draw() {}
    nextPlayer() {
        this.hands.next();
        this.cursor.placed = 0;
    }
    selectTile() {
        this.cursor.from(this.hands.hands[this.hands.current].tiles[0]);
        this.cursor.square.move(
            this.cursor.get_pos(this.board.highlights[0]));
        this.hands.selectedTile = 0;
    }
    keyDown(e) {
        if(e.key === ' ') this.nextPlayer();
        else if(e.key === '1') this.selectTile(0);
        else if(e.key === '2') this.selectTile(1);
        else if(e.key === '3') this.selectTile(2);
        else if(e.key === '4') this.selectTile(3);
        else if(e.key === '5') this.selectTile(4);
        else if(e.key === '6') this.selectTile(5);
    }
    moveMouse(e) {
        const [ci, cj] = [
            Math.round(e.offsetX/square.default_size),
            Math.round(e.offsetY/square.default_size),
        ];
        console.log('number of highlights', this.board.highlights.length);
        let moving = this.board.highlights.some(hi => hi.i === ci && hi.j === cj);
        if(moving) this.cursor.square.move({
            x: ci*square.default_size,
            y: cj*square.default_size
        });
        this.cursor.last = { i: ci, j: cj };
    }
    clickMouse(e) {
        if(this.hands.selectedTile === null) return;
        if(!this.board.isConnected()) return;
        const new_pos = this.cursor.get_pos(this.cursor.last);
        this.board.tiles.push(this.cursor.square.copy(new_pos));
        last(this.board.tiles).index = this.cursor.last;
        const new_tile = this.bag.tiles.pop();
        const currentHand = this.hands.hands[this.hands.current];
        currentHand.tiles[this.hands.selectedTile] = new_tile;
        this.cursor.from(new_tile);
        this.board.highlightNeighbors();
        this.cursor.placed += 1;
    }
}
