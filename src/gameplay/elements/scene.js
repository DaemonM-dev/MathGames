import { GAME_SIZE, getRandomInt } from '../../globals.js'

export class Scene{
    constructor(){
        this.scale = 1.0;
        this.bg = null;
        this.purpleBox = null;
        this.greenBox = null;
        this.blackVertBox = null;
        this.blackHorizBox = null;
        this.boy = null;
        this.girl = null;
        this.menu = null;
    }

    changeScale(scale){
        if(this.bg){
            this.bg.size = {x: this.bg.initial.size.x * scale, y: this.bg.initial.size.y * scale};
            this.bg.pos = {x: this.bg.initial.pos.x * scale, y: this.bg.initial.pos.y * scale};
        }
    }

    init(assets){
        console.log("initializing scene");
        this.bg = {
            texture: assets.getAsset('background'),
            size: {x: 1280, y: 720},
            pos: {x: 0, y: 0}, 
            initial: {
                size: {x:1280, y: 720},
                pos:{x: 0,y: 0}
            }
        }
    }

    update(deltaTime){

    }

    draw(ctx){
        console.log("Drawing Background");
        ctx.drawImage(this.bg.texture, this.bg.pos.x, this.bg.pos.y, this.bg.size.x, this.bg.size.y);
    }
}