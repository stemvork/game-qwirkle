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
        } else if(this.type === 'star4') {
            const asize = this.size * 0.38;
            const bsize = this.size * 0.15;
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.pos.x - asize, this.pos.y - asize);
            this.ctx.lineTo(this.pos.x, this.pos.y - bsize);
            this.ctx.lineTo(this.pos.x + asize, this.pos.y - asize);
            this.ctx.lineTo(this.pos.x + bsize, this.pos.y);
            this.ctx.lineTo(this.pos.x + asize, this.pos.y + asize);
            this.ctx.lineTo(this.pos.x, this.pos.y + bsize);
            this.ctx.lineTo(this.pos.x - asize, this.pos.y + asize);
            this.ctx.lineTo(this.pos.x - bsize, this.pos.y);
            this.ctx.closePath();
            this.ctx.fill();
        } else if(this.type === 'star8') {
            const asize = this.size * 0.44;
            const bsize = this.size * 0.18;
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            const n = 16;
            const points = Array(n).fill(false).map((_, i) => {
                const a = i*2*Math.PI/n;
                const r = i%2===0 ? asize : bsize;
                return [
                    this.pos.x + r * Math.cos(a),
                    this.pos.y + r * Math.sin(a)
                ]
            })
            this.ctx.moveTo(points[0][0], points[0][1]);
            for(const point of points.slice(1)) {
                this.ctx.lineTo(point[0], point[1]);
            }
            this.ctx.fill();
        }
    }
}
