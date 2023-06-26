import { square } from "./square.js";
export class board {
    constructor(cnv, cursor) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.cursor = cursor;
        this.center = this.cursor.get_index({
            x: this.cnv.width/2,
            y: this.cnv.height/2
        });
        console.log('board center', this.center);

        this.tiles = [];
        this.highlights = [];
        this.highlight(this.center);
    }
    update() {}
    draw() {
        this.tiles.map(t => t.draw());
        this.highlights.map(hi => {
            const pos = this.cursor.get_pos(hi);
            const size = square.default_size;
            this.ctx.fillStyle = '#cccccccc';
            if(this.cursor.placed > 1) this.ctx.fillStyle = '#ffcc00cc';
            this.ctx.fillRect(pos.x - size/2, pos.y - size/2, size, size);
        });
    }
    isConnected() {
        if(this.tiles.length === 0) return true;
        return this.tiles.some(tile => {
            return (Math.abs(this.cursor.last.i - tile.index.i) === 1.0 &&
            Math.abs(this.cursor.last.j - tile.index.j) === 0.0) ||
            (Math.abs(this.cursor.last.i - tile.index.i) === 0.0 &&
            Math.abs(this.cursor.last.j - tile.index.j) === 1.0)
        });
    }
    hash_index(i) {
        return i.i*108+i.j;
    }
    highlight(index) { this.highlights.push(index); }
    highlightNeighbors() {
        this.highlights = [];
        for(const tile of this.tiles) {
            const neighbors = [{ i: tile.index.i - 1, j: tile.index.j },
                { i: tile.index.i + 1, j: tile.index.j },
                { i: tile.index.i, j: tile.index.j - 1 },
                { i: tile.index.i, j: tile.index.j + 1 },
            ]
            const tiles_hashes = this.tiles.map(tile =>
                this.hash_index(tile.index));
            console.log(tiles_hashes);
            neighbors.filter(n =>
                tiles_hashes.indexOf(this.hash_index(n)) === -1)
                     .map(n => this.highlight(n));
            // TODO: after placing second tile, restrict highlights further
        }
    }
}
