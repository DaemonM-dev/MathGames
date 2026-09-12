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

        this.posFeedback1 = null;
        this.posFeedback2 = null;
        this.posFeedback3 = null;
        this.negFeedback = null;
        this.feedbackIndex = 0;
        this.posFeedback = [];

        this.coupon = null;
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
        if(this.negFeedback){
            this.negFeedback.size = {x: this.negFeedback.initial.size.x * this.scale, y: this.negFeedback.initial.size.y * this.scale};
            this.negFeedback.pos = {x: this.negFeedback.initial.pos.x * this.scale, y: this.negFeedback.initial.pos.y * this.scale};
        }
        for(let i = 0; i < this.posFeedback.length; i++){
            this.posFeedback[i].size =
            this.posFeedback[i].size = {x: this.posFeedback[i].initial.size.x * this.scale, y: this.posFeedback[i].initial.size.y * this.scale};
            this.posFeedback[i].pos = {x: this.posFeedback[i].initial.pos.x * this.scale, y: this.posFeedback[i].initial.pos.y * this.scale};
        }
        if(this.coupon){
            this.coupon.size = {x: this.coupon.initial.size.x * this.scale, y: this.coupon.initial.size.y * this.scale};
            this.coupon.pos = {x: this.coupon.initial.pos.x * this.scale, y: this.coupon.initial.pos.y * this.scale};
            this.coupon.center = {x: this.coupon.initial.center.x * this.scale, y: this.coupon.initial.center.y * this.scale};
            this.coupon.fontSize = this.coupon.initial.fontSize * this.scale;
            this.coupon.linespace = this.coupon.initial.linespace * this.scale;
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


        SIZE = { x:460 / 1.5, y: 250 / 1.5 }
        POS = { x:0.0, y: 0.0 }
        const CENTER = {x:POS.x + (SIZE.x / 2), y: POS.y + (SIZE.y / 2)};
        const FONTSIZE = 30;
        const LINESPACE = 20;
        this.coupon = {
            texture: assets.getAsset('coupon'),
            size: SIZE,
            pos: POS,
            center: CENTER,
            fontSize: FONTSIZE,
            linespace: LINESPACE,
            initial:{size: {...SIZE}, pos: {...POS}, center: {...CENTER}, fontSize: FONTSIZE, linespace: LINESPACE},
            discount: 0,
            line1: "",
            line2: "",
            moving: false,
        }
        this.initFeedback(assets);
    }

    initFeedback(assets){
        const SIZE = {x: 500, y: 250};
        const POS = {x: 1350, y: 300};
        this.posFeedback.push({
            texture: assets.getAsset('goodjob1'),
            size: {...SIZE},
            pos: {...POS}, 
            initial: { size: {...SIZE}, pos: {...POS} }
        });
        this.posFeedback.push({
            texture: assets.getAsset('goodjob2'),
            size: {...SIZE},
            pos: {...POS}, 
            initial: { size: {...SIZE}, pos: {...POS} }
        });
        this.posFeedback.push({
            texture: assets.getAsset('goodjob3'),
            size: {...SIZE},
            pos: {...POS}, 
            initial: { size: {...SIZE}, pos: {...POS} }
        });
        this.negFeedback = {
            texture: assets.getAsset('tryagain1'),
            size: {...SIZE},
            pos: {...POS}, 
            initial: { size: {...SIZE}, pos: {...POS} }
        }
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

    drawFeedback(positive, ctx){
        if(positive){
            ctx.drawImage(this.posFeedback[this.feedbackIndex].texture,
                 this.posFeedback[this.feedbackIndex].pos.x,
                  this.posFeedback[this.feedbackIndex].pos.y,
                   this.posFeedback[this.feedbackIndex].size.x,
                    this.posFeedback[this.feedbackIndex].size.y);
        } else {
            ctx.drawImage(this.negFeedback.texture,
                 this.negFeedback.pos.x,
                  this.negFeedback.pos.y,
                   this.negFeedback.size.x,
                    this.negFeedback.size.y);
        }
    }

    randomisePosFeedback(){
        this.feedbackIndex = getRandomInt(0, 2);
    }

    setRandomDiscount(){
        this.coupon.line1 = "";
        this.coupon.line2 = "";

        switch(getRandomInt(1,3)){
            case 1: this.coupon.discount = 0.25; this.coupon.line1 = "25%"; break;
            case 2: this.coupon.discount = 0.50; this.coupon.line1 = "50%"; break;
            case 3: this.coupon.discount = 0.75; this.coupon.line1 = "75%"; break;
        }

        switch(getRandomInt(1,3)){
            case 1: this.coupon.line2 = "Healthy Items"; break;
            case 2: this.coupon.line2 = "Sweet Items"; break;
            case 3: this.coupon.line2 = "All Items"; break;
        }

        this.coupon.initial.pos.x = -this.coupon.size.x;
        this.coupon.pos.x = -this.coupon.size.x;
        this.coupon.center = {x: this.coupon.pos.x + (this.coupon.size.x / 2), y:this.coupon.pos.y + (this.coupon.size.y / 2)};

        if(!this.coupon.moving){
            this.coupon.moving = true;
        }
    }

    animateCoupon(deltaTime){
        if(this.coupon.moving){
            const SPEED = 325 * deltaTime;
            this.coupon.initial.pos.x +=  SPEED * 1.75;
            this.coupon.pos.x += SPEED * 1.75;
            this.coupon.center.x += SPEED * 1.75;
            if(this.coupon.pos.x >= 0.0){
                this.coupon.initial.pos.x = 0.0;
                this.coupon.pos.x = 0.0; 
                this.coupon.moving = false;
            }
        }
    }

    drawCoupon(ctx){
        ctx.drawImage(this.coupon.texture, this.coupon.pos.x, this.coupon.pos.y, this.coupon.size.x, this.coupon.size.y);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${this.coupon.fontSize}px ${'PoppinsBold'}`;
        ctx.fillText(this.coupon.line1 + " OFF", this.coupon.center.x, this.coupon.center.y - this.coupon.linespace);
        ctx.fillText(this.coupon.line2, this.coupon.center.x, this.coupon.center.y + this.coupon.linespace);
    }
}