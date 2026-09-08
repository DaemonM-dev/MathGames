import { GAME_SIZE, getRandomInt } from '../../globals.js'

const SIZE = {x: 600, y: 300};
const POS = { x: 338 , y:755};
const BOUNDS_SIZE = {x: 425, y: 240};
const BOUNDS_POS = {
    x: POS.x + (SIZE.x / 2) - BOUNDS_SIZE.x / 2,
    y: POS.y + (SIZE.y / 2) - BOUNDS_SIZE.y / 2
};
const CENTER = {x: BOUNDS_POS.X + BOUNDS_SIZE.x / 2, y: BOUNDS_POS.y + BOUNDS_SIZE.y / 2};


export class SpeechBubble{
    constructor(){
        this.scale = 1.0;
        this.imgLeft = null;
        this.imgRight = null;
        this.size = {...SIZE};
        this.pos = {...POS};
        this.direction = 'RIGHT';
        this.textBounds = { size: {...BOUNDS_SIZE}, pos: {...BOUNDS_POS} };
        this.center = {...CENTER};
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x:SIZE.x * this.scale, y: SIZE.y * this.scale};
        this.pos = {x:POS.x * this.scale, y: POS.y * this.scale};
        this.textBounds.size = {x:BOUNDS_SIZE.x * this.scale, y: BOUNDS_SIZE.y * this.scale};
        this.textBounds.pos = {x:BOUNDS_POS.x * this.scale, y: BOUNDS_POS.y * this.scale};
        this.center = {x:CENTER.x * this.scale, y: CENTER.y * this.scale};
    }

    init(assets){
        this.imgLeft = assets.getAsset('dialogueleft');
        this.imgRight = assets.getAsset('dialogueright');
        const RAND = getRandomInt(1,2);
        switch(RAND){
            case 1: this.direction = 'RIGHT'; break;
            case 2: this.direction = 'LEFT'; break;
        }
    }

    draw(ctx){
        switch(this.direction){
            case 'LEFT': ctx.drawImage(this.imgLeft, this.pos.x, this.pos.y, this.size.x, this.size.y); break;
            case 'RIGHT': ctx.drawImage(this.imgRight, this.pos.x, this.pos.y, this.size.x, this.size.y); break;
        }

       // this.drawTextBounds(ctx);
    }

    changeDirection(){
        switch(this.direction){
            case 'LEFT': this.direction = 'RIGHT'; break;
            case 'RIGHT': this.direction = 'LEFT'; break;
        }
    }

    drawTextBounds(ctx){
        ctx.fillStyle = '#ee131362';
        ctx.fillRect(this.textBounds.pos.x, this.textBounds.pos.y, this.textBounds.size.x, this.textBounds.size.y);
    }
    getTextBounds(){
        return this.textBounds;
    }
}