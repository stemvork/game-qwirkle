import { symbol } from "./symbol.js";
export class square {
    constructor(cnv, symbolType='circle', symbolColor='red') {
        this.pos = { x: 0, y: 0 };
        this.size = 50;
        this.bgColor = 'black';
        this.symbol = new symbol(cnv, symbolType, symbolColor);

        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);
    }
    move(pos) {
        this.pos = pos;
        this.symbol.pos = pos;
    }
    update() {
        this.symbol.update(this.pos, this.size);
    }
    draw() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(
            this.pos.x - this.size/2 + 1,
            this.pos.y - this.size/2 + 1,
            this.size - 2,
            this.size - 2
        );
        this.symbol.draw();
    }
}
