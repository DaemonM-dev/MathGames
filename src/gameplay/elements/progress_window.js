export class ProgressWindow{
    constructor(){
        this.size = null;
        this.pos = null;
        this.radius = 0;
        this.lineWidth = 0;
        this.color = {infill:'white', outline: 'white'};
        this.font = 'Arial';
        this.fontSize = 0;
        this.fontColor = 'white';
        this.initial = {size: null, pos: null, radius: 0, lineWidth: 0, fontSize: 0};
        this.centerPoint = null;
        this.currentLvl = 1;
        this.currentQuestion = 1;

        this.levelMsg = "Level " + this.currentLvl;
        this.questionMsg = "Question " + this.currentQuestion;

        this.scale = {x:1.0,y:1.0};
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

        this.findCenterPoint();
    }

    initText(font, fontSize, fontColor){
        this.font = font;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.initial.fontSize = fontSize;
    }

    draw(ctx){
        this.drawShape(ctx);
        this.drawText(ctx);
    }

    drawShape(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }

    drawText(ctx){
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const levelY = this.centerPoint.y - (20 * this.minScale); // Slightly above center
        ctx.fillText(this.levelMsg, this.centerPoint.x, levelY);
        ctx.font = `${this.fontSize / 1.75}px ${this.font}`;
        const questionY = this.centerPoint.y + (35 * this.minScale); // Slightly below center
        ctx.fillText(this.questionMsg, this.centerPoint.x, questionY);
    }

    findCenterPoint(){
        const centerX = this.pos.x + this.size.x / 2;
        const centerY = this.pos.y + this.size.y / 2;
        this.centerPoint = {x: centerX, y: centerY};
    }

    changeScale(scale){
        this.scale = scale;
        this.minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x ,y: this.initial.size.y * this.minScale};
        this.pos = {x: this.initial.pos.x * scale.x ,y: this.initial.pos.y * scale.y};

        this.radius = this.initial.radius * this.minScale;
        this.lineWidth = this.initial.lineWidth * this.minScale;
        this.fontSize = this.initial.fontSize * this.minScale;
        this.findCenterPoint();
    }
}