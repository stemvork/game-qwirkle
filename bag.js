import { square } from "./square.js";
import { shuffle } from "./utils.js";
export class bag {
    static types = ['square',
        'circle',
        'diamond',
        'flower',
        'star4',
        'star8'];
    static colors = ['red',
        'gold',
        'darkorange',
        'forestgreen',
        'royalblue',
        'slateblue'];

    constructor(cnv) {
        this.cnv = cnv;
        this.ctx = cnv.ctx;
        this.cnv.entities.push(this);

        this.tiles = [];
        for(let i=0; i<6; i++) {
            for(let j=0; j<6; j++) {
                for(let k=0; k<3; k++) {
                    const _square = new square(this.cnv,
                        bag.types[j],
                        bag.colors[i]);
                    _square.pos = { x: -(2**32), y: -(2**32) };
                    this.tiles.push(_square);
                }
            }
        }
        shuffle(this.tiles);
    }
    draw() {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = '#000000cc';
        this.ctx.fillText(this.tiles.length, 20, 40);
    }
    update() {}
}
