import { square } from "./square.js";
export class cursor {
    constructor(cnv, hands) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.hands = hands;

        this.square = { move: () => {} };
        this.last = this.get_index({ x: cnv.width/2, y: cnv.height/2 });
    }
    update() {}
    draw() {
    }
    get_index(pp) {
        return {
            i: Math.round(pp.x / square.default_size),
            j: Math.round(pp.y / square.default_size)
        }
    }
    get_pos(cc) {
        return {
            x: cc.i * square.default_size,
            y: cc.j * square.default_size
        };
    }
    from(_square) {
        if(this.hands.selectedTile !== null) {
            this.cnv.entities.pop();
            this.cnv.entities.pop();
        }
        const new_pos = this.get_pos(this.last);
        this.square = _square.copy(new_pos);
    }
}
