import { Command } from './input_handler.js'

export class UiHandler{
    constructor(){
        this.scale = {x: 1.0, y: 1.0}
        this.background = null;
    }
    
    initUI(assets){
        this.background = assets.getAsset('background');
    }

    updateUI(scale, deltaTime){
        if(scale.x !== this.scale.x || scale.y != this.scale.y){this.scale = {...scale};}
    }

    drawUI(ctx){
        ctx.drawImage(this.background,0,0, this.background.width * this.scale.x, this.background.height * this.scale.y);
    }
}