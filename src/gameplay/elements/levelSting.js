import { GAME_SIZE } from '../../globals.js'

const SIZE = { x:1920, y: 1080 };

const LOWER =   { x: 0, y: GAME_SIZE.y - 200 };
const MIDDLE =  { x: 0, y: 0 };
const HIGHER =  { x: 0, y: -SIZE.y + 100 };

const SPEED = 1800;

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

        this.alpha = 0.0;
        this.targetAlpha = 0.5;
        this.fadeSpeed = 1.0;
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
                case 'lower':   this.newDest = 'middle'; this.targetAlpha = 0.5; break;
                case 'middle':  this.newDest = 'higher'; this.targetAlpha = 0.0; break;
            }
            this.moving = true;
        }
    }

    update(deltaTime){

        if(this.moving){

            this.pos.y -= SPEED * deltaTime;
            this.cachedPos.y -= SPEED * deltaTime;

            if(this.newDest === 'middle'){

                if(this.alpha < this.targetAlpha){
                    this.alpha += this.fadeSpeed * deltaTime;
                } else {
                    this.alpha = this.targetAlpha
                }

                if(this.pos.y < MIDDLE.y * this.scale){

                    this.pos.y = MIDDLE.y * this.scale;
                    this.cachedPos.y = MIDDLE.y;
                    this.dest = this.newDest;
                    this.moving = false;

                }

            } else if (this.newDest === 'higher'){

                if(this.alpha > this.targetAlpha){
                    this.alpha -= this.fadeSpeed * deltaTime;
                } else {
                    this.alpha = this.targetAlpha
                }


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
        ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
};