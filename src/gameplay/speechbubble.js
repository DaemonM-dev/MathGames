import { Direction } from '../constants.js'

export class SpeechBubble{
    constructor(size, pos, radius, lineWidth){
        this.size = size;
        this.pos = pos;
        this.radius = radius;
        this.lineWidth = lineWidth;

        this.initial = {size: {...size}, pos: {...pos}, radius: radius, lineWidth: lineWidth};

        this.color = {inner: 'white', outer: 'white'};
        this.dir = Direction.NONE;
        this.visible = true;

        this.textVisible = false;
        this.font = 'Arial';
        this.fontSize = 0;
        this.initialFontSize = 0;
        this.fontColor = 'white';
        this.text = " ";
    }

    setColors(defIn, defOut){
        this.color.inner = defIn;
        this.color.outer = defOut;
    }

    setDirection(newDir){
        if(newDir !== this.dir){
            this.dir = newDir;
        }
    }

    getDirection(){
        return this.dir;
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x, y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x, y: this.initial.pos.y * scale.y};;
        this.radius = this.initial.radius * minScale;
        this.lineWidth = this.initial.lineWidth * minScale;
    }

    draw(ctx){
        if(!this.visible){return;}
        ctx.fillStyle = this.color.inner;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outer;
        ctx.beginPath();
        switch(this.dir){
            case Direction.NONE:
                ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
            break;
            case Direction.LEFT:
                ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 
                    [0, this.radius, this.radius, this.radius]);
            break;
            case Direction.RIGHT:
                ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 
                    [this.radius, 0, this.radius, this.radius]);
            break;
        }
        ctx.fill();
        ctx.stroke();
    }
}