export class Pricetag{
    constructor(pos, price){
        this.size = {x:100, y:50};
        this.pos = pos;
        this.radius = 5;
        this.lineWidth = 2;
        this.color = {infill: '#fde8d7', outline: 'black'};
        this.initial = {size: {x:100, y:50}, pos: {...pos}, radius: 5, lineWidth: 2};

        this.font = 'Arial';
        this.fontSize = 35;
        this.initialFontSize = 35;
        this.fontColor = 'black';
        this.textPos = {x: pos.x, y: pos.y};
        this.price = price;
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x, y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x, y: this.initial.pos.y * scale.y};;
        this.radius = this.initial.radius * minScale;
        this.lineWidth = this.initial.lineWidth * minScale;
        this.fontSize = this.initialFontSize * minScale;
        this.centerText();
    }

    centerText(){
        const centerX = this.pos.x + this.size.x / 2;
        const centerY = this.pos.y + this.size.y / 2;
        this.textPos = {x: centerX, y: centerY};
    }

    drawText(ctx){
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.price, this.textPos.x, this.textPos.y);
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
        this.drawText(ctx);
    }
}