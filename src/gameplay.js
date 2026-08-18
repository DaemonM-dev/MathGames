import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";


class StaticObject{
    constructor(texture, size, pos, color){
        this.texture = texture;
        this.size = size;
        this.pos = pos;
        this.color = color;
        this.initialSize = {...size};
        this.initialPos = {...pos};

        this.hoverColor = null;
    }

    pointIntersects(point, obj){
        return (point.x >= obj.pos.x &&
            point.x <= obj.pos.x + obj.size.x &&
            point.y >= obj.pos.y &&
            point.y <= obj.pos.y + obj.size.y)
    }
}

export class Gameplay {
    constructor(){
        this.scale = {x:1.0, y:1.0};

        this.background = null,
        this.vertBar = null,
        this.horizBar = null,
        this.boy = null,
        this.girl = null
    }

    init(assets){
        this.background = new StaticObject(assets.getAsset('background'), {x:1280 , y:720}, {x: 0, y: 0}, 'white');
        this.vertBar = new StaticObject(null, {x: 14, y: GAME_HEIGHT}, {x: this.background.size.x - 7, y: 0}, 'black');
        this.horizBar = new StaticObject(null, {x: this.background.size.x, y: 14}, {x: 0, y:this.background.size.y - 7}, 'black');

        const FACTOR = 0.75;
        this.boy = new StaticObject(assets.getAsset('boy'), {x: 450 * FACTOR, y: 600 * FACTOR}, {x: 0, y: GAME_HEIGHT - 600 * FACTOR}, 'white');
        this.girl = new StaticObject(assets.getAsset('girl'),{x: 450 * FACTOR, y: 600 * FACTOR}, {x: this.background.size.x - 450 * FACTOR, y:GAME_HEIGHT - 600 * FACTOR}, 'white');
    }

    update(scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.scaleStaticObject(this.background, this.scale);
            this.scaleStaticObject(this.vertBar, this.scale);
            this.scaleStaticObject(this.horizBar, this.scale);
            this.scaleStaticObject(this.boy, this.scale);
            this.scaleStaticObject(this.girl, this.scale);
        }
    }

    draw(ctx){
        ctx.drawImage(this.background.texture, this.background.pos.x,
             this.background.pos.y, this.background.size.x, this.background.size.y);

        ctx.fillStyle = this.vertBar.color;
        ctx.fillRect(this.vertBar.pos.x, this.vertBar.pos.y, this.vertBar.size.x, this.vertBar.size.y);
        ctx.fillRect(this.horizBar.pos.x, this.horizBar.pos.y, this.horizBar.size.x, this.horizBar.size.y);

        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);
    }

    scaleStaticObject(obj, scale){
        obj.size.x = obj.initialSize.x * scale.x;
        obj.size.y = obj.initialSize.y * scale.y;
        obj.pos.x = obj.initialPos.x * scale.x;
        obj.pos.y = obj.initialPos.y * scale.y;
    }
}