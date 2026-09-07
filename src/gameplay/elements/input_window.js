import { GAME_SIZE } from '../../globals.js'

const SIZE = {x: 500, y: 100};
const POS = { x: 1353.5 , y:740};
const CENTER = {x: POS.x + (SIZE.x / 2), y: POS.y + (SIZE.y / 2)};
const RADIUS = 35;
const OUTLINEWIDTH = 8;
const FONTSIZE = 30;
const COLOR = {infill: 'white', outline: 'black' , font: 'black'};
const INPUT_POS = {x: POS.x + 140, y: POS.y + 59};

export class InputWindow{
    constructor(){
        this.scale = 1.0;
        this.size = {...SIZE};
        this.pos = {...POS};
        this.center = {...CENTER};
        this.inputPos = {...INPUT_POS};
        this.radius = RADIUS;
        this.outlineWidth = OUTLINEWIDTH;
        this.fontSize = FONTSIZE;
        this.color = {...COLOR};

        this.kuro = null;

        this.clickHere = "Click here to type...";
        this.inputMsg = "";
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x: SIZE.x * this.scale, y: SIZE.y * this.scale};
        this.pos = {x:POS.x * this.scale, y: POS.y * this.scale};
        this.center = {x:CENTER.x * this.scale, y: CENTER.y * this.scale};
        this.inputPos = {x: INPUT_POS.x * this.scale, y: INPUT_POS.y * this.scale};
        this.radius = RADIUS * this.scale;
        this.outlineWidth = OUTLINEWIDTH * this.scale;
        this.fontSize = FONTSIZE * this.scale;
    }

    init(assets){
        this.kuro = assets.getAsset('kuro');
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();

        if(this.kuro){ctx.drawImage(this.kuro, this.pos.x + 10, this.center.y - 30, 85, 55);}

        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = this.color.font;
        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(this.clickHere, this.inputPos.x, this.inputPos.y, this.size.x);
    }
}