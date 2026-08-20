import { Commands, ButtonState } from "../constants.js";

export class Button{
    constructor(size, pos, radius, lineWidth, ){
        this.size = size;
        this.pos = pos;
        this.radius = radius;
        this.lineWidth = lineWidth;

        this.color = {inner: 'white', outer: 'white'};
        this.defColor = {inner: 'white', outer: 'white'};
        this.hoverColor = {inner: 'white', outer: 'white'};
        this.pressColor = {inner: 'white', outer: 'white'};

        this.initial = {size: {...size}, pos: {...pos}, radius: radius, lineWidth: lineWidth};
        this.state = ButtonState.NONE;
    }

    setColors(defIn, defOut, hoverIn, hoverOut, clickIn, clickOut){
        this.color = {inner: defIn, outer: defOut};
        this.defColor = {inner: defIn, outer: defOut};
        this.hoverColor = {inner: hoverIn, outer: hoverOut};
        this.pressColor = {inner: clickIn, outer: clickOut};
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

    update(mousePos, command){
        switch(this.state){
            case ButtonState.NONE:
                if(this.intersects(mousePos)){
                    this.color = this.hoverColor;
                    this.state = ButtonState.HOVER;
                }
            break;
            case ButtonState.HOVER:
                if(!this.intersects(mousePos)){
                    this.color = this.defColor;
                    this.state = ButtonState.NONE;
                } else {
                    if(command === Commands.MOUSE_DOWN){
                        this.color = this.pressColor;
                        this.state = ButtonState.PRESSED;
                    }
                }
            break;
            case ButtonState.PRESSED:
                if(this.intersects(mousePos)){
                    if(command === Commands.MOUSE_UP){
                        this.color = this.hoverColor;
                        this.state = ButtonState.HOVER;
                    }
                } else {
                    this.color = this.defColor;
                    this.state = ButtonState.NONE;
                }
            break;
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color.inner;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outer;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }
}