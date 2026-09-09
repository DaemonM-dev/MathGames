import { Game } from '../game.js'
import { GAME_SIZE, getRandomInt } from "../globals.js"
import { Command } from '../enums/commands.js'
import { InputType } from '../enums/input_types.js'

import { Scene } from '../gameplay/elements/scene.js'
import { ProgressWindow } from './elements/progress_window.js'
import { Dropzone } from './elements/dropzone.js'
import { SpeechBubble } from './elements/speech_bubble.js'
import { InputWindow } from './elements/input_window.js'
import { FoodHandler } from '../handlers/food_handler.js'
import { ButtonHandler } from '../handlers/button_handler.js'
import { Dialogue } from './elements/dialogue.js'

const LEVEL_LIMIT = 5;
const Q_LIMIT = 5;

export class Gameplay {
    constructor(){
        this.inputType = InputType.KEYBOARD;
        this.numericAnswer = 0;
        this.level = 1;
        this.prevLevel = 0;
        this.question = 1;


        this.scene = null;
        this.progressWindow = null;
        this.dropzone = null;
        this.speechBubble = null;
        this.inputWindow = null;
        this.buttonHandler = null;
        this.foodHandler = null;
        this.dialogue = null;
    }
    changeScale(scale){
        if(this.scene){this.scene.changeScale(scale);}
        if(this.progressWindow){this.progressWindow.changeScale(scale);}
        if(this.dropzone){this.dropzone.changeScale(scale);}
        if(this.speechBubble){this.speechBubble.changeScale(scale);}
        if(this.inputWindow){this.inputWindow.changeScale(scale);}
        if(this.buttonHandler){this.buttonHandler.changeScale(scale);}
        if(this.foodHandler){this.foodHandler.changeScale(scale);}
        if(this.dialogue){this.dialogue.changeScale(scale);}
    }

    init(assets){
        this.scene = new Scene();
        this.scene.init(assets);
        this.progressWindow = new ProgressWindow();
        this.dropzone = new Dropzone();
        this.speechBubble = new SpeechBubble();
        this.speechBubble.init(assets);
        this.inputWindow = new InputWindow();
        this.inputWindow.init(assets);
        this.buttonHandler = new ButtonHandler();
        this.foodHandler = new FoodHandler();
        this.foodHandler.init(assets);
        this.dialogue = new Dialogue(this.speechBubble.textBounds);
    }

    update(command, mousePos, deltaTime){
        this.scene.update(deltaTime);
        this.progressWindow.update(this.question, this.level);
        if(!this.buttonHandler.viewingMenu){
            this.inputWindow.update(this.level, command, mousePos, deltaTime);
        }
        this.buttonHandler.update(command, mousePos);
        this.foodHandler.update(this.level, command, mousePos, this.dropzone);
        this.dialogue.update(Game.ctx);
        this.handleButtonPresses();
    }

    draw(ctx){
        this.scene.draw(ctx);
        this.progressWindow.draw(ctx);
        this.dropzone.draw(ctx);
        this.speechBubble.draw(ctx);
        this.inputWindow.draw(this.level, ctx);
        this.buttonHandler.draw(ctx);
        this.foodHandler.draw(this.level, ctx);
        this.dialogue.draw(ctx);
        if(this.buttonHandler.viewingMenu){
            this.scene.drawMenu(ctx);
            this.buttonHandler.drawMenuReturn(ctx);
        }
    }

    handleButtonPresses(){
        if(this.buttonHandler.pressedButton !== null){
            console.log("Button Pressed", this.buttonHandler.pressedButton.text);
            switch(this.buttonHandler.pressedButton){
                case this.buttonHandler.submit:
                break;
                case this.buttonHandler.next:
                case this.buttonHandler.prev:
                    this.dialogue.toggleInstruction(this.level);
                    this.speechBubble.changeDirection();
                break;
            }
        }
    }
}

function clearInputBuffer(inputWindow){
    if(inputWindow.inputMsg !== ""){inputWindow.inputMsg = "";}
}
export function getKeyboardInput(gameplay, key){
    const inputWindow = gameplay.inputWindow;
    if(gameplay.inputType === InputType.KEYBOARD && inputWindow.awaitingInput){
        inputWindow.currentInput = key;
    }
}
export function removeKeyboardInput(gameplay){
    const inputWindow = gameplay.inputWindow;
    if(gameplay.inputType === InputType.KEYBOARD && inputWindow.awaitingInput){
        if(inputWindow.inputMsg.length > 0){
            inputWindow.inputMsg = inputWindow.inputMsg.slice(0, -1);
        }
    }
}
export function pressButton(viewingMenu, button){
    if(!button.pressed && !viewingMenu){console.log("Pressing Enter Key to Submit!!"); button.pressed = true;}
}