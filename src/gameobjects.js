import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";

export class GameObject{
    constructor(texture, size, pos){
        this.texture = texture;
        this.size = size;
        this.pos = pos;
        this.initialSize = {...size};
        this.initialPos = {...pos};
        this.cachedPos = {...pos};

        this.color = 'white';

        this.selected = false;
        this.hovering = false;
    }

    changeScale(scale){
        this.size.x = this.initialSize.x * scale.x;
        this.size.y = this.initialSize.y * scale.y;
        this.pos.x = this.initialPos.x * scale.x;
        this.pos.y = this.initialPos.y * scale.y;
    }

    setColor(color){
        this.color = color;
    }

    intersects(point){
        return (point.x >= this.pos.x &&
            point.x <= this.pos.x + this.size.x &&
            point.y >= this.pos.y &&
            point.y <= this.pos.y + this.size.y)
    }

    select(){
        if(!this.selected){
            this.selected = true;
        }
    }
    deselect(){
        if(this.selected){
            this.selected = false;
            this.cachedPos = { x: this.pos.x / this.scale.x, y: this.pos.y / this.scale.y};
        }
    }
    isSelected(){
        return this.selected;
    }

    move(point){
        this.pos = {x: point.x - (this.size.x / 2), y: point.y - (this.size.y / 2)};
    }
}