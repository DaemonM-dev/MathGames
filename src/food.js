import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";

export class FoodItem{
    constructor(texture, name, size, pos, scale, cost){
        this.texture = texture;
        this.name = name;

        this.size = {...size};
        this.pos = {...pos};
        this.scale = {...scale};

        this.cachedSize = {...size};
        this.cachedPos = {...pos};

        this.selected = false;
        this.cost = cost;
    }

    update(scale, ctx, deltaTime){

        if(scale.x !== this.scale.x || scale.y !== this.scale.y){this.scale = scale;}
        this.size = { x: this.cachedSize.x * this.scale.x, y: this.cachedSize.y * this.scale.y };
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x * this.scale, this.pos.y * this.scale.y, this.size.x, this.size.y);
    }

    checkForCollision(mousePos){
        if(mousePos.x >= this.pos.x && 
        mousePos.x <= this.pos.x + this.size.x &&
        mousePos.y >= this.pos.y &&
        mousePos.y <= this.pos.y + this.size.y){
           return true;
        }
        return false;
    }

    toggleSelected(){
        this.selected = !this.selected;

        if(this.selected){console.log("Item Selected");}
        else{console.log("Item De-selected");}
    }

    move(mousePos){
        if(this.selected){
            this.pos = {
                x: mousePos.x - (this.size.x / 2.0),
                y: mousePos.y - (this.size.y / 2.0)
            }; 
        }
    }
}