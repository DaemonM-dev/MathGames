import { GAME_SIZE } from '../../globals.js'

const SIZE = { x:1920, y: 1080 };

const LOWER =   { x: 0, y: GAME_SIZE.y };
const MIDDLE =  { x: 0, y: 0 };
const HIGHER =  { x: 0, y: -SIZE.y };

const SPEED = 800;

export class LevelSting {

    constructor(){

        this.scale = 1.0;
        this.texture = null;

        this.size = {...SIZE};
        this.pos = {...LOWER};
        this.cachedPos = {...LOWER};

        this.dest = 'lower';
        this.newDest = 'lower';

        this.moving = false;
    }

    changeScale(scale){
        this.scale = scale;

        this.size = {x: SIZE.x * scale, y: SIZE.y * scale};
        this.pos = {x: this.cachedPos.x * scale, y: this.cachedPos.y * scale};
    }

    init(assets){
        this.texture = assets.getAsset('levelSting');
    }

    play(){
        if(!this.moving && this.dest === this.newDest){
            switch(this.dest){
                case 'lower': this.newDest = 'middle'; break;
                case 'middle': this.newDest = 'higher'; break;
            }
            this.moving = true;
        }
    }

    update(deltaTime){
        if(this.moving){

            this.pos.y -= SPEED * deltaTime;
            this.cachedPos.y -= SPEED * deltaTime;

            if(this.newDest === 'middle'){

                if(this.pos.y < MIDDLE.y * this.scale){

                    this.pos.y = MIDDLE.y * this.scale;
                    this.cachedPos.y = MIDDLE.y;
                    this.dest = this.newDest;
                    this.moving = false;

                }

            } else if (this.newDest === 'higher'){

                if(this.pos.y < HIGHER.y * this.scale){

                    this.pos.y = LOWER.y * this.scale;
                    this.cachedPos.y = LOWER.y;
                    this.dest = 'lower';
                    this.newDest = 'lower';
                    this.moving = false;

                }
            }
        }
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
};