import { Command } from '../../enums/commands.js'

export class FoodItem{
    constructor(){
        this.name = " ";
        this.value = 0;
        this.texture = null;
        this.size = null;
        this.pos = null;
        this.cachedPos = null;
        this.initial = {size: null, pos: null};
        this.selected = false;
        this.scale = {x:1.0, y:1.0};
        this.type = "";
    }

    setUnique(name, texture, size, type){
        this.name = name;
        this.texture = texture;
        this.size = size;
        this.initial.size = {...size};
        this.type = type;
    }

    init(value, pos){
        this.value = value;
        this.pos = {...pos};
        this.cachedPos = {...pos};
        this.initial.pos = {...pos};
    }

    setPosition(pos){
        this.pos = {...this.pos};
        this.cachedPos = {...this.pos};
        this.initial.pos = {...this.pos};
    }

    resetPosition(){
        this.cachedPos = {...this.initial.pos};
        this.pos = {x: this.cachedPos.x * this.scale.x, y: this.cachedPos.y * this.scale.y};
    }

    setValue(value){
        this.value = value;
    }

    changeScale(scale){
        this.scale = {...scale};
        this.pos.x = this.cachedPos.x * scale.x;
        this.pos.y = this.cachedPos.y * scale.y;
        this.size.x = this.initial.size.x * scale.x;
        this.size.y = this.initial.size.y * scale.y
    }

    intersects(point){
        if(point.x >= this.pos.x &&
           point.x <= this.pos.x + this.size.x && 
           point.y >= this.pos.y &&
           point.y <= this.pos.y + this.size.y){
                return true;
        }
        return false;
    }

    isWithinBounds(boundarySize, boundaryPos){
        const CENTER = {x:this.pos.x + (this.size.x / 2), y: this.pos.y + (this.size.y / 2)};
        if(CENTER.x >= boundaryPos.x  &&
            CENTER.x <= boundaryPos.x + boundarySize.x &&
            CENTER.y >= boundaryPos.y &&
            CENTER.y <= boundaryPos.y + boundarySize.y){
                return true;
        }
        return false;
    }

    select(){
        if(!this.selected){this.selected = true;}
    }

    deselect(){
        if(this.selected){this.selected = false;}
    }

    drag(mousePos){
        this.pos = {x: mousePos.x - (this.size.x / 2), y:mousePos.y - (this.size.y / 2)};
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}