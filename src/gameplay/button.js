import { ButtonState } from "../constants.js";

export class Button{
    constructor(size, pos, radius, lineWidth, color, lineColor){
        this.size = size;
        this.pos = pos;
        this.radius = radius;
        this.lineWidth = lineWidth;

        this.color = {inner: color, outer: color};
        this.defColor = {inner: color, outer: lineColor};
        this.hoverColor = {inner: color, outer: lineColor};
        this.clickColor = {inner: color, outer: lineColor};

        this.initial = {size: {...size}, pos: {...pos}, radius: radius, lineWidth: lineWidth};
        this.state = ButtonState.NONE;
    }

    setColors(defIn, defOut, hoverIn, hoverOut, clickIn, clickOut){
        this.color = {inner: defIn, outer: defOut};
        this.defColor = {inner: defIn, outer: defOut};
        this.hoverColor = {inner: hoverIn, outer: hoverOut};
        this.clickColor = {inner: clickIn, outer: clickOut};
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x, y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x, y: this.initial.pos.y * scale.y};;
        this.radius = this.initial.radius * minScale;
        this.lineWidth = this.initial.lineWidth * minScale;
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

    update(mousePos){
        switch(this.state){
            case ButtonState.NONE:
                if(this.intersects(mousePos)){
                    this.state = ButtonState.HOVER;
                    this.color = this.hoverColor;
                }
            break;
            case ButtonState.HOVER:
                if(!this.intersects(mousePos)){
                    this.state = ButtonState.NONE;
                    this.color = this.defColor;
                }
            break;
            case ButtonState.CLICKED:
            break;
        }
    }
}