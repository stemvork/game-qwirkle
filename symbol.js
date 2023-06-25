import { circle } from "./utils.js";
export class symbol {
    constructor(cnv, type='circle', color='red') {
        this.type = type;
        this.color = color;
        this.pos = { x: 0, y: 0 };
        this.size = 50;

        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);
    }
    update(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    drawCircle(dx, dy, rel_size) {
        circle(this.ctx,
            this.color,
            this.pos.x + dx,
            this.pos.y + dy,
            this.size * rel_size);
    }
    draw() {
        if(this.type === 'circle') {
            this.drawCircle(0, 0, 0.38);
        } else if(this.type === 'flower') {
            const qsize = this.size / 4;
            this.drawCircle(-qsize, 0, 0.17);
            this.drawCircle(qsize,  0, 0.17);
            this.drawCircle(0, -qsize, 0.17);
            this.drawCircle(0, qsize,  0.17);
            this.drawCircle(0, 0,      0.17);
        }
    }
}
