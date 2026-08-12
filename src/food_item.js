import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";

export class FoodItem{
    constructor(texture, size, pos, cost){
        this.texture = texture;
        this.size = {...size};
        this.pos = {...pos};
        this.cost = {...cost};
        this.selected = false;
    }

    draw(scale, ctx){
        ctx.drawImage(this.texture, this.pos.x * scale.x, this.pos.y * scale.y, this.size.x * scale.x, this.size.y * scale.y);
    }
}