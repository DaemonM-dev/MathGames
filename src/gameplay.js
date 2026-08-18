import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";
import { GameObject } from "./gameobjects.js";

export class Gameplay {
    constructor(){
        this.scale = {x:1.0, y:1.0};

        this.purpleRect = null,
        this.background = null,
        this.vertBar = null,
        this.horizBar = null,
        this.boy = null,
        this.girl = null
    }

    init(assets){
        const bgSize = {x: 1280, y: 720};
        this.purpleRect = new GameObject(null, {x:bgSize.x , y: 360}, {x: 0, y: GAME_HEIGHT - 360});
        this.background = new GameObject(assets.getAsset('background'), bgSize, {x: 0, y: 0});

        const BAR_WIDTH = 14;
        this.vertBar = new GameObject(null, {x: BAR_WIDTH, y: GAME_HEIGHT}, {x: bgSize.x - BAR_WIDTH / 2, y: 0});
        this.horizBar = new GameObject(null, {x: bgSize.x, y: BAR_WIDTH}, {x: 0, y:bgSize.y - BAR_WIDTH / 2});

        const CHAR_SCALE = 0.75;
        const CHAR_SIZE = {x: 450 * CHAR_SCALE, y: 600 * CHAR_SCALE};
        this.boy = new GameObject(assets.getAsset('boy'), CHAR_SIZE, {x: 0, y: GAME_HEIGHT - CHAR_SIZE.y});
        this.girl = new GameObject(assets.getAsset('girl'),CHAR_SIZE, {x: bgSize.x - CHAR_SIZE.x, y:GAME_HEIGHT - CHAR_SIZE.y});
    
        this.purpleRect.setColors('purple','purple','purple');
        this.vertBar.setColors('black', 'black', 'black');
        this.horizBar.setColors('black', 'black', 'black');
    }

    update(scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.purpleRect.changeScale(this.scale);
            this.background.changeScale(this.scale);
            this.vertBar.changeScale(this.scale);
            this.horizBar.changeScale(this.scale);
            this.boy.changeScale(this.scale);
            this.girl.changeScale(this.scale);
        }
    }

    draw(ctx){

        ctx.fillStyle = this.purpleRect.color;
        ctx.fillRect(this.purpleRect.pos.x, this.purpleRect.pos.y, this.purpleRect.size.x, this.purpleRect.size.y);

        ctx.drawImage(this.background.texture, this.background.pos.x,
             this.background.pos.y, this.background.size.x, this.background.size.y);

        ctx.fillStyle = this.vertBar.color;
        ctx.fillRect(this.vertBar.pos.x, this.vertBar.pos.y, this.vertBar.size.x, this.vertBar.size.y);
        ctx.fillRect(this.horizBar.pos.x, this.horizBar.pos.y, this.horizBar.size.x, this.horizBar.size.y);

        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);
    }
}