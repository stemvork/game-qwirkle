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
            this.tiles.push(bag.pop());
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
