import { GAME_SIZE, BG_SIZE, getRandomInt } from '../../globals.js'

export class Scene{
    constructor(){
        this.scale = {x:1.0, y:1.0};
        this.bg = null;
        this.purpleBox = null;
        this.blackVertBox = null;
        this.blackHorizBox = null;
        this.boy = null;
        this.girl = null;
        this.kuro = null;
        this.menu = null;
        this.coupon = null;

        this.posFeedback = [];
        this.negFeedback = null;
    }

    changeScale(scale){
        this.scale = scale;
        changeScale(this.bg, scale);
        changeScale(this.purpleBox, scale);
        changeScale(this.blackVertBox, scale);
        changeScale(this.blackHorizBox, scale);
        changeScale(this.boy, scale);
        changeScale(this.girl, scale);
        changeScale(this.kuro, scale);
        changeScale(this.menu, scale);
        changeScale(this.negFeedback,scale);
        for(let i = 0; i < this.posFeedback.length; i++){
            changeScale(this.posFeedback[i], scale);
        }
        this.scaleCoupon(scale);
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
        this.kuro = {
            texture: assets.getAsset('kuro'),
            size: {x: 100, y: 66},
            pos: {x: 1360, y: 750}, 
            initial: {
                size: {x:100, y: 66},
                pos:{x: 1360,y: 750}
            }
        }
        this.menu = {
            texture: assets.getAsset('menuboard'),
            size: {x: 1050, y: 1050},
            pos: {
                x:(GAME_SIZE.x / 2) - 525, 
                y:(GAME_SIZE.y / 2) - 525
            }, 
            initial: {
                size:{x: 1050,y: 1050}, 
                pos: {
                    x:(GAME_SIZE.x / 2) - 525, 
                    y:(GAME_SIZE.y / 2) - 525
                }
            }
        }

        this.coupon = {
            texture: assets.getAsset('coupon'),
            size: { x:461, y:250 },
            pos: { x:0.0, y: 0.0 },
            fontSize: 0,
            lineSpace: 0,
            center: {x: 461 / 2, y: 250 / 2 },
            discount: 0,
            line1: "",
            line2: "",
            initial:{size: {x:461, y:250}, pos: {x:0.0,y:0.0}, fontSize: 0, lineSpace: 0},
            moving: false,
            direction: 'down'
        }

        this.initCoupon( {x: 460 / 1.5, y: 250 / 1.5}, {x: 0.0, y: 0.0 }, 30, 20);
        this.initFeedback(assets);
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

        this.drawCoupon(ctx);
    }
    drawKuro(ctx){
        ctx.drawImage(this.kuro.texture, this.kuro.pos.x, this.kuro.pos.y, this.kuro.size.x, this.kuro.size.y);
    }
    drawMenu(ctx){
        ctx.fillStyle = '#000000c7';
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.menu.texture, this.menu.pos.x, this.menu.pos.y, this.menu.size.x, this.menu.size.y);
    }
    drawFeedback(ctx, type, index){
        switch(type){
            case "pos":
                ctx.drawImage(this.posFeedback[index].texture,
                     this.posFeedback[index].pos.x, this.posFeedback[index].pos.y,
                     this.posFeedback[index].size.x, this.posFeedback[index].size.y);
            break;
            case "neg":
                ctx.drawImage(this.negFeedback.texture,
                     this.negFeedback.pos.x, this.negFeedback.pos.y,
                     this.negFeedback.size.x, this.negFeedback.size.y);
            break;
        }
    }
    initFeedback(assets){
        const CENTER = {x: GAME_SIZE.x - 571, y: GAME_SIZE.y / 2 - 225};
        this.negFeedback = {
            texture: assets.getAsset('tryagain1'),
            size: {x: 500, y: 250},
            pos: CENTER, 
            initial: { size: {x:500, y: 250}, pos:CENTER }
        }
        this.posFeedback.push(
            {texture: assets.getAsset('goodjob1'),
            size: {x: 500, y: 250},
            pos: CENTER, 
            initial: { size: {x:500, y: 250}, pos:CENTER }},
        
            {texture: assets.getAsset('goodjob2'),
            size: {x: 500, y: 250},
            pos: CENTER, 
            initial: { size: {x:500, y: 250}, pos:CENTER }},
        
            {texture: assets.getAsset('goodjob2'),
            size: {x: 500, y: 250},
            pos: CENTER, 
            initial: { size: {x:500, y: 250}, pos:CENTER }},
        )
    }
    initCoupon(size, pos, fontSize, lineSpace){
        this.coupon.size = {...size};
        this.coupon.pos = {...pos};
        this.coupon.fontSize = fontSize;
        this.coupon.lineSpace = lineSpace;
        this.coupon.initial.size = {...size};
        this.coupon.initial.pos = {...pos};
        this.coupon.initial.fontSize = fontSize;
        this.coupon.initial.lineSpace = lineSpace;
        this.coupon.center = {x: pos.x + (size.x / 2), y: pos.x + size.y / 2 }
    }
    setRandomDiscount(){
        this.coupon.line1 = "";
        this.coupon.line2 = "";
        let num = getRandomInt(1,3);
        switch(num){
            case 1: this.coupon.discount = 0.25; this.coupon.line1 = "25% OFF"; break;
            case 2: this.coupon.discount = 0.50; this.coupon.line1 = "50% OFF"; break;
            case 3: this.coupon.discount = 0.75; this.coupon.line1 = "75% OFF"; break;
        }
        num = getRandomInt(1,2);
        switch(num){
            case 1: this.coupon.line2 = "Healthy Items"; break;
            case 2: this.coupon.line2 = "Sweet Treats"; break;
        }

        num = getRandomInt(1,2);
        if(num === 1){this.coupon.direction = 'right'}
        else {this.coupon.direction = 'down'};

        switch(this.coupon.direction){
            case 'down': 
                this.coupon.direction = 'right';
                this.coupon.initial.pos.x = -this.coupon.size.x;
                this.coupon.pos.x = -this.coupon.size.x;
                this.coupon.center.x = this.coupon.pos.x + (this.coupon.size.x / 2);
            break;
            case 'right': 
                this.coupon.direction = 'down';
                this.coupon.initial.pos.y = -this.coupon.size.y;
                this.coupon.pos.y = -this.coupon.size.y;
                this.coupon.center.y = this.coupon.pos.y + (this.coupon.size.y / 2);
            break;
        }
        if(!this.coupon.moving){
            this.coupon.moving = true;
        }
    }
    drawCoupon(ctx){
        ctx.drawImage(this.coupon.texture, this.coupon.pos.x, this.coupon.pos.y, this.coupon.size.x, this.coupon.size.y);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${this.coupon.fontSize}px ${'PoppinsBold'}`;
        ctx.fillText(this.coupon.line1, this.coupon.center.x, this.coupon.center.y - this.coupon.lineSpace);
        ctx.fillText(this.coupon.line2, this.coupon.center.x, this.coupon.center.y + this.coupon.lineSpace);
    }
    scaleCoupon(scale){
        const MINSCALE = Math.min(scale.x, scale.y);
        this.coupon.size = {x: this.coupon.initial.size.x * scale.x, y: this.coupon.initial.size.y * scale.y };
        this.coupon.pos = {x: this.coupon.initial.pos.x * scale.x, y: this.coupon.initial.pos.y * scale.y };
        this.coupon.fontSize = this.coupon.initial.fontSize * MINSCALE;
        this.coupon.lineWidth = this.coupon.initial.lineWidth * MINSCALE;
        this.coupon.lineSpace = this.coupon.initial.lineSpace * MINSCALE;
        this.coupon.center = {x: this.coupon.pos.x + (this.coupon.size.x / 2),y: this.coupon.pos.y + (this.coupon.size.y / 2)};
    }
    animateCoupon(deltaTime){
        if(this.coupon.moving){
            const SPEED = 325 * deltaTime;
            switch(this.coupon.direction){
                case 'right':
                    this.coupon.initial.pos.x +=  SPEED;
                    this.coupon.pos.x += SPEED;
                    this.coupon.center.x += SPEED;
                    if(this.coupon.pos.x >= 0.0){this.coupon.moving = false;}
                break;
                case 'down':
                    this.coupon.initial.pos.y += SPEED;
                    this.coupon.pos.y += SPEED;
                    this.coupon.center.y += SPEED;
                    if(this.coupon.pos.y >= 0.0){this.coupon.moving = false;}
                break;
            }
        }
    }
    update(level, deltaTime){
        if(level === 5){
            this.animateCoupon(deltaTime);
        }
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