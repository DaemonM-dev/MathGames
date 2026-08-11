export class TextBubble{
    constructor(pos, size, radius, lineWidth, fontSize, color){
        this.pos = pos,
        this.size = size,
        this.radius = radius,
        this.lineWidth = lineWidth,
        this.fontSize = fontSize,
        this.color = color
    }

    draw(ctx){
        this.drawBubble(ctx);
    }

    drawBubble(ctx){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }

}