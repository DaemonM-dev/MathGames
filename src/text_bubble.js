export class TextBubble{
    constructor(pos, size, radius, lineWidth, fontSize, color, scale){
        this.pos = pos;
        this.size = size;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.fontSize = fontSize;
        this.color = color;
        this.scale = scale;

        this.cachedPos = pos;
        this.cachedSize = size;
        this.cachedRadius = radius;
        this.cachedLW = lineWidth;
        this.cachedFS = fontSize;
    }

    update(scale, ctx, deltaTime){
        this.scaleBubble(scale, ctx);
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

    scaleBubble(scale, ctx){
        this.size = { x: this.cachedSize.x * scale.x, y: this.cachedSize.y * scale.y };
        this.radius = this.cachedRadius * Math.min(scale.x, scale.y);
        this.lineWidth = this.cachedLW * Math.min(scale.x, scale.y);

        this.pos = {x: (ctx.canvas.width / 4) - (this.size.x / 2),
                    y: ctx.canvas.height - this.size.y - (this.lineWidth / 2)};
    }

}