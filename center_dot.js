export class centerDot {
    constructor(cnv) {
        this.radius = 5;
        this.color = 'red'
        this.cnv = cnv;
        this.ctx = this.cnv.ctx;
        this.cnv.entities.push(this);
    }
    update() {
        this.pos = this.cnv.center;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
