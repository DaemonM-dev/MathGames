import { GAME_SIZE } from '../../globals.js'

const SIZE = {x: 500, y: 500};
const POS = { x: 1353.5 , y:205};
const RADIUS = 45;
const OUTLINEWIDTH = 8;
const COLOR = {infill: 'white', outline: 'black'};

export class Dropzone{
    constructor(){
        this.scale = 1.0;
        this.size = {...SIZE};
        this.pos = {...POS};
        this.radius = RADIUS;
        this.outlineWidth = OUTLINEWIDTH;
        this.color = COLOR;
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x:SIZE.x * this.scale, y: SIZE.y * this.scale};
        this.pos = {x:POS.x * this.scale, y: POS.y * this.scale};
        this.radius = RADIUS * this.scale;
        this.outlineWidth = OUTLINEWIDTH * this.scale;
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }

    // getAccValue()
    // getItemTypes()
    // getItemCount()
}