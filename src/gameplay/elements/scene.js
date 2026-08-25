import { GAME_SIZE, BG_SIZE } from '../../globals.js'

export class Scene{
    constructor(){
        this.bg = null;
        this.purpleBox = null;
        this.blackVertBox = null;
        this.blackHorizBox = null;
        this.boy = null;
        this.girl = null;
    }

    changeScale(scale){
        changeScale(this.bg, scale);
        changeScale(this.purpleBox, scale);
        changeScale(this.blackVertBox, scale);
        changeScale(this.blackHorizBox, scale);
        changeScale(this.boy, scale);
        changeScale(this.girl, scale);
    }

    init(assets){
        this.bg = {
            texture: assets.getAsset('background'),
            size: {x: 1280, y: 720},
            pos: {x: 0, y: 0}, 
            initial: {
                size: {x:1280, y: 720},
                pos:{x: 0,y: 0}
            }
        }

        this.purpleBox = {
            size: {x: this.bg.size.x, y: 360},
            pos: {x: 0, y: GAME_SIZE.y - 360},
            initial: {
                size: {x: this.bg.size.x, y: 360},
                pos:{x: 0, y: GAME_SIZE.y - 360}
            }
        }

        const BAR_WIDTH = 14;
        this.blackVertBox = {
            size: {x: BAR_WIDTH, y: GAME_SIZE.y},
            pos: {x: this.bg.size.x - BAR_WIDTH / 2, y: 0},
            initial: {
                size: {x: BAR_WIDTH, y: GAME_SIZE.y},
                pos: {x: this.bg.size.x - BAR_WIDTH / 2, y: 0}
            }
        }
        this.blackHorizBox = {
            size: {x: this.bg.size.x, y: BAR_WIDTH},
            pos: {x: 0, y: this.bg.size.y - BAR_WIDTH / 2},
            initial: {
                size: {x: this.bg.size.x, y: BAR_WIDTH},
                pos: {x: 0, y: this.bg.size.y - BAR_WIDTH / 2}
            }
        }

        const CHAR_SCALE = 0.75;
        const CHAR_SIZE = {x: 450 * CHAR_SCALE, y: 600 * CHAR_SCALE};
        this.boy = {
            texture: assets.getAsset('boy'),
            size: CHAR_SIZE,
            pos: {x: 0, y: GAME_SIZE.y - CHAR_SIZE.y}, 
            initial: {
                size: CHAR_SIZE,
                pos:{x: 0, y: GAME_SIZE.y - CHAR_SIZE.y}
            }
        }
        this.girl = {
            texture: assets.getAsset('girl'),
            size: CHAR_SIZE,
            pos: {x: this.bg.size.x - CHAR_SIZE.x, y: GAME_SIZE.y - CHAR_SIZE.y}, 
            initial: {
                size: CHAR_SIZE,
                pos: {x: this.bg.size.x - CHAR_SIZE.x, y: GAME_SIZE.y - CHAR_SIZE.y}
            }
        }
    }

    draw(ctx){
        ctx.fillStyle = '#9bd7b585';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.purpleBox.pos.x, this.purpleBox.pos.y, this.purpleBox.size.x, this.purpleBox.size.y);
        ctx.drawImage(this.bg.texture, this.bg.pos.x, this.bg.pos.y, this.bg.size.x, this.bg.size.y);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.blackVertBox.pos.x, this.blackVertBox.pos.y, this.blackVertBox.size.x, this.blackVertBox.size.y);
        ctx.fillRect(this.blackHorizBox.pos.x, this.blackHorizBox.pos.y, this.blackHorizBox.size.x, this.blackHorizBox.size.y);
        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);
    }
}

function changeScale(obj, scale){
    if(obj){
        obj.size = {
            x: obj.initial.size.x * scale.x,
            y: obj.initial.size.y * scale.y
        }
        obj.pos = {
            x: obj.initial.pos.x * scale.x,
            y: obj.initial.pos.y * scale.y
        }
    }
}