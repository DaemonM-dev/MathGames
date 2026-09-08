import { GAME_SIZE } from '../../globals.js'
import { Command } from '../../enums/commands.js'

export class FoodItem{
    constructor(){
        this.scale = 1.0;
        this.texture = null;
        this.size = null;
        this.pos = null;
        this.cachedPos = null;
        this.initial = {size: null, pos: null};
        this.value = 0;
        this.name = "";
        this.type = "";
        this.selected = false;
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x:this.initial.size.x * this.scale, y: this.initial.size.y * this.scale};
        this.pos = {x:this.cachedPos.x * this.scale, y: this.cachedPos.y * this.scale};
    }

    setUnique(texture, name, type, size){
        this.texture = texture;
        this.name = name;
        this.type = type;
        this.size = {...size};
        this.initial.size = {...size};
    }

    setDynamic(value, pos){
        this.value = value;
        this.pos = {...pos};
        this.cachedPos = {...pos};
        this.initial.pos = {...pos};
    }

    select(){
        if(!this.selected){this.selected = true;}
    }

    deselect(){
        if(this.selected){this.selected = false;}
    }

    reset(){
        this.cachedPos = {...this.initial.pos};
        this.pos = {x: this.cachedPos.x * this.scale, y: this.cachedPos.y * this.scale};
    }

    drag(mousePos){
        this.pos = {x: mousePos.x - (this.size.x / 2), y:mousePos.y - (this.size.y / 2)};
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}