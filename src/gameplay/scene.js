import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js'
import { GameObject } from './gameobjects.js'

export class Scene{
    constructor(){
        this.purpleRect = null;
        this.background = null;
        this.vertBar = null;
        this.horizBar = null;
        this.boy = null;
        this.girl = null;
    }

    changeScale(scale){
        this.purpleRect.changeScale(scale);
        this.background.changeScale(scale);
        this.vertBar.changeScale(scale);
        this.horizBar.changeScale(scale);
        this.boy.changeScale(scale);
        this.girl.changeScale(scale);
    }

    init(assets){
    // Purple Rectangle
        const BG_SIZE = {x: 1280, y: 720};
        this.purpleRect = new GameObject(null, {x:BG_SIZE.x , y: 360}, {x: 0, y: GAME_HEIGHT - 360});
        this.purpleRect.setColor('purple');

        // Cafe Background
        this.background = new GameObject(assets.getAsset('background'), BG_SIZE, {x: 0, y: 0});

        // Comic strip borders
        const BAR_WIDTH = 14;
        this.vertBar = new GameObject(null, {x: BAR_WIDTH, y: GAME_HEIGHT}, {x: BG_SIZE.x - BAR_WIDTH / 2, y: 0});
        this.vertBar.setColor('black');
        this.horizBar = new GameObject(null, {x: BG_SIZE.x, y: BAR_WIDTH}, {x: 0, y:BG_SIZE.y - BAR_WIDTH / 2});
        this.horizBar.setColor('black');

        // Characters
        const CHAR_SCALE = 0.75;
        const CHAR_SIZE = {x: 450 * CHAR_SCALE, y: 600 * CHAR_SCALE};
        this.boy = new GameObject(assets.getAsset('boy'), CHAR_SIZE, {x: 0, y: GAME_HEIGHT - CHAR_SIZE.y});
        this.girl = new GameObject(assets.getAsset('girl'),CHAR_SIZE, {x: BG_SIZE.x - CHAR_SIZE.x, y:GAME_HEIGHT - CHAR_SIZE.y});
    }

    draw(ctx){

        ctx.fillStyle = '#9bd7b585';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

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