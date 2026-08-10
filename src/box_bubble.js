import {Vector2i} from './constants.js';

export class BoxBubble{
    constructor(pos = null, size = null, radius = 0, color = ''){
        this.pos = pos;
        this.size = size;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx, scaleX, scaleY){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 7 * Math.min(scaleX, scaleY);

        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius * Math.min(scaleX, scaleY));
        ctx.fill();
        ctx.stroke();
    }
}