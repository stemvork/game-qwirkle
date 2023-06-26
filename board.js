export class board {
    constructor(cnv, cursor) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.cursor = cursor;

        this.tiles = [];
    }
    update() {}
    draw() {
        this.tiles.map(t => t.draw());
    }
    isConnected() {
        console.log('board size', this.tiles.length);
        console.log('cursor index', this.cursor.last);
        if(this.tiles.length === 0) return true;
        return this.tiles.some(tile => {
            console.log('tile index', tile.index);
            return (Math.abs(this.cursor.last.i - tile.index.i) === 1.0 &&
            Math.abs(this.cursor.last.j - tile.index.j) === 0.0) ||
            (Math.abs(this.cursor.last.i - tile.index.i) === 0.0 &&
            Math.abs(this.cursor.last.j - tile.index.j) === 1.0)
        });
    }
}
