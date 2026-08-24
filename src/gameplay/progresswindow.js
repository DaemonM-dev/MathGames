export class ProgressWindow{
    constructor(size, pos, radius, lineWidth){
        this.size = size;
        this.pos = pos;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.initial = {size: {...size}, pos: {...pos}, radius: radius, lineWidth: lineWidth};
        this.color = {inner: 'white', outer: 'white'};

        this.font = 'Arial';
        this.fontSize = 0;
        this.initialFontSize = 0;
        this.fontColor = 'white';
        this.textPos = {x: pos.x, y: pos.y};

        this.level = 1;
        this.levelMsg = "Level - " + this.level;

        this.question = 1;
        this.questionMsg = "Question " + this.question;
    }

    setColors(defIn, defOut){
        this.color.inner = defIn;
        this.color.outer = defOut;
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

    update(level, question){
        if(level !== this.level){
            this.level = level;
            this.levelMsg = "Level - " + this.level;
            this.centerText();
        }
        if(question != this.question){
            this.question = question;
            this.questionMsg = "Question " + this.question;
            this.centerText();
        }
    }

    setFont(font, fontSize, fontColor){
        this.font = font;
        this.fontSize = fontSize;
        this.initialFontSize = fontSize;
        this.fontColor = fontColor;
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

        const levelY = this.textPos.y - 20; // Slightly above center
        ctx.fillText(this.levelMsg, this.textPos.x, levelY);
     
        ctx.font = `${this.fontSize / 1.75}px ${this.font}`;

        const questionY = this.textPos.y + 25; // Slightly below center
        ctx.fillText(this.questionMsg, this.textPos.x, questionY);
    }

    draw(ctx){
        ctx.fillStyle = this.color.inner;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outer;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();

        this.drawText(ctx);
    }
}