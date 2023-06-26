export class scoreboard {
    constructor(cnv, hands) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.hands = hands;
    }
    update() {}
    draw() {
        this.ctx.fillStyle = '#000000cc';
        this.ctx.fillStyle = this.hands.current !== 0 ? '#000000cc' : '#ff0000cc';
        this.ctx.fillText(`Score: ${this.hands.hands[0].score}`,
           this.hands.positions[0].x + 282,
           this.hands.positions[0].y + 7);
        this.ctx.fillStyle = this.hands.current !== 1 ? '#000000cc' : '#ff0000cc';
        this.ctx.fillText(`Score: ${this.hands.hands[1].score}`,
           this.hands.positions[1].x + 282,
           this.hands.positions[1].y + 7);
    }
}
