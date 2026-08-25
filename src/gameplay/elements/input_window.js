import { ButtonState } from '../../enums/button_states.js'
import { Command } from '../../enums/commands.js'

export class InputWindow{
    constructor(){
        this.size = null;
        this.pos = null;
        this.radius = 0;
        this.lineWidth = 0;

        this.color = {infill:'white', outline: 'white'};
        this.defColor = {infill:'white', outline: 'white'};
        this.hoverColor = {infill:'white', outline: 'white'};
        this.pressColor = {infill:'white', outline: 'white'};

        this.font = 'Arial';
        this.fontSize = 0;
        this.fontColor = 'white';
        this.initial = {size: null, pos: null, radius: 0, lineWidth: 0, fontSize: 0, altFontSize: 0};
        this.centerPoint = null;

        this.altFontSize = 0;
        this.altFontColor = 'white';

        this.text = " ";
        this.altText = " ";
        this.viewingAltText = false;

        this.state = ButtonState.NONE;
        this.pressed = false;

        this.scale = {x:1.0,y:1.0};
        this.minScale = 1.0;
    }

    initShape(size, pos, radius, lineWidth, infillColor, outlineColor){
        this.size = size;
        this.pos = pos;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.color.infill = infillColor;
        this.defColor.infill = infillColor;
        this.color.outline = outlineColor;
        this.defColor.outline = outlineColor;
        this.initial.size = {...size};
        this.initial.pos = {...pos};
        this.initial.radius = radius;
        this.initial.lineWidth = lineWidth;
        this.findCenterPoint();
    }

    initText(font, fontSize, fontColor){
        this.font = font;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.initial.fontSize = fontSize;
    }

    initAltText(fontSize, fontColor){
        this.altFontSize = fontSize;
        this.initial.altFontSize = fontSize;
        this.altFontColor = fontColor;
    }

    setText(text){
        this.text = text;
    }

    setAltText(text){
        this.altText = text;
    }

    setActionColors(hoverInfill, hoverOutline, pressInfill, pressOutline){
        this.hoverColor.infill = hoverInfill;
        this.hoverColor.outline = hoverOutline;
        this.pressColor.infill = pressInfill;
        this.pressColor.outline = pressInfill;
    }

    draw(ctx){
        this.drawShape(ctx);
        this.drawText(ctx);
    }

    drawShape(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }

    drawText(ctx){
        switch(this.viewingAltText){
            case false:
                ctx.font = `${this.fontSize}px ${this.font}`;
                ctx.fillStyle = this.fontColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.text, this.centerPoint.x, this.centerPoint.y);
            break;
            case true:
                ctx.font = `${this.altFontSize}px ${this.font}`;
                ctx.fillStyle = this.altFontColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.altText, this.centerPoint.x, this.centerPoint.y);
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

    findCenterPoint(){
        const centerX = this.pos.x + this.size.x / 2;
        const centerY = this.pos.y + this.size.y / 2;
        this.centerPoint = {x: centerX, y: centerY};
    }

    changeScale(scale){
        this.scale = scale;
        this.minScale = Math.min(scale.x, scale.y);
        this.size = {x: this.initial.size.x * scale.x ,y: this.initial.size.y * scale.y};
        this.pos = {x: this.initial.pos.x * scale.x ,y: this.initial.pos.y * scale.y};

        this.radius = this.initial.radius * this.minScale;
        this.lineWidth = this.initial.lineWidth * this.minScale;
        this.fontSize = this.initial.fontSize * this.minScale;
        this.altFontSize = this.initial.altFontSize * this.minScale;
        this.findCenterPoint();
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

    displayLiveInput(input){
        if(input !== this.altText){
            this.altText = input;
        }
    }

    update(command, mousePos){
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
                        this.viewingAltText = true;
                        this.state = ButtonState.PRESSED;
                        this.pressed = true;
                    }
                }
            break;
            case ButtonState.PRESSED:
                if(command === Command.MOUSE_UP){
                    if(this.intersects(mousePos)){
                        this.color = this.hoverColor;
                        this.state = ButtonState.AWAITING_INPUT;
                    } else {
                        this.color = this.defColor;
                        this.viewingAltText = false;
                        this.state = ButtonState.NONE;
                    }
                }
            break;
            case ButtonState.AWAITING_INPUT:
                if(command === Command.MOUSE_DOWN){
                    if(!this.intersects(mousePos)){
                        this.color = this.defColor;
                        this.viewingAltText = false;
                        this.state = ButtonState.NONE;
                    }
                }
            break;
        }
    }
}