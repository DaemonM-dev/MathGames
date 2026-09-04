import { GAME_SIZE } from '../../globals.js'

const BG_SIZE = {x: 1280, y: 720};
const SIZE = {x: 500, y: 150};
const POS = { x: 1355 , y:20};
const RADIUS = 35;
const OUTLINEWIDTH = 8;
const FONTSIZE = 60;
const LINESPACE = 30;
const COLOR = {infill: 'white', outline: 'black' , font: 'black'};
const CENTER = {x: POS.x + (SIZE.x / 2), y: POS.y + (SIZE.y / 2)};

export class ProgressWindow{
    constructor(){
        this.scale = 1.0;
        this.size = {...SIZE};
        this.pos = {...POS};
        this.center = {...CENTER};
        this.radius = RADIUS;
        this.outlineWidth = OUTLINEWIDTH;
        this.fontSize = FONTSIZE;
        this.lineSpace = LINESPACE;
        this.color = {infill: COLOR.infill, outline: COLOR.outline, font: COLOR.font};

        this.initial = {
            size: {...SIZE},
            pos: {...POS},
            center: {...CENTER},
            radius: RADIUS,
            outlineWidth: OUTLINEWIDTH,
            fontSize: FONTSIZE,
            lineSpace: LINESPACE
        }

        this.level = 0;
        this.question = 0;
        this.levelMsg = "";
        this.questionMsg = "";
    }

    changeScale(scale){
        this.scale = scale;
        this.size = { x:this.initial.size.x * scale, y: this.initial.size.y * scale };
        this.pos = { x:this.initial.pos.x * scale, y: this.initial.pos.y * scale };
        this.center = { x:this.initial.center.x * scale, y: this.initial.center.y * scale };
        this.radius = this.initial.radius * scale;
        this.outlineWidth = this.initial.outlineWidth * scale;
        this.fontSize = this.initial.fontSize * scale;
        this.lineSpace = this.initial.lineSpace * scale;
    }

    update(question, level){
        if(level !== this.level){this.level = level; this.levelMsg = "Level " + this.level;}
        if(question !== this.question){this.question = question; this.questionMsg = "Question " + this.question;}
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = this.color.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.levelMsg, this.center.x, this.center.y - this.lineSpace + (10 * this.scale), this.size.x);
        ctx.font = `${this.fontSize / 1.75}px ${'PoppinsBold'}`;
        ctx.fillText(this.questionMsg, this.center.x, this.center.y + this.lineSpace, this.size.x);
    }
}