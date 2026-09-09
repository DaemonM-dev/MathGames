import { GAME_SIZE, pointIntersects } from '../../globals.js'
import { Game } from '../../game.js';
import { ButtonState } from '../../enums/button_states.js';
import { Command } from '../../enums/commands.js';

const SIZE = {x: 500, y: 100};
const POS = { x: 1353.5 , y:740};
const CENTER = {x: POS.x + (SIZE.x / 2), y: POS.y + (SIZE.y / 2)};
const RADIUS = 35;
const OUTLINEWIDTH = 8;
const FONTSIZE = 50;
const COLOR = {infill: 'white', outline: 'black' , font: 'black'};
const TEXT_POS = {x: POS.x + 135, y: CENTER.y};
const KURO = {size: {x: 110, y: 85}, pos: {x: POS.x + 10, y: CENTER.y - 45}};

const CURSOR = {size: {x:6, y: 50}, pos: {x: TEXT_POS.x - 15, y: CENTER.y - 25}, visible: false};
const MAX_INPUTS = 5;

export class InputWindow{
    constructor(){
        this.scale = 1.0;
        this.size = {...SIZE};
        this.pos = {...POS};
        this.center = {...CENTER};
        this.textPos = {...TEXT_POS};
        this.radius = RADIUS;
        this.outlineWidth = OUTLINEWIDTH;
        this.fontSize = FONTSIZE;
        this.color = {...COLOR};
        this.kuro = {texture: null, size: {...KURO.size}, pos: {...KURO.pos}};
        this.clickHere = "Type answer here...";
        this.cursor = {...CURSOR};
        this.cursorTimer = 0.0;
        this.awaitingInput = false;
        this.state = ButtonState.NONE;
        this.currentInput = "";
        this.input = "";
        this.inputLength = 0.0;
        
    }

    changeScale(scale){
        this.scale = scale;
        this.size = {x: SIZE.x * this.scale, y: SIZE.y * this.scale};
        this.pos = {x:POS.x * this.scale, y: POS.y * this.scale};
        this.center = {x:CENTER.x * this.scale, y: CENTER.y * this.scale};
        this.textPos = {x: TEXT_POS.x * this.scale, y: TEXT_POS.y * this.scale};
        this.kuro.size = {x: KURO.size.x * this.scale, y: KURO.size.y * this.scale};
        this.kuro.pos = {x: KURO.pos.x * this.scale, y: KURO.pos.y * this.scale};
        this.radius = RADIUS * this.scale;
        this.outlineWidth = OUTLINEWIDTH * this.scale;
        this.fontSize = FONTSIZE * this.scale;
        this.cursor.size = {x: CURSOR.size.x * this.scale, y: CURSOR.size.y * this.scale};
        this.cursor.pos = {x: CURSOR.pos.x * this.scale, y: CURSOR.pos.y * this.scale};
        this.inputLength = Game.ctx.measureText(this.input);
    }

    init(assets){
        this.kuro.texture = assets.getAsset('kuro');
    }

    update(level, command, mousePos, deltaTime){
        if(level === 1 || level === 3 || level === 4){
            this.animateCursor(deltaTime);
            this.handleInputs(command, mousePos);
            if(this.awaitingInput){this.getKeyInputs()};
        }
    }

    animateCursor(deltaTime){
        if(this.awaitingInput){
            this.cursorTimer += 10 * deltaTime;
            if(this.cursorTimer >= 3){
                this.cursorTimer = 0.0;
                this.cursor.visible = !this.cursor.visible;
            }
        }
    }

    handleInputs(command, mousePos){
        switch(this.state){
            case ButtonState.NONE:
                if(pointIntersects(mousePos, this)){
                    if(!this.awaitingInput){
                        this.color = {infill: '#c5c5c597', outline: '#000000' , font: 'black'};
                        this.state = ButtonState.HOVER;
                    }
                } else {
                    if(this.awaitingInput && command === Command.MOUSE_DOWN){this.awaitingInput = false;}
                }
            break;
            case ButtonState.HOVER:
                if(!pointIntersects(mousePos, this)){
                    this.color = {...COLOR};
                    this.state = ButtonState.NONE;
                } else if(command === Command.MOUSE_DOWN || command === Command.MOUSE_UP){
                    if(!this.awaitingInput){
                        this.state = ButtonState.PRESSED;
                        this.cursor.visible = true;
                        this.cursorTimer = 0.0;
                        this.awaitingInput = true;
                    }
                }
            break;
            case ButtonState.PRESSED:
                if(!pointIntersects(mousePos, this)){
                    this.color = {...COLOR};
                    this.state = ButtonState.NONE;
                } else {
                    if(!this.awaitingInput){
                        this.color = {infill: '#c5c5c5', outline: '#00000077' , font: 'black'};
                        this.state = ButtonState.HOVER;
                    } else {
                        this.color = {...COLOR};
                        this.state = ButtonState.NONE;
                    }
                }
            break;
        }
    }

    getKeyInputs(){
        if (this.currentInput) {
            if (this.input.length < MAX_INPUTS) {
                this.input += this.currentInput;
            }
            this.currentInput = "";
            this.inputLength = Game.ctx.measureText(this.input);
        }
    }

    draw(level, ctx){
        if(level === 1 || level === 3 || level === 4){
            ctx.fillStyle = this.color.infill;
            ctx.lineWidth = this.outlineWidth;
            ctx.strokeStyle = this.color.outline;
            ctx.beginPath();
            ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
            ctx.fill();
            ctx.stroke();
            if(this.kuro){ctx.drawImage(this.kuro.texture, this.kuro.pos.x, this.kuro.pos.y, this.kuro.size.x, this.kuro.size.y);}
            ctx.textAlign = 'start';
            ctx.textBaseline = 'middle';
            if(!this.awaitingInput && this.input === ""){
                ctx.font = `${this.fontSize / 1.5}px ${'PoppinsBold'}`;
                ctx.fillStyle = '#00000041';
                ctx.fillText(this.clickHere, this.textPos.x, this.textPos.y + (4 * this.scale), this.size.x);
            } else {
                ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
                ctx.fillStyle = this.color.font;
                ctx.fillText(this.input, this.textPos.x, this.textPos.y + (4 * this.scale), this.size.x);
                if(this.awaitingInput && this.cursor.visible){
                    const textWidth = ctx.measureText(this.input).width + 5 * this.scale;
                    ctx.fillRect(this.textPos.x + textWidth, this.cursor.pos.y, this.cursor.size.x, this.cursor.size.y);
                }
            }
        }
    }

    getInput(){
        return this.input;
    }
}