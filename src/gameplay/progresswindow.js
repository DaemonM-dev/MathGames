import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js';
import { GameObject } from './gameobjects.js'

export class ProgressWindow{
    constructor(){
        this.TOTAL_LVLs = 5;
        this.TOTAL_Qs = 5;

        this.currentLevel = 1;
        this.currentQuestion = 1;

        this.init();
    }

    changeScale(scale){
        this.window.changeScale(scale);
    }

    init(){
        const BG_SIZE = {x:1280, y:730};
        const SIZE = {x:400, y:150};
        const POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - SIZE.x) / 2,
            y: 32
        };
        this.window = new GameObject(null, SIZE, POS);
        this.window.setColor('white');
        this.window.setOutlineColor('black');
        this.window.setRadius(25);
        this.window.setOutlineWidth(8);
    }

    draw(ctx){
        ctx.fillStyle = this.window.color;
        ctx.lineWidth = this.window.outlineWidth;
        ctx.strokeStyle = this.window.outlineColor;
        ctx.beginPath();
        ctx.roundRect(this.window.pos.x, this.window.pos.y, this.window.size.x, this.window.size.y, this.window.radius);
        ctx.fill();
        ctx.stroke();
    }
}