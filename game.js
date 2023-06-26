import { bag } from "./bag.js";
import { hands } from "./hand.js";
import { cursor } from "./cursor.js";
import { board } from "./board.js";
import { scoreboard } from "./scoreboard.js";
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
}
