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
        this.scale = scale;
        if(this.bg){
            this.bg.size = {x: this.bg.initial.size.x * this.scale, y: this.bg.initial.size.y * this.scale};
            this.bg.pos = {x: this.bg.initial.pos.x * this.scale, y: this.bg.initial.pos.y * this.scale};
        }
        if(this.purpleBox){
            this.purpleBox.size = {x: this.purpleBox.initial.size.x * this.scale, y: this.purpleBox.initial.size.y * this.scale};
            this.purpleBox.pos = {x: this.purpleBox.initial.pos.x * this.scale, y: this.purpleBox.initial.pos.y * this.scale};
        }
        if(this.greenBox){
            this.greenBox.size = {x: this.greenBox.initial.size.x * this.scale, y: this.greenBox.initial.size.y * this.scale};
            this.greenBox.pos = {x: this.greenBox.initial.pos.x * this.scale, y: this.greenBox.initial.pos.y * this.scale};
        }
        if(this.blackVertBox){
            this.blackVertBox.size = {x: this.blackVertBox.initial.size.x * this.scale, y: this.blackVertBox.initial.size.y * this.scale};
            this.blackVertBox.pos = {x: this.blackVertBox.initial.pos.x * this.scale, y: this.blackVertBox.initial.pos.y * this.scale};
        }
        if(this.blackHorizBox){
            this.blackHorizBox.size = {x: this.blackHorizBox.initial.size.x * this.scale, y: this.blackHorizBox.initial.size.y * this.scale};
            this.blackHorizBox.pos = {x: this.blackHorizBox.initial.pos.x * this.scale, y: this.blackHorizBox.initial.pos.y * this.scale};
        }
        if(this.boy){
            this.boy.size = {x: this.boy.initial.size.x * this.scale, y: this.boy.initial.size.y * this.scale};
            this.boy.pos = {x: this.boy.initial.pos.x * this.scale, y: this.boy.initial.pos.y * this.scale};
        }
        if(this.girl){
            this.girl.size = {x: this.girl.initial.size.x * this.scale, y: this.girl.initial.size.y * this.scale};
            this.girl.pos = {x: this.girl.initial.pos.x * this.scale, y: this.girl.initial.pos.y * this.scale};
        }
        if(this.menu){
            this.menu.size = {x: this.menu.initial.size.x * this.scale, y: this.menu.initial.size.y * this.scale};
            this.menu.pos = {x: this.menu.initial.pos.x * this.scale, y: this.menu.initial.pos.y * this.scale};
        }
    }

    init(assets){
        let SIZE = {x: 1280, y: 720};
        let POS = {x: 0, y: 0};
        this.bg = {
            texture: assets.getAsset('background'),
            size: {...SIZE},
            pos: {...POS}, 
            initial: { size: {...SIZE}, pos: {...POS} }
        }
        SIZE = {x: this.bg.size.x, y: GAME_SIZE.y - this.bg.size.y};
        POS = {x: 0, y: GAME_SIZE.y - (GAME_SIZE.y - this.bg.size.y)}
        this.purpleBox = {
            size: {...SIZE},
            pos: {...POS},
            initial: { size: {...SIZE}, pos: {...POS} },
            color: 'purple'
        }
        SIZE = {x: GAME_SIZE.x - this.bg.size.x, y: GAME_SIZE.y};
        POS = {x: this.bg.size.x, y: 0}
        this.greenBox = {
            size: {...SIZE},
            pos: {...POS},
            initial: { size: {...SIZE}, pos: {...POS} },
            color: '#bfdbcb'
        }
        const WIDTH = 14
        SIZE = {x: WIDTH, y: GAME_SIZE.y};
        POS = {x: this.bg.size.x - WIDTH / 2, y: 0}
        this.blackVertBox = {
            size: {...SIZE},
            pos: {...POS},
            initial: { size: {...SIZE}, pos: {...POS} },
            color: 'black'
        }
        SIZE = {x: this.bg.size.x, y: WIDTH};
        POS = {x: 0, y: this.bg.size.y - WIDTH / 2}
        this.blackHorizBox = {
            size: {...SIZE},
            pos: {...POS},
            initial: { size: {...SIZE}, pos: {...POS} },
            color: 'black'
        }
        const SCALE = 0.70;
        const CHAR_SIZE = {x: 475 * SCALE, y: 600 * SCALE};
        POS = {x: 0, y: GAME_SIZE.y - CHAR_SIZE.y};
        this.boy = {
            texture: assets.getAsset('boy'),
            size: {...CHAR_SIZE},
            pos: {...POS}, 
            initial: { size: {...CHAR_SIZE}, pos: {...POS} }
        }
        POS = {x: this.bg.size.x - CHAR_SIZE.x, y: GAME_SIZE.y - CHAR_SIZE.y};
        this.girl = {
            texture: assets.getAsset('girl'),
            size: {...CHAR_SIZE},
            pos: {...POS}, 
            initial: { size: {...CHAR_SIZE}, pos: {...POS} }
        }
        SIZE = {x: 1050, y: 1050};
        POS = {x: (GAME_SIZE.x / 2) - (SIZE.x / 2), y: 0};
        this.menu = {
            texture: assets.getAsset('menuboard'),
            size: {...SIZE},
            pos: {...POS}, 
            initial: { size: {...SIZE}, pos: {...POS} }
        }
    }

    update(deltaTime){

    }

    draw(ctx){
        ctx.drawImage(this.bg.texture, this.bg.pos.x, this.bg.pos.y, this.bg.size.x, this.bg.size.y);
        ctx.fillStyle = this.purpleBox.color;
        ctx.fillRect(this.purpleBox.pos.x, this.purpleBox.pos.y, this.purpleBox.size.x, this.purpleBox.size.y);
        ctx.fillStyle = this.greenBox.color;
        ctx.fillRect(this.greenBox.pos.x, this.greenBox.pos.y, this.greenBox.size.x, this.greenBox.size.y);
        ctx.fillStyle = this.blackVertBox.color;
        ctx.fillRect(this.blackVertBox.pos.x, this.blackVertBox.pos.y, this.blackVertBox.size.x, this.blackVertBox.size.y);
        ctx.fillStyle = this.blackHorizBox.color;
        ctx.fillRect(this.blackHorizBox.pos.x, this.blackHorizBox.pos.y, this.blackHorizBox.size.x, this.blackHorizBox.size.y);
        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);
    }

    drawMenu(ctx){
        ctx.drawImage(this.menu.texture, this.menu.pos.x, this.menu.pos.y, this.menu.size.x, this.menu.size.y);
    }
}