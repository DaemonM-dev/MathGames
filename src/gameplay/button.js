import { Command, ButtonState } from "../constants.js";

export class Button{
    constructor(size, pos, radius, lineWidth){
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
        this.pressed = false;

        this.textVisible = false;
        this.font = 'Arial';
        this.fontSize = 0;
        this.initialFontSize = 0;
        this.fontColor = 'white';
        this.text = " ";

        this.altTextVisible = true;
        this.altFont = 'Arial';
        this.altFontSize = 0;
        this.initialAltFontSize = 0;
        this.altFontColor = 'white';
        this.altText = " ";
    }

    setColors(defIn, defOut, hoverIn, hoverOut, clickIn, clickOut){
        this.color = {inner: defIn, outer: defOut};
        this.defColor = {inner: defIn, outer: defOut};
        this.hoverColor = {inner: hoverIn, outer: hoverOut};
        this.pressColor = {inner: clickIn, outer: clickOut};
    }

    setText(text, font, fontSize, color){
        this.text = text;
        this.font = font;
        this.fontSize = fontSize;
        this.initialFontSize = fontSize;
        this.fontColor = color;
    }

    setAltText(text, font, fontSize, color){
        this.altFont = font;
        this.altFontSize = fontSize;
        this.initialAltFontSize = fontSize;
        this.altFontColor = color;
        this.altText = text;
    }

    toggleVisibleText(){
        if(this.text !== " "){
            this.textVisible = !this.textVisible;
        }
        if(this.altText !== " "){
            this.altTextVisible = !this.altTextVisible;
        }
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x, y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x, y: this.initial.pos.y * scale.y};;
        this.radius = this.initial.radius * minScale;
        this.lineWidth = this.initial.lineWidth * minScale;

        if(this.textVisible){
            this.fontSize = this.initialFontSize * minScale;
        } else {
            this.altFontSize = this.initialAltFontSize * minScale;
        }
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
                    if(command === Command.MOUSE_DOWN){
                        this.color = this.pressColor;
                        this.state = ButtonState.PRESSED;
                    }
                }
            break;
            case ButtonState.PRESSED:
                if(this.intersects(mousePos)){
                    if(command === Command.MOUSE_UP){
                        this.color = this.hoverColor;
                        this.state = ButtonState.HOVER;
                        this.pressed = true;
                    }
                } else {
                    this.color = this.defColor;
                    this.state = ButtonState.NONE;
                }
            break;
        }
    }

    isPressed(){
        const pressed = this.pressed;
        if(this.pressed === true){
            this.pressed = false;
        }
        return pressed;
    }

    draw(ctx){
        ctx.fillStyle = this.color.inner;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outer;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();

        if (this.textVisible && this.text !== " ") {
            ctx.fillStyle = this.fontColor || 'black';
            ctx.font = `${this.fontSize}px ${this.font}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        
            const textX = this.pos.x + this.size.x / 2;
            const textY = this.pos.y + this.size.y / 2;
        
            ctx.fillText(this.text, textX, textY);
        } else if(this.altTextVisible && this.altText !== " "){

            ctx.fillStyle = this.altFontColor || 'black';
            ctx.font = `${this.altFontSize}px ${this.altFont}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        
            const textX = this.pos.x + this.size.x / 2;
            const textY = this.pos.y + this.size.y / 2;
        
            ctx.fillText(this.altText, textX, textY);

        }
    }
}