import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";

export class FoodItem{
    constructor(texture, size, pos, cost){
        this.texture = texture;
        this.size = {...size};
        this.pos = {...pos};
        this.cost = {...cost};
        this.selected = false;

        this.cachedSize = {...size};
        this.cachedPos = {...pos};
    }

    updateScale(scale){
        this.size = {
            x: this.cachedSize.x * scale.x,
            y: this.cachedSize.y * scale.y
        };
        this.pos = {
            x: this.cachedPos.x * scale.x,
            y: this.cachedPos.y * scale.y
        };
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    select(mousePos){
        if(mousePos.x >= this.pos.x &&
           mousePos.x <= this.pos.x + this.size.x && 
           mousePos.y >= this.pos.y &&
           mousePos.y <= this.pos.y + this.size.y){
            this.selected = true;
            return true;
           }
           return false;
    }

    deselect(){
        this.selected = false;
    }

    move(mousePos){
        if(this.selected){
            this.pos = {x:mousePos.x - (this.size.x / 2), y: mousePos.y - (this.size.y / 2)};
        }
    }

    getSelected(){
        return this.selected;
    }
}