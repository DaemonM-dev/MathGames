import { GAME_SIZE, pointIntersects } from '../../globals.js'
import { ButtonState } from '../../enums/button_states.js'
import { Command } from '../../enums/commands.js'

export class Button{
    constructor(){
        this.scale = 1.0;
        this.size = null;
        this.pos = null;
        this.center = null;
        this.radius = 0;
        this.lineWidth = 0;
        this.text = "";
        this.fontSize = 0;
        this.state = ButtonState.NONE;
        this.pressed = false;
        this.initial = {size: null, pos: null, center: null, radius: 0, lineWidth: 0, fontSize: 0};
        this.color = {infill:'white', outline: 'white'};
        this.defColor = {infill:'white', outline: 'white'};
        this.hoverColor = {infill:'white', outline: 'white'};
        this.pressColor = {infill:'white', outline: 'white'};
        this.fontColor = 'white';
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x: this.initial.size.x * this.scale, y: this.initial.size.y * this.scale};
        this.pos = {x: this.initial.pos.x * this.scale, y: this.initial.pos.y * this.scale};
        this.center = {x: this.initial.center.x * this.scale, y: this.initial.center.y * this.scale};
        this.radius = this.initial.radius * this.scale;
        this.lineWidth = this.initial.lineWidth * this.scale;
        this.fontSize = this.initial.fontSize * this.scale;
    }

    setShape(size, pos, radius, lineWidth, fontSize, text){
        this.size = {...size};
        this.initial.size = {...size};
        this.pos = {...pos};
        this.initial.pos = {...pos};
        this.center = {x:pos.x + (size.x / 2), y: pos.y + (size.y / 2)};
        this.initial.center = {...this.center};
        this.radius = radius;
        this.initial.radius = radius;
        this.lineWidth = lineWidth;
        this.initial.lineWidth = lineWidth;
        this.fontSize = fontSize;
        this.initial.fontSize = fontSize;
        this.text = text;
    }
    setColors(def, hover, press, font){
        this.color = {...def};
        this.defColor = {...def};
        this.hoverColor = {...hover};
        this.pressColor = {...press};
        this.fontColor = font;
    }

    update(command, mousePos){
        switch(this.state){
            case ButtonState.NONE:
                if(pointIntersects(mousePos, this)){
                    this.color = this.hoverColor;
                    this.state = ButtonState.HOVER;
                }
            break;
            case ButtonState.HOVER:
                if(!pointIntersects(mousePos, this)){
                    this.color = this.defColor;
                    this.state = ButtonState.NONE;
                } else if (command === Command.MOUSE_DOWN){
                    this.color = this.pressColor;
                    this.pressed = true;
                    this.state = ButtonState.PRESSED;
                }
            break;
            case ButtonState.PRESSED:
                if(!pointIntersects(mousePos, this)){
                    this.color = this.defColor;
                    this.state = ButtonState.NONE;
                } else if (command === Command.MOUSE_UP){
                    this.color = this.hoverColor;
                    this.state = ButtonState.HOVER;
                }
            break;
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color.infill;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color.outline;
        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();

        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.center.x, this.center.y + 3 * this.scale);
    }

    isPressed(){
        const PRESSED = this.pressed;
        if(this.pressed){this.pressed = false;}
        return PRESSED;
    }
}