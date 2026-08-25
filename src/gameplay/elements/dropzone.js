export class Dropzone{
    constructor(){
        this.size = null;
        this.pos = null;
        this.radius = 0;
        this.lineWidth = 0;
        this.color = {infill:'white', outline: 'white'};
        this.initial = {size: null, pos: null, radius: 0, lineWidth: 0};

        this.scale = {x:1.0, y:1.0};
        this.minScale = 1.0;
    }

    initShape(size, pos, radius, lineWidth, infillColor, outlineColor){
        this.size = size;
        this.pos = pos;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.color.infill = infillColor;
        this.color.outline = outlineColor;
        this.initial.size = {...size};
        this.initial.pos = {...pos};
        this.initial.radius = radius;
        this.initial.lineWidth = lineWidth;
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }

    changeScale(scale){
        this.scale = scale;
        this.minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x ,y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x ,y: this.initial.pos.y * scale.y};
        this.radius = this.initial.radius * this.minScale;
        this.lineWidth = this.initial.lineWidth * this.minScale;
    }
}