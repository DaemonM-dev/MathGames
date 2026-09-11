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

const MAX_QUESTIONS = 5;
const MAX_LEVELS = 5;

export class Gameplay {
    constructor(){
        this.inputType = InputType.KEYBOARD;

        this.level = 1;
        this.prevLevel = 0;
        this.question = 1;
        this.prevQuestion = 0;

        this.scene = null;
        this.progressWindow = null;
        this.dropzone = null;
        this.speechBubble = null;
        this.inputWindow = null;
        this.buttonHandler = null;
        this.foodHandler = null;
        this.dialogue = null;

        this.playerAnswer = 0;
        this.correctAnswer = 0;
        this.viewingFeedback = false;
        this.answerCorrect = false;
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
        if(!this.viewingFeedback){
            this.handleLevelSwap(this.level);
            this.scene.update(deltaTime);
            this.progressWindow.update(this.question, this.level);
            if(!this.buttonHandler.viewingMenu){
                this.inputWindow.update(this.level, command, mousePos, deltaTime);
            }
            this.buttonHandler.update(command, mousePos);
            this.foodHandler.update(this.level, command, mousePos, this.dropzone);
            this.dialogue.update(Game.ctx);
            this.handleButtonPresses();
        } else {
            if(command === Command.MOUSE_DOWN){
                this.viewingFeedback = false;
                this.nextQuestion();
            }
        }
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
        if(this.viewingFeedback){
            this.scene.drawFeedback(this.answerCorrect, ctx);
        }
    }

    nextQuestion(){
        if(!this.answerCorrect){
            // Rest Food Positions
        } else {
            if(this.question < MAX_QUESTIONS){
                this.question++;
                this.generateNextQuestion(this.level);
            } else if (this.level < MAX_LEVELS){
                this.question = 1;
                this.level++;
            } else {
                // GAMEOVER!!!
            }
        }
    }

    handleButtonPresses(){
        if(this.buttonHandler.pressedButton !== null){
            console.log("Button Pressed", this.buttonHandler.pressedButton.text);
            switch(this.buttonHandler.pressedButton){
                case this.buttonHandler.submit:
                if(this.inputWindow.input !== "" || this.foodHandler.dropzoneCount !== 0 ){
                    this.checkAnswer();
                    this.viewingFeedback = true;
                }
                break;
                case this.buttonHandler.next:
                case this.buttonHandler.prev:
                    this.dialogue.toggleInstruction(this.level);
                    this.speechBubble.changeDirection();
                break;
            }
        }
    }

    generateNextQuestion(level){
        switch(level){
            case 1: this.generateNextLvlOneQuestion();
            break;
        };
    }


    handleLevelSwap(level){
        if(this.level !== this.prevLevel){
            switch(level){
                case 1:
                    this.generateNextLvlOneQuestion();
                    this.inputType = InputType.KEYBOARD;
                break;
                case 2:
                    // this.generateNextLvlTwoQuestion();
                    this.inputType = InputType.DRAG_DROP;
                break;
                case 3:
                    // this.generateNextLvlThreeQuestion();
                    this.inputType = InputType.KEYBOARD;
                break;
                case 4:
                    // this.generateNextLvlFourQuestion();
                    // this.dialogue.mathVisible = true;
                    this.inputType = InputType.KEYBOARD;
                break;
                case 5:
                    // this.generateNextLvlFiveQuestion();
                    // this.dialogue.mathVisible = false;
                    this.inputType = InputType.DRAG_DROP;
                break;
            }
            this.prevLevel = this.level;
            this.prevQuestion = this.question;
            this.speechBubble.changeDirection();
        }
    }

    generateNextLvlOneQuestion(){
        this.foodHandler.randomiseDynamic();
        this.foodHandler.copyRandom();
        this.dialogue.initLvlOneQuestion(this.foodHandler.copies);
        this.dialogue.wrappingText = true;
        this.correctAnswer = this.dialogue.getAnswer();
        this.speechBubble.changeDirection();
        console.log("Answer: ", this.correctAnswer);
    }

    checkAnswer(){
        switch(this.level){
            case 1: case 3: case 4:
                if(parseFloat(this.inputWindow.input) === this.correctAnswer){
                    this.answerCorrect = true;
                    console.log("Answer is correct!");
                } else {
                    console.log("Answer is incorrect!");
                    this.answerCorrect = false;
                }
                break;
        }
        clearInputBuffer(this.inputWindow);
    }
}

function clearInputBuffer(inputWindow){
    if(inputWindow.input !== ""){inputWindow.input = "";}
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
        if(inputWindow.input.length > 0){
            inputWindow.input = inputWindow.input.slice(0, -1);
        }
    }
}
export function pressButton(viewingMenu, button){
    if(!button.pressed && !viewingMenu){console.log("Pressing Enter Key to Submit!!"); button.pressed = true;}
}