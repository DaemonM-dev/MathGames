import { GAME_SIZE } from '../../globals.js'

const SIZE = {x: 500, y: 100};
const POS = { x: 1353.5 , y:740};
const CENTER = {x: POS.x + (SIZE.x / 2), y: POS.y + (SIZE.y / 2)};
const RADIUS = 35;
const OUTLINEWIDTH = 8;
const FONTSIZE = 50;
const COLOR = {infill: 'white', outline: 'black' , font: 'black'};
const TEXT_POS = {x: POS.x + 135, y: CENTER.y};
const KURO = {size: {x: 110, y: 85}, pos: {x: POS.x + 10, y: CENTER.y - 45}};

export class InputWindow{
    constructor(){
        this.scale = 1.0;
        this.size = {...SIZE};
        this.pos = {...POS};
        this.center = {...CENTER};
        this.textPos = {...TEXT_POS};
        this.radius = RADIUS;
        this.outlineWidth = OUTLINEWIDTH;
        this.fontSize = FONTSIZE;
        this.color = {...COLOR};

        this.kuro = {texture: null, size: {...KURO.size}, pos: {...KURO.pos}};

        this.clickHere = "Type answer here...";
        this.inputMsg = "";
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x: SIZE.x * this.scale, y: SIZE.y * this.scale};
        this.pos = {x:POS.x * this.scale, y: POS.y * this.scale};
        this.center = {x:CENTER.x * this.scale, y: CENTER.y * this.scale};
        this.textPos = {x: TEXT_POS.x * this.scale, y: TEXT_POS.y * this.scale};
        this.kuro.size = {x: KURO.size.x * this.scale, y: KURO.size.y * this.scale};
        this.kuro.pos = {x: KURO.pos.x * this.scale, y: KURO.pos.y * this.scale};
        this.radius = RADIUS * this.scale;
        this.outlineWidth = OUTLINEWIDTH * this.scale;
        this.fontSize = FONTSIZE * this.scale;
    }

    init(assets){
        this.kuro.texture = assets.getAsset('kuro');
    }

    update(deltaTime){
        if(this.inputMsg === ""){this.inputMsg = this.clickHere;}
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
        if(this.kuro){ctx.drawImage(this.kuro.texture, this.kuro.pos.x, this.kuro.pos.y, this.kuro.size.x, this.kuro.size.y);}
        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = this.color.font;
        ctx.textAlign = 'start';
        ctx.textBaseline = 'middle';

        if(this.inputMsg === this.clickHere){
            ctx.font = `${this.fontSize / 1.5}px ${'PoppinsBold'}`;
            ctx.fillStyle = '#00000041';
        }
        ctx.fillText(this.inputMsg, this.textPos.x, this.textPos.y + (2 * this.scale), this.size.x);
    }
}