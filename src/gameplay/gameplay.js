import { Game } from '../game.js'
import { GAME_SIZE, getRandomInt } from "../globals.js"
import { Command } from '../enums/commands.js'
import { InputType } from '../enums/input_types.js'

import { Scene } from './elements/scene.js'
import { ProgressWindow } from './elements/progress_window.js'
import { Dropzone } from './elements/dropzone.js'
import { SpeechBubble } from './elements/speech_bubble.js'
import { InputWindow } from './elements/input_window.js'
import { Button } from './elements/button.js'
import { FoodHandler } from '../handlers/food_handler.js'
import { Dialogue } from './elements/dialogue.js'

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

        this.level = 1;
        this.prevLevel = 0;
        this.question = 1;
        this.numFoods = 0;
        this.feedbackIndex = 0;
        this.correctAnswer = 0;

        this.awaitingInput = false;
        this.answerCorrect = false;
        this.viewingMenu = false;
        this.viewingFeedback = false;

        this.scene = null;
        this.progressWindow = null;
        this.dropzone = null;
        this.speechBubble = null;
        this.inputWindow = null;
        this.buttons = [];
        this.food = null;
        this.dialogue = null;
    }

    init(assets){
        this.scene = new Scene();
        this.progressWindow = new ProgressWindow();
        this.dropzone = new Dropzone();
        this.speechBubble = new SpeechBubble();
        this.inputWindow = new InputWindow();
        this.buttons = [
            new Button("Submit"),
            new Button("Menu"),
            new Button("Next"),
            new Button("Prev"),
            new Button("Return")
        ];
        this.food = new FoodHandler();
        this.dialogue = new Dialogue();

        this.initScene(assets);
        this.initProgWindow();
        this.initDropzone();
        this.initSpeechBubble(assets);
        this.initInputWindow();
        this.initButtons();
        this.initFoods(assets);
        this.initDialogue();

        this.feedbackIndex = Math.floor(Math.random() * 3);
    }
    initScene(assets){
        this.scene.init(assets);
    }
    initProgWindow(){
        const BG_SIZE = {x: 1280, y: 720};
        const SIZE = {x: 500, y:175};
        const POS = { x: (GAME_SIZE.x - (GAME_SIZE.x - BG_SIZE.x)) + ((GAME_SIZE.x - BG_SIZE.x) - SIZE.x) / 2, y:20};
        const RADIUS = 35;
        const LINEWIDTH = 8;
        this.progressWindow.initShape(SIZE, POS, RADIUS, LINEWIDTH, 'white', 'black');
        this.progressWindow.initText('PoppinsBold', 70, 'black')
    }
    initDropzone(){
        const BG_SIZE = {x: 1280, y: 720};
        const SIZE = {x: 500, y: 500};
        const POS = {
            x: (GAME_SIZE.x - (GAME_SIZE.x - BG_SIZE.x)) + ((GAME_SIZE.x - BG_SIZE.x) - SIZE.x) / 2,
            y: BG_SIZE.y - SIZE.y
        };
        const RADIUS = 45;
        const LINEWIDTH = 8;
        this.dropzone.initShape(SIZE, POS, RADIUS, LINEWIDTH, 'white', 'black');
    }
    initSpeechBubble(assets){
        const SIZE = {x: 600, y:300};
        const POS = {x: 338, y:755};
        const RADIUS = 125;
        const LINEWIDTH = 10;
        this.speechBubble.initShape(SIZE, POS, RADIUS, LINEWIDTH, '#f0b155', 'black');
        this.speechBubble.initImages(assets);
    }
    initInputWindow(){
        const BG_SIZE = {x: 1280, y: 720};
        const SIZE = {x: 500, y:85};
        const POS = { x: (GAME_SIZE.x - (GAME_SIZE.x - BG_SIZE.x)) + ((GAME_SIZE.x - BG_SIZE.x) - SIZE.x) / 2, y:745};
        const RADIUS = 30;
        const LINEWIDTH = 8;
        this.inputWindow.initShape(SIZE, POS, RADIUS, LINEWIDTH, 'white', 'black');
        const HOVER = {infill:'#e0e0e0' , outline: 'black'};
        const PRESS = {infill:'#e0e0e0' , outline: '#ffffff00'};
        this.inputWindow.setActionColors(HOVER.infill, HOVER.outline, PRESS.infill, PRESS.outline);
        this.inputWindow.initText('PoppinsBold', 30, '#0000005c');
        this.inputWindow.initAltText(60, '#000000');
        this.inputWindow.setText("Click to type...");
        this.inputWindow.setAltText("123456..");
    }
    initButtons(){
        let SIZE = {x: 200, y:100 };
        let POS = { x: this.dropzone.pos.x + (this.dropzone.size.x / 2) - (SIZE.x / 2), y: 855};
        let RADIUS = 45;
        let LINEWIDTH = 5;
        this.buttons[0].initShape(SIZE, POS, RADIUS, LINEWIDTH,'#f3b15576','#f3b255');
        this.buttons[0].setActionColors('#f3b155bb', '#f3b255', '#f3b15576', '#f3b15500');
        this.buttons[0].initText('PoppinsBold', 50, '#000000');
        this.buttons[0].setText("Enter");

        SIZE = {x: 250, y:30 };
        POS = { x: 530, y: 85};
        RADIUS = 10;
        LINEWIDTH = 5;
        this.buttons[1].initShape(SIZE, POS, RADIUS, LINEWIDTH,'#4949497e','#00000060');
        this.buttons[1].setActionColors('#353535ce', '#00000060', '#353535ce', '#88a8d800');
        this.buttons[1].initText('PoppinsBold', 20, '#ffffff9d');
        this.buttons[1].setText("Today's Menu +");

        SIZE = {x: 50, y:50 };
        POS = { x: 900, y: GAME_SIZE.y - 335};
        RADIUS = 22;
        LINEWIDTH = 5;
        this.buttons[2].initShape(SIZE, POS, RADIUS, LINEWIDTH,'#88a8d877','#88a8d8');
        this.buttons[2].setActionColors('#88a8d8ce', '#88a8d8', '#88a8d877', '#88a8d800');
        this.buttons[2].initText('PoppinsBold', 50, '#9bd7b5');
        this.buttons[2].setText(">");

        SIZE = {x: 50, y:50 };
        POS = { x: 325, y: GAME_SIZE.y - 335};
        RADIUS = 22;
        LINEWIDTH = 5;
        this.buttons[3].initShape(SIZE, POS, RADIUS, LINEWIDTH,'#88a8d877','#88a8d8');
        this.buttons[3].setActionColors('#88a8d8ce', '#88a8d8', '#88a8d877', '#88a8d800');
        this.buttons[3].initText('PoppinsBold', 50, '#9bd7b5');
        this.buttons[3].setText("<");

        SIZE = {x: 50, y:50 };
        POS = { x: 1407, y: 75};
        RADIUS = 10;
        LINEWIDTH = 5;
        this.buttons[4].initShape(SIZE, POS, RADIUS, LINEWIDTH,'#4949497e','#00000060');
        this.buttons[4].setActionColors('#353535ce', '#00000060', '#353535ce', '#88a8d800');
        this.buttons[4].initText('PoppinsBold', 40, '#ffffff9d');
        this.buttons[4].setText("X");
    }
    initFoods(assets){
        this.food.init(assets);
    }
    initDialogue(){
        this.dialogue.initFont('PoppinsBold', 35, 1.4, 'black');
        this.dialogue.initBounds({
            x: this.speechBubble.pos.x + (this.speechBubble.size.x / 2),
            y: this.speechBubble.pos.y + (this.speechBubble.size.y / 2)},
            this.speechBubble.size, 125, 5
        );
        if(this.level === 1){
            this.dialogue.initLevelOneQuestion(this.food.copies[0], this.food.copies[1], this.food.copies[2]);
            this.correctAnswer = this.dialogue.getNewAnswer();
        }
    }
    initScore(score){
        // Copy the score from the server, e.g. if page reloads
        // Current question is 1 more than the score
        console.log("Initial score: ", score);
        if (score.score === 5) {
            this.level = score.level + 1;
            this.question = 1;
        } else {
            this.level = score.level;
            this.question = score.score + 1;
        }
    }
    update(command, mousePos, scale){
        this.changeScale(scale);
        const activeButton = this.getActiveButton(command, mousePos);
        if(activeButton !== ""){this.useActiveButtons(activeButton);}

        this.updateLevel(command, mousePos, activeButton);
        this.checkLevelInputs(this.level);
        this.progressWindow.update(this.level, this.question);
    }
    updateLevel(command, mousePos, activeButton){
        if(this.level == 2 || this.level == 5){
            this.food.update(command,mousePos, this.dropzone);
        } else {
            this.inputWindow.displayLiveInput(this.inputBuffer);
        }
        if(command === Command.MOUSE_DOWN && activeButton === ""){
            if(this.awaitingInput){
                this.awaitingInput = false;
            } 
            if(this.viewingFeedback){
                this.food.reset();
                if(this.answerCorrect){
                    if(this.question < 5){
                        switch(this.level){
                            case 1:
                                this.generateNextLvlOneQuestion();
                                break;
                            case 2:
                                this.generateNextLvlTwoQuestion();
                                break;
                            case 3:
                                this.generateNextLvlThreeQuestion();
                                break;
                            case 4:
                                this.generateNextLvlFourQuestion();
                                break;
                            case 5:
                                break;
                        }
                        this.question++;
                    } else {
                        this.level++;
                        this.question = 1;
                    }
                }
                this.viewingFeedback = false;
            }
        }
    }

    notifyAnswer(level, score){
        // If running inside a container, notify the container of the update to
        // progress.
        if (Game.onAnswer){
            Game.onAnswer({
                level: level,
                score: score,
                classroomPin: Game.session?.team?.classroomPin ?? '',
                teamName: Game.session?.team?.animal ?? '',
            });
        }
    }
    draw(ctx){
        this.scene.draw(ctx);
        this.progressWindow.draw(ctx);
        this.dropzone.draw(ctx);
        this.speechBubble.draw(ctx);
        for(let i = 0; i < this.buttons.length; i++){ if(i === 4){continue;} else{this.buttons[i].draw(ctx);} }
        this.dialogue.draw(ctx);
        if(this.inputType === InputType.KEYBOARD){
            this.inputWindow.draw(ctx);
            this.scene.drawKuro(ctx);
        }
        this.food.draw(this.level, ctx);
        if(this.viewingMenu){
            this.scene.drawMenu(ctx);
            this.buttons[4].draw(ctx);
        }
        if(this.viewingFeedback){
            if(this.answerCorrect){
                this.scene.drawFeedback(ctx, "pos", this.feedbackIndex);
            } else {
                this.scene.drawFeedback(ctx, "neg", 0);
            }
        }
    }
    changeScale(scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.scene.changeScale(scale);
            if(this.progressWindow){this.progressWindow.changeScale(scale);}
            if(this.dropzone){this.dropzone.changeScale(scale);}
            if(this.speechBubble){this.speechBubble.changeScale(scale);}
            if(this.inputWindow){this.inputWindow.changeScale(scale);}
            for(let i = 0; i < this.buttons.length; i++){
                if(this.buttons[i]){this.buttons[i].changeScale(scale);}
            }
            this.food.changeScale(scale);
            this.dialogue.changeScale(scale);
        }
    }
    getActiveButton(command, mousePos){
        if(this.viewingMenu){
            if(!this.food.itemSelected){
                this.buttons[4].update(command,mousePos);
                if(this.buttons[4].isPressed()){return this.buttons[4].name;}
            }
        } else if(!this.viewingFeedback) {
            if(this.inputType === InputType.KEYBOARD){ 
                this.inputWindow.update(command, mousePos); 
                if(this.inputWindow.isPressed()) return "Input_Window";
            }
            if(!this.food.itemSelected){
                for(let i = 0; i < this.buttons.length; i++){
                    if(i === 4){ continue; }
                    this.buttons[i].update(command, mousePos);
                    if(this.buttons[i].isPressed()){return this.buttons[i].name;}
                }
            }
        }
        return "";
    }
    useActiveButtons(activeButton){
        switch(activeButton){
            case "Submit":
                this.checkAnswer();
                this.viewingFeedback = true;
            break;
            case "Menu":
                this.viewingMenu = true;
            break;
            case "Next":
            case "Prev":
                this.dialogue.toggleInputHelpMsg();
                this.speechBubble.changeDirection();
            break;
            case "Return":
                this.viewingMenu = false;
            break;
            case "Input_Window":
                this.awaitingInput = true;
            break;
        }
    }
    checkAnswer(){
        switch(this.level){
            case 1:
            case 3:
            case 4:
                if(parseFloat(this.inputBuffer) === this.correctAnswer){
                    this.answerCorrect = true;
                    this.notifyAnswer(this.level, this.question);
                } else {
                    this.answerCorrect = false;
                }
                clearInputBuffer(this);
                break;
            case 2:
            case 5:
                if(this.food.dropzoneSum !== this.correctAnswer || this.food.foodInDropzone !== this.numFoods){
                    this.answerCorrect = false;
                } else {
                    this.answerCorrect = true;
                }
                break;
        }
    }
    generateNextLvlOneQuestion(){
        this.food.assignRandomValues(this.level);
        this.food.copyRandom();
        this.dialogue.initLevelOneQuestion(this.food.copies[0], this.food.copies[1], this.food.copies[2]);
        this.correctAnswer = this.dialogue.getNewAnswer();
        this.speechBubble.changeDirection();
        this.answerCorrect = false;
        console.log("Answer: ", this.correctAnswer);
    }
    generateNextLvlTwoQuestion(){
        this.food.assignRandomValues(this.level);
        this.numFoods = getRandomInt(2, 3);
        let randIndex1 = getRandomInt(0, this.food.foodItems.length - 1);
        let randIndex2 = getRandomInt(0, this.food.foodItems.length - 1);
        let randIndex3 = getRandomInt(0, this.food.foodItems.length - 1);
        let value1 = 0;
        let value2 = 0;
        let value3 = 0;
        if(randIndex2 === randIndex1){
            while(randIndex2 === randIndex1){
                randIndex2 = getRandomInt(0, this.food.foodItems.length - 1);
            }
        }
        value1 = this.food.foodItems[randIndex1].value;
        value2 = this.food.foodItems[randIndex2].value;
        if(this.numFoods === 3){
            if(randIndex3 === randIndex2 || randIndex3 === randIndex1){
                while(randIndex3 === randIndex2 || randIndex3 === randIndex1){
                    randIndex3 = getRandomInt(0, this.food.foodItems.length - 1);
                }
            }
            value3 = this.food.foodItems[randIndex3].value;
        }
        
        this.dialogue.initLevelTwoQuestion(value1, value2, value3);
        this.correctAnswer = this.dialogue.getNewAnswer();
        this.speechBubble.changeDirection();
        this.answerCorrect = false;
        console.log("Answer: ", this.correctAnswer);
    }
    generateNextLvlThreeQuestion(){
        this.food.assignRandomValues(this.level);
        this.food.copyRandom();
        this.dialogue.initLevelThreeQuestion(this.food.copies[0], this.food.copies[1], this.food.copies[2]);
        this.correctAnswer = this.dialogue.getNewAnswer();
        this.speechBubble.changeDirection();
        this.answerCorrect = false;
        console.log("Answer: ", this.correctAnswer);
    }
    generateNextLvlFourQuestion(){
        this.food.assignRandomValues(this.level);
        this.food.duplicateRandom();
        this.dialogue.initLevelFourQuestion(this.food.duplicates[0], this.food.duplicates.length);
        this.correctAnswer = this.food.duplicates.length * this.food.duplicates[0].value;
        this.speechBubble.changeDirection();
        this.answerCorrect = false;
        console.log("Answer: ", this.correctAnswer);
    }
    generateNextLvlFiveQuestion(){
        this.food.assignRandomValues(this.level);

        this.dialogue.activeText = "";
        this.correctAnswer = 0;

        this.speechBubble.changeDirection();
        this.answerCorrect = false;
        console.log("Answer: ", this.correctAnswer);
    }
    checkLevelInputs(level){
        if(level !== this.prevLevel){
            switch(level){
                case 1:
                    this.generateNextLvlOneQuestion();
                    this.inputType = InputType.KEYBOARD;
                    break;
                case 2:
                    this.generateNextLvlTwoQuestion();
                    this.inputType = InputType.DRAG_DROP;
                    break;
                case 3:
                    this.generateNextLvlThreeQuestion();
                    this.inputType = InputType.KEYBOARD;
                    break;
                case 4:
                    this.generateNextLvlFourQuestion();
                    this.dialogue.mathVisible = true;
                    this.inputType = InputType.KEYBOARD;
                    break;
                case 5:
                    this.generateNextLvlFiveQuestion();
                    this.dialogue.mathVisible = false;
                    this.inputType = InputType.DRAG_DROP;
                    break;
            }
            this.dialogue.setHelpMessage(level);
            this.prevLevel = level;
        }
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