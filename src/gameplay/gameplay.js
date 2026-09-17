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

        this.score = {questions: 0};

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
            this.progressWindow.update(this.question, this.level);
            if(!this.buttonHandler.viewingMenu){
                this.inputWindow.update(this.level, command, mousePos, deltaTime);
            }
            this.buttonHandler.update(command, mousePos);
            this.foodHandler.update(this.level, command, mousePos, this.dropzone);
            this.dialogue.update(Game.ctx);
            this.handleButtonPresses();
            if(this.level === 5){this.scene.animateCoupon(deltaTime);}
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
        if(this.level === 4){ this.dialogue.drawMathProblem(ctx); }
        this.dialogue.draw(ctx);
        if(this.level === 5){ this.scene.drawCoupon(ctx); }
        this.foodHandler.draw(this.level, ctx);
        if(this.buttonHandler.viewingMenu){
            this.scene.drawMenu(ctx);
            this.buttonHandler.drawMenuReturn(ctx);
        }
        if(this.viewingFeedback){ this.scene.drawFeedback(this.answerCorrect, ctx); }
        // this.scene.drawSting(ctx);
    }

    nextQuestion(){
        if(!this.answerCorrect){
            this.foodHandler.restorePositions();
        } else {
            if(this.question < MAX_QUESTIONS){
                this.question++;
                this.score.questions++;
                this.foodHandler.restorePositions();
                this.generateNextQuestion(this.level);
            } else if (this.level < MAX_LEVELS){
                this.question = 1;
                this.score.questions++;
                this.level++;
            } else {
                this.level = 1;
                this.score.questions++;
                this.question = 1;
            }
            console.log("Answered Correctly: ", this.score.questions);
        }
        this.viewingFeedback = false;
    }

    handleButtonPresses(){
        if(this.buttonHandler.pressedButton !== null){
            switch(this.buttonHandler.pressedButton){
                case this.buttonHandler.submit:
                if(this.inputWindow.input !== "" || this.foodHandler.dropzoneCount !== 0 ){
                    this.checkAnswer();
                    if(!this.viewingFeedback){
                        this.viewingFeedback = true;
                    }
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

    handleLevelSwap(level){
        if(this.level !== this.prevLevel){
            switch(level){
                case 1: case 3: case 4:
                    this.inputType = InputType.KEYBOARD; 
                break;
                case 2: case 5:
                    this.inputType = InputType.DRAG_DROP;
                break;
            }
            this.generateNextQuestion(this.level);
            this.prevLevel = this.level;
            this.prevQuestion = this.question;
            this.speechBubble.changeDirection();
        }
    }

    generateNextQuestion(level){
        this.foodHandler.randomiseDynamic();
        switch(level){
            case 1: 
                this.foodHandler.copyRandom();
                this.dialogue.initLvlOneQuestion(this.foodHandler.copies);
            break;
            case 2:
                this.foodHandler.copyRandom();
                this.dialogue.initLvlTwoQuestion(this.foodHandler.copies);
            break;
            case 3:
                this.foodHandler.copyRandom();
                this.dialogue.initLvlThreeQuestion(this.foodHandler.copies);
            break;
            case 4:
                this.foodHandler.duplicateRandom();
                this.dialogue.initLvlFourQuestion(this.foodHandler.duplicates);
                break;
            case 5:
                this.scene.setRandomDiscount();
                this.foodHandler.copyRandom();
                this.dialogue.initLvlFiveQuestion(this.scene.coupon, this.foodHandler.copies);
        }
        this.dialogue.wrappingText = true;
        this.speechBubble.changeDirection();
    }

    checkAnswer(){
        switch(this.level){

            case 1:
                if(parseFloat(this.inputWindow.input) === this.dialogue.getFoodSum()){
                this.answerCorrect = true;
                } else {
                this.answerCorrect = false;
                }
                break;
            
            case 2:
                const SUM = this.foodHandler.getSumFromDropzone();
                const COUNT = this.foodHandler.getDropzoneCount();

                if(SUM === this.dialogue.getFoodSum() && COUNT === this.dialogue.getFoodCount()){
                    this.answerCorrect = true;
                } else {
                    this.answerCorrect = false;
                }
                break;

            case 3:
                if(parseFloat(this.inputWindow.input) === this.dialogue.getAnswer()){
                    this.answerCorrect = true;
                } else {
                    this.answerCorrect = false;
                }
                break;

            case 4:
                if(parseFloat(this.inputWindow.input) === this.dialogue.getFoodSum()){
                    this.answerCorrect = true;
                } else {
                    this.answerCorrect = false;
                }
            break;

            case 5:

                let correctSum      = false;
                let correctTypes    = false;
                let correctCount    = false;

                // Answers
                const A_SUM     = this.dialogue.getFoodSum();
                const A_TYPES   = this.dialogue.getFoodTypes();
                const A_COUNT   = this.dialogue.getFoodCount();

                // Inputs
                const I_SUM     = this.foodHandler.getSumFromDropzone();
                const I_TYPES   = this.foodHandler.getTypesFromDropzone();
                const I_COUNT   = this.foodHandler.getDropzoneCount();

                if(A_SUM === I_SUM){
                    correctSum = true;
                } else {
                    console.log("Incorrect Result: SUM");
                }

                if(A_TYPES.healthy === I_TYPES.healthy && A_TYPES.sweet === I_TYPES.sweet){
                    correctTypes = true;
                } else{
                    console.log("Incorrect Result: TYPE");
                }

                if(A_COUNT === I_COUNT){
                    correctCount = true;
                } else{
                    console.log("Incorrect Result: COUNT");
                }

                if(correctSum && correctTypes && correctCount){
                    this.answerCorrect = true;
                } else {
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
    if(!button.pressed && !viewingMenu){button.pressed = true;}
}