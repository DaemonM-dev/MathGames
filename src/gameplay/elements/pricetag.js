export class Pricetag{
    constructor(pos, price){
        this.scale = 1.0;

        this.size = {x:100, y:50};
        this.pos = pos;
        this.center = {x: pos.x + (this.size.x / 2), y: pos.y + (this.size.y / 2)};

        this.radius = 5;
        this.lineWidth = 2;
        this.color = {infill: '#fde8d7', outline: 'black'};
        this.initial = {size: {x:100, y: 50}, pos: {...pos}, center: {...this.center}, radius: 5, lineWidth: 2};

        this.fontSize = 35;
        this.initialFontSize = 35;

        this.price = price;
    }

    changeScale(scale){
        this.scale = scale;

        this.size = {x: this.initial.size.x * this.scale, y: this.initial.size.y * this.scale};
        this.pos = {x: this.initial.pos.x * this.scale, y: this.initial.pos.y * this.scale};
        this.center = {x: this.initial.center.x * this.scale, y: this.initial.center.y * this.scale};

        this.radius = this.initial.radius * this.scale;
        this.lineWidth = this.initial.lineWidth * this.scale;
        this.fontSize = this.initialFontSize * this.scale;
    }

    drawText(ctx){
        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.price, this.center.x, this.center.y + (4 * this.scale));
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