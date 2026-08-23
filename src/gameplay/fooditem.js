import { Command } from '../constants.js'

export class FoodItem{
    constructor(name, value, texture, size, pos){
        this.name = name;
        this.value = value;
        this.texture = texture;
        this.size = size;
        this.pos = pos;
        this.cachedPos = {...pos};
        this.initial = {size: {...size}, pos: {...pos}};
        this.scale = {x:1.0, y: 1.0};
        this.selected = false;
    }

    setPosition(pos){
        this.initialPos = pos;
        this.cachedPos = pos;
        this.pos = {x :pos.x * this.scale.x, y: pos.y * this.scale.y};
    }

    resetPosition(){
        this.cachedPos = {...this.initialPos};
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

        const CENTER = {x:this.pos.x + (this.size.x / 2), y:this.pos.y + (this.size.y / 2)};

        if(CENTER.x >= boundaryPos.x  &&
            CENTER.x <= boundaryPos.x + boundarySize.x &&
            CENTER.y >= boundaryPos.y &&
            CENTER.y <= boundaryPos.y + boundarySize.y){
                return true;
        }
        return false;
    }

    update(command, mousePos){
        switch(command){
            case Command.MOUSE_DOWN:
            if(!this.selected && this.intersects(mousePos)){
                this.selected = true;
            }
            break;
            case Command.MOUSE_UP:
                if(this.selected){
                    this.selected = false;
                    this.cachedPos = {x: this.pos.x / this.scale.x,y:this.pos.y / this.scale.y};
                }
            break;
        }

        if(this.selected){this.pos = {x: mousePos.x - (this.size.x / 2), y:mousePos.y - (this.size.y / 2)};}
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}