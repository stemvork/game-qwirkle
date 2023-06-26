export class hand {
    constructor(cnv, bag, pos = { x: 25, y: 25 }) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.pos = pos;
        this.bag = bag;
        this.score = 0;
        this.tiles = [];
        for(let i=0; i<6; i++) {
            this.tiles.push(this.bag.tiles.pop());
        }
        this.update();
    }
    move(pos) {
        this.pos = pos;
        this.update();
        this.draw();
    }
    update() {
        for(let i=0; i<6; i++) {
            this.tiles[i].move({
                x: this.pos.x + i*this.tiles[0].size,
                y: this.pos.y
            })
        }
    }
    draw() {
        this.tiles.map(t => t.draw());
    }
}
export class hands {
    constructor(cnv, bag) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.bag = bag;

        this.current = 0;
        this.selectedTile = null;
        this.hands = [];
        this.positions = [
            { x: 50, y: cnv.height - 75 },
            { x: 50, y: cnv.height - 25 }];
        this.hands.push(new hand(this.cnv, this.bag, this.positions[0]))
        this.hands.push(new hand(this.cnv, this.bag, this.positions[1]))

    }
    update = () => {};
    next = () => {
        this.current = this.current < this.hands.length - 1 ?
            this.current + 1 : 0;
    }
    draw = () => {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = this.current !== 0 ? '#000000cc' : '#ff0000cc';
        this.ctx.fillText(0, this.positions[0].x - 45, this.positions[0].y + 7);
        this.ctx.fillStyle = this.current !== 1 ? '#000000cc' : '#ff0000cc';
        this.ctx.fillText(1, this.positions[1].x - 45, this.positions[1].y + 7);
    }
}
