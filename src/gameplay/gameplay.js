import { Game } from '../game.js'
import { GAME_SIZE, getRandomInt } from "../globals.js"
import { Command } from '../enums/commands.js'
import { InputType } from '../enums/input_types.js'
import { Scene } from '../gameplay/elements/scene.js'

const LEVEL_LIMIT = 5;
const Q_LIMIT = 5;

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.inputType = InputType.KEYBOARD;
        this.inputBuffer = "";
        this.maxDigits = 5;
        this.numericAnswer = 0;
        this.level = 3;
        this.prevLevel = 0;
        this.question = 1;

        this.scene = new Scene();
    }
    changeScale(scale){
        if(this.scene){this.scene.changeScale(scale);}
    }

    init(assets){
        this.scene.init(assets);
        console.log("Initializing gameplay");
    }

    update(deltaTime){
        this.scene.update(deltaTime);
    }

    draw(ctx){
        this.scene.draw(ctx);
    }
}

function clearInputBuffer(object){
    if(object.inputBuffer !== ""){object.inputBuffer = "";}
}
export function getKeyboardInput(object, key){
    if(object.inputType === InputType.KEYBOARD && object.awaitingInput){
        if(object.inputBuffer.length < object.maxDigits){
                object.inputBuffer += key;
    
        }
    }
}
export function removeKeyboardInput(object){
    if(object.inputType === InputType.KEYBOARD && object.awaitingInput){
        if(object.inputBuffer.length > 0){
            object.inputBuffer = object.inputBuffer.slice(0, -1);
        }
    }
}
export function pressButton(object, button){
    if(object.inputType === InputType.KEYBOARD && object.awaitingInput){
        if(!button.pressed){button.pressed = true;}
    }
}