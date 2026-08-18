import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";
import { GameObject } from "./gameobjects.js";

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.scale = { x: 1.0, y: 1.0 };

        this.purpleRect = null,
        this.background = null,
        this.vertBar = null,
        this.horizBar = null,
        this.boy = null,
        this.girl = null,

        this.DZoutside = null,
        this.DZinside = null,
        this.DZbounds = null,

        this.submitButton = null
    }

    init(assets){
        const BG_SIZE = {x: 1280, y: 720};
        this.purpleRect = new GameObject(null, {x:BG_SIZE.x , y: 360}, {x: 0, y: GAME_HEIGHT - 360});
        this.background = new GameObject(assets.getAsset('background'), BG_SIZE, {x: 0, y: 0});

        const BAR_WIDTH = 14;
        this.vertBar = new GameObject(null, {x: BAR_WIDTH, y: GAME_HEIGHT}, {x: BG_SIZE.x - BAR_WIDTH / 2, y: 0});
        this.horizBar = new GameObject(null, {x: BG_SIZE.x, y: BAR_WIDTH}, {x: 0, y:BG_SIZE.y - BAR_WIDTH / 2});

        const CHAR_SCALE = 0.75;
        const CHAR_SIZE = {x: 450 * CHAR_SCALE, y: 600 * CHAR_SCALE};
        this.boy = new GameObject(assets.getAsset('boy'), CHAR_SIZE, {x: 0, y: GAME_HEIGHT - CHAR_SIZE.y});
        this.girl = new GameObject(assets.getAsset('girl'),CHAR_SIZE, {x: BG_SIZE.x - CHAR_SIZE.x, y:GAME_HEIGHT - CHAR_SIZE.y});
    
        const DZ_OUT_SIZE = { x: 500 , y: 500 };
        const DZ_OUT_POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - DZ_OUT_SIZE.x) / 2,
            y: BG_SIZE.y - DZ_OUT_SIZE.y
        };
        this.DZoutside = new GameObject(null, DZ_OUT_SIZE, DZ_OUT_POS);
        
        const DZ_IN_SIZE = { x: 470, y: 470 };
        const DZ_IN_POS = {
            x: DZ_OUT_POS.x + ((DZ_OUT_SIZE.x - DZ_IN_SIZE.x) / 2),
            y: DZ_OUT_POS.y + ((DZ_OUT_SIZE.y - DZ_IN_SIZE.y) / 2)
        };
        this.DZinside = new GameObject(null, DZ_IN_SIZE, DZ_IN_POS);
        this.DZbounds = {...this.DZoutside};

        const SUBMIT_SIZE = {x: 200, y:100 };
        const SUBMIT_POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - SUBMIT_SIZE.x) / 2,
            y: DZ_OUT_POS.y + DZ_OUT_SIZE.y + 50
        };
        this.submitButton = new GameObject(null, SUBMIT_SIZE, SUBMIT_POS);

        this.purpleRect.setColor('purple');
        this.vertBar.setColor('black');
        this.horizBar.setColor('black');
        this.DZoutside.setColor('black');
        this.submitButton.setColor('green');
    }

    update(mousePos, scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.purpleRect.changeScale(this.scale);
            this.background.changeScale(this.scale);
            this.vertBar.changeScale(this.scale);
            this.horizBar.changeScale(this.scale);
            this.boy.changeScale(this.scale);
            this.girl.changeScale(this.scale);
            this.DZoutside.changeScale(this.scale);
            this.DZinside.changeScale(this.scale);
            this.submitButton.changeScale(this.scale);
        }

        if(mousePos.x !== this.mousePos.x || mousePos.y !== this.mousePos.y){
            this.mousePos = mousePos;

            if(this.submitButton.intersects(this.mousePos)){
                this.submitButton.setColor('blue');
            } else {
               this.submitButton.setColor('green');
            }
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
        ctx.fillRect(this.DZoutside.pos.x, this.DZoutside.pos.y, this.DZoutside.size.x, this.DZoutside.size.y);

        ctx.fillStyle = this.DZinside.color;
        ctx.fillRect(this.DZinside.pos.x, this.DZinside.pos.y, this.DZinside.size.x, this.DZinside.size.y);

        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);

        ctx.fillStyle = this.submitButton.color;
        ctx.fillRect(this.submitButton.pos.x, this.submitButton.pos.y, this.submitButton.size.x, this.submitButton.size.y);
    }
}