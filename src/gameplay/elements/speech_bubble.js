const Direction = {
    LEFT: 'left',
    RIGHT: 'right'
}

export class SpeechBubble{
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

        this.activeMsg = " ";
        this.direction = Direction.RIGHT;
        this.scale = {x:1.0,y:1.0};
        this.minScale = 1.0;

        this.imgRight = null;
        this.imgLeft = null;
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

    initImages(assets){
        this.imgRight = {
            texture: assets.getAsset('dialogueright'),
            size: this.size,
            pos: this.pos, 
            initial: {
                size: this.initial.size,
                pos:this.initial.pos
            }
        }
        this.imgLeft = {
            texture: assets.getAsset('dialogueleft'),
            size: this.size,
            pos: this.pos, 
            initial: {
                size: this.initial.size,
                pos:this.initial.pos
            }
        }
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


    let padding = 40 * Math.min(this.scale.x, this.scale.y);

        switch(this.direction){
            case Direction.LEFT:
/*
                ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 
                    [0, this.radius, this.radius, this.radius]);
*/

                    ctx.drawImage(this.imgLeft.texture, this.pos.x - (padding / 2), this.pos.y - (padding / 2), this.size.x + padding, this.size.y + padding);

                break;
            case Direction.RIGHT:
/*
                ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 
                    [this.radius, 0, this.radius, this.radius]);
*/
                    ctx.drawImage(this.imgRight.texture, this.pos.x - (padding / 2), this.pos.y - (padding / 2), this.size.x + padding, this.size.y + padding);
                break;
        }
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
        const centerY = this.pos.y + 75 + this.size.y / 2;
        this.centerPoint = {x: centerX, y: centerY};
    }

    changeScale(scale){
        this.scale = scale;
        this.minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x ,y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x ,y: this.initial.pos.y * scale.y};

        this.radius = this.initial.radius * this.minScale;
        this.lineWidth = this.initial.lineWidth * this.minScale;
        this.fontSize = this.initial.fontSize * this.minScale;
        this.findCenterPoint();
    }

    changeDirection(){
        switch(this.direction){
            case Direction.LEFT:
                this.direction = Direction.RIGHT;
            break;
            case Direction.RIGHT:
                this.direction = Direction.LEFT;
            break;
        }
    }
}