import { GAME_SIZE } from "../globals.js"
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

const MAX_LEVELS = 10;
const Q_LVL_LIMIT = 5;

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.scale = { x: 1.0, y: 1.0 };

        this.inputType = InputType.KEYBOARD;
        this.inputBuffer = "";
        this.maxDigits = 5;

        this.level = 1;
        this.question = 1;
        this.awaitingInput = false;
        this.viewingMenu = false;

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
        this.initSpeechBubble();
        this.initInputWindow();
        this.initButtons();
        this.initFoods(assets);
        this.initDialogue();
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
    initSpeechBubble(){
        const SIZE = {x: 600, y:300};
        const POS = {x: 338, y:755};
        const RADIUS = 125;
        const LINEWIDTH = 10;
        this.speechBubble.initShape(SIZE, POS, RADIUS, LINEWIDTH, '#f0b155', 'black');
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
        POS = { x: 925, y: GAME_SIZE.y - 75};
        RADIUS = 22;
        LINEWIDTH = 5;
        this.buttons[2].initShape(SIZE, POS, RADIUS, LINEWIDTH,'#88a8d877','#88a8d8');
        this.buttons[2].setActionColors('#88a8d8ce', '#88a8d8', '#88a8d877', '#88a8d800');
        this.buttons[2].initText('PoppinsBold', 50, '#9bd7b5');
        this.buttons[2].setText(">");

        SIZE = {x: 50, y:50 };
        POS = { x: 300, y: GAME_SIZE.y - 75};
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
        this.dialogue.initFont('PoppinsBold', 45, 'black');
        this.dialogue.initBounds({...this.speechBubble.size}, {
            x: this.speechBubble.pos.x + (this.speechBubble.size.x / 2),
            y: this.speechBubble.pos.y + (this.speechBubble.size.y / 2)
        });
        this.dialogue.initLevelOneQuestion(this.food.foodCopies[0], this.food.foodCopies[1], this.food.foodCopies[2]);
    }
    update(command, mousePos, scale){
        this.changeScale(scale);
        this.checkForButtonPress(command, mousePos);
        this.useActiveButtons();

        this.progressWindow.update(this.level, this.question);
    }
    draw(ctx){
        this.scene.draw(ctx);
        this.progressWindow.draw(ctx);
        this.dropzone.draw(ctx);
        this.speechBubble.draw(ctx);
        this.inputWindow.draw(ctx);
        for(let i = 0; i < this.buttons.length; i++){ if(i === 4){continue;} else{this.buttons[i].draw(ctx);} }
        this.scene.drawKuro(ctx);
        this.dialogue.draw(ctx);

        this.food.draw(ctx);
        if(this.inputType === InputType.KEYBOARD){
            this.food.drawCopies(ctx);
        }
        if(this.viewingMenu){
            this.scene.drawMenu(ctx);
            this.buttons[4].draw(ctx);
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
    
    checkForButtonPress(command, mousePos){
        if(this.viewingMenu){
            this.buttons[4].update(command,mousePos);
        } else {
            this.inputWindow.update(command, mousePos);
            for(let i = 0; i < this.buttons.length; i++){
                if(i === 4){
                    continue;
                }
                this.buttons[i].update(command, mousePos);
            }
            if(this.inputType === InputType.DRAG_DROP){
                this.food.update(command,mousePos);
            }
            if(this.awaitingInput){
                if(command === Command.MOUSE_DOWN && !this.inputWindow.intersects(mousePos)){
                this.awaitingInput = false;
                }
            }
        }
    }
    getActiveButton(){
        let activeButton = " ";
        if(this.inputWindow.isPressed()){
            activeButton = "Submit_Window";
        } else {
            for(let i = 0; i < this.buttons.length; i++){
                if(this.buttons[i].isPressed()){
                    activeButton = this.buttons[i].name;
                }
            }
        }
        return activeButton;
    }
    useActiveButtons(){
        let activeButton = this.getActiveButton();
        if(activeButton !== " "){
            switch(activeButton){
                case "Submit":
                    this.food.assignRandomValues();
                    this.food.autoSelectRandom();
                    this.dialogue.initLevelOneQuestion(this.food.foodCopies[0], this.food.foodCopies[1], this.food.foodCopies[2]);
                    this.speechBubble.changeDirection();
                    this.question++;
                    console.log("Submit button pressed!");
                    console.log(this.question);
                break;
                case "Menu":
                    if(!this.viewingMenu){
                        this.viewingMenu = true;
                    }
                    console.log("Menu button pressed!");
                break;
                case "Next":
                case "Prev":
                    this.dialogue.toggleKeyboardInputHelpMsg();
                    this.speechBubble.changeDirection();
                break;
                case "Return":
                    if(this.viewingMenu){
                        this.viewingMenu = false;
                    }
                    console.log("Return button pressed!");
                break;
                case "Submit_Window":
                    this.awaitingInput = true;
                    console.log("Input_Window pressed");
                break;
            }
        }
    }
}

function clearInputBuffer(object){
    if(object.inputBuffer !== ""){object.inputBuffer = ""; console.log("Buffer Cleared!");}
}
export function getKeyboardInput(object, key){
    if(object.inputType === InputType.KEYBOARD && object.awaitingInput){
        if(object.inputBuffer.length < object.maxDigits){
                object.inputBuffer += key;
    
        } else {
            console.log("Recieved Input: ", object.inputBuffer);
        }
    }
}
export function removeKeyboardInput(object){
    if(object.inputType === InputType.KEYBOARD && object.awaitingInput){
        if(object.inputBuffer.length > 0){
            object.inputBuffer = object.inputBuffer.slice(0, -1);
            console.log("New Input buffer: ", object.inputBuffer);
        }
    }
}
export function pressButton(object, button){
    if(object.inputType === InputType.KEYBOARD && object.awaitingInput){
        if(!button.pressed){button.pressed = true;}
    }
}