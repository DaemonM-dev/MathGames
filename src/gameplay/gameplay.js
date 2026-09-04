import { Game } from '../game.js'
import { GAME_SIZE, getRandomInt } from "../globals.js"
import { Command } from '../enums/commands.js'
import { InputType } from '../enums/input_types.js'

const LEVEL_LIMIT = 5;
const Q_LIMIT = 5;

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.scale = { x: 1.0, y: 1.0 };

        this.inputType = InputType.KEYBOARD;
        this.inputBuffer = "";
        this.maxDigits = 5;
        this.numericAnswer = 0;

        this.level = 3;
        this.prevLevel = 0;
        this.question = 1;
        this.numFoods = 0;
        this.feedbackIndex = 0;
        this.correctAnswer = 0;

        this.awaitingInput = false;
        this.answerCorrect = false;
        this.viewingMenu = false;
        this.viewingFeedback = false;
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