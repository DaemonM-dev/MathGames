import { GAME_WIDTH, GAME_HEIGHT, Command, Maths, InputType, Speaker, Direction } from "../constants.js";
import { GameObject } from "./gameobjects.js";
import { Scene } from './scene.js';
import { SpeechBubble } from './speechbubble.js';
import { Button } from './button.js';
import { ProgressWindow } from "./progresswindow.js";
import { FoodHandler } from "../handlers/food_handler.js";
import { Dialogue } from './dialogue.js';

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

        // State management
        this.gameState = 'PLAYING'; // PLAYING, DIALOGUE, MENU, INPUT
        this.dialogueState = 'QUESTION'; // QUESTION, ANSWER, HELP
        this.menuOpen = false;
        this.inputActive = false;

        this.answer = 100;

        this.scene = null;

        // Buttons
        this.submitButton = null;
        this.dialogueNextButton = null;
        this.dialoguePrevButton = null;
        this.helpButton = null;
        this.menuboardButton = null;
        this.escapeButton = null;

        this.menuTexture = null;
        this.kuroTexture = null;

        this.speechBubble = null;

        this.progressWindow = null;
        this.dropZone = null;
        this.inputWindow = null;

        this.foodHandler = null;

        this.dialogue = null;
    }

    init(assets){
        this.scene = new Scene();
        this.scene.init(assets);
        this.initDropZone();
        this.initSpeechBubble();
        this.initButtons(assets);
        this.foodHandler = new FoodHandler(assets);
        this.menuTexture = assets.getAsset('menuboard');
        this.kuroTexture = assets.getAsset('kuro');

        this.dialogue = new Dialogue(this.speechBubble.size, this.speechBubble.pos);
        this.dialogue.setFont('AlegrayaBold', 35, 'black');
        this.dialogue.newLevelOneQuestion(this.foodHandler.foodCopies[0], this.foodHandler.foodCopies[1], this.foodHandler.foodCopies[2]);
    }

    update(command, mousePos, scale){
        this.changeScale(scale);
        this.updateButtons(command, mousePos);
        this.progressWindow.update(this.level, this.question);

        // Handle input buffer updates
        if (this.inputWindow.text !== this.inputBuffer) {
            this.inputWindow.text = this.inputBuffer;
        }

        if (this.menuOpen) {
            if (this.escapeButton.isPressed()) {
                this.menuOpen = false;
            }
        } else {
            this.handleGameplayInput(command);
            
            if (this.inputType === InputType.KEYBOARD){
                this.handleKeyboardInput(command, mousePos);
            } else {
                this.foodHandler.dragFood(command, mousePos, this.dropZone.size, this.dropZone.pos);
            }
        }
    }

    handleGameplayInput(command) {
        const submitPressed = this.submitButton.isPressed();
        const nextPressed = this.dialogueNextButton.isPressed();
        const prevPressed = this.dialoguePrevButton.isPressed();
        const helpPressed = this.helpButton.isPressed();
        const menuPressed = this.menuboardButton.isPressed();

        if (submitPressed) {
            this.handleSubmit();
        } else if (nextPressed) {
            this.handleDialogueNext();
        } else if (prevPressed) {
            this.handleDialoguePrev();
        } else if (helpPressed) {
            this.handleHelp();
        } else if (menuPressed) {
            this.menuOpen = true;
        }
    }

    handleSubmit() {
        console.log("Submit Button Pressed");
        if (this.inputBuffer !== "" && parseInt(this.inputBuffer) !== this.answer) {
            this.clearInputBuffer();
            console.log("Incorrect Answer: Try Again!");
        }
    }

    handleDialogueNext() {
        console.log("Next Dialogue Button Pressed");
        this.speechBubble.setDirection(Direction.RIGHT);
    }

    handleDialoguePrev() {
        console.log("Previous Dialogue Button Pressed");
        this.speechBubble.setDirection(Direction.LEFT);
    }

    handleHelp() {
        console.log("Help Button Pressed");
    }

    draw(ctx){
        this.scene.draw(ctx);
        this.drawButtons(ctx);
        this.speechBubble.draw(ctx);
        this.progressWindow.draw(ctx);
        this.drawDropZone(ctx);
        if(this.inputType === InputType.KEYBOARD){
            this.inputWindow.draw(ctx);
            this.foodHandler.drawCopies(ctx);
            this.drawKuro(ctx);
        }
        this.foodHandler.draw(ctx);
        this.dialogue.draw(ctx);

        if(this.menuOpen){
            this.drawMenu(ctx);
            this.escapeButton.draw(ctx);
        }
    }

    changeScale(scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.scene.changeScale(this.scale);
            this.submitButton.changeScale(this.scale);
            this.dialogueNextButton.changeScale(this.scale);
            this.dialoguePrevButton.changeScale(this.scale);
            this.helpButton.changeScale(this.scale);
            this.speechBubble.changeScale(this.scale);
            this.progressWindow.changeScale(this.scale);
            this.menuboardButton.changeScale(this.scale);
            this.escapeButton.changeScale(this.scale);
            this.dropZone.changeScale(this.scale);
            this.inputWindow.changeScale(this.scale);
            this.foodHandler.changeScale(this.scale);
            this.dialogue.changeScale(this.scale);
        }
    }

    updateButtons(command, mousePos){
        if (this.menuOpen) {
            this.escapeButton.update(mousePos, command);
        } else {
            // Only update necessary buttons when not viewing menu
            this.submitButton.update(mousePos, command);
            this.dialogueNextButton.update(mousePos, command);
            this.dialoguePrevButton.update(mousePos, command);
            this.helpButton.update(mousePos, command);
            this.menuboardButton.update(mousePos, command);
        }
    }

    handleKeyboardInput(command, mousePos){
        this.inputWindow.update(mousePos, command);
        
        if (this.inputWindow.isPressed()) {
            if (!this.inputActive) {
                this.inputActive = true;
                this.inputWindow.toggleVisibleText();
                console.log("Waiting for input");
            }
        } else {
            if (this.inputActive && command === Command.MOUSE_DOWN && !this.inputWindow.intersects(mousePos)) {
                this.inputActive = false;
                console.log("No longer waiting for input");
                this.inputWindow.toggleVisibleText();
            }
        }
    }

    initDropZone(){
        const bgSize = {x: 1280, y: 720};
        const dzSize = { x: 500, y: 500 };
        const dzPos = {
            x: (GAME_WIDTH - (GAME_WIDTH - bgSize.x)) + ((GAME_WIDTH - bgSize.x) - dzSize.x) / 2,
            y: bgSize.y - dzSize.y
        };
        this.dropZone = new GameObject(null, dzSize, dzPos);
        this.dropZone.setColor('white');
        this.dropZone.setOutlineColor('black');
        this.dropZone.setOutlineWidth(8);
        this.dropZone.setRadius(45);
    }

    drawDropZone(ctx){
        ctx.fillStyle = this.dropZone.color;
        ctx.lineWidth = this.dropZone.outlineWidth;
        ctx.strokeStyle = this.dropZone.outlineColor;
        ctx.beginPath();
        ctx.roundRect(this.dropZone.pos.x, this.dropZone.pos.y, this.dropZone.size.x, this.dropZone.size.y, this.dropZone.radius);
        ctx.fill();
        ctx.stroke();
    }

    initSpeechBubble(){
        let size = {x: 600, y:300};
        let pos = {x: 338, y:755};
        let radius = 125;
        let lineWidth = 10;
        this.speechBubble = new SpeechBubble(size,pos,radius,lineWidth);
        this.speechBubble.setColors('#f0b155', 'black');

        const bgSize = {x: 1280, y: 720};

        size = {x: 500, y:175};
        pos = { x: (GAME_WIDTH - (GAME_WIDTH - bgSize.x)) + ((GAME_WIDTH - bgSize.x) - size.x) / 2, y:20};
        radius = 35;
        lineWidth = 8;
        this.progressWindow = new ProgressWindow(size, pos, radius, lineWidth);
        this.progressWindow.setColors('white', 'black');
        this.progressWindow.setFont('AlegrayaBold', 60, 'black');

        size = {x: 500, y:85};
        pos = { x: (GAME_WIDTH - (GAME_WIDTH - bgSize.x)) + ((GAME_WIDTH - bgSize.x) - size.x) / 2, y:745};
        radius = 30;
        lineWidth = 8;
        this.inputWindow = new Button(size, pos, radius, lineWidth);
        this.inputWindow.setColors('white', 'black', '#e0e0e0', 'black', '#e0e0e0', '#ffffff00');
        this.inputWindow.setText("", 'AlegrayaBold', 50, '#000000');
        this.inputWindow.setAltText("Click to type...", 'AlegrayaBold', 40, '#00000051');
    }

    initButtons(assets){
         // Submit Button (Below DropZone)
        let size = {x: 200, y:100 };
        let pos = { x: this.dropZone.pos.x + (this.dropZone.size.x / 2) - (size.x / 2), y: 855};
        let radius = 45;
        let lineWidth = 5;
        this.submitButton = new Button(size, pos, radius, lineWidth);
        this.submitButton.setColors('#f3b15576','#f3b255','#f3b155bb','#f3b255','#f3b15576','#f3b15500');
        this.submitButton.setText("Enter", 'AlegrayaBold', 50, '#000000');
        this.submitButton.toggleVisibleText();

        size = {x:150, y:75};
        pos = {x: 25, y: 25};
        radius = 30;
        this.helpButton = new Button(size, pos, radius, lineWidth);
        this.helpButton.setColors('#9bd7b591','#9bd7b5','#9bd7b5c8','#9bd7b5','#9bd7b591','#9bd7b500');
        this.helpButton.setText("Info", 'AlegrayaBold', 50, '#000000');
        this.helpButton.toggleVisibleText();

        size = {x:50, y:50};
        pos = {x: 925, y: GAME_HEIGHT - 75};
        radius = 22;
        this.dialogueNextButton = new Button(size, pos, radius, lineWidth);
        this.dialogueNextButton.setColors('#88a8d877','#88a8d8','#88a8d8ce','#88a8d8','#88a8d877','#88a8d800');
        this.dialogueNextButton.setText(">", 'AlegrayaBold', 50, '#9bd7b5');
        this.dialogueNextButton.toggleVisibleText();

        size = {x:50, y:50};
        pos = {x: 300, y: GAME_HEIGHT - 75};
        this.dialoguePrevButton = new Button(size, pos, radius, lineWidth);
        this.dialoguePrevButton.setColors('#88a8d877','#88a8d8','#88a8d8ce','#88a8d8','#88a8d877','#88a8d800');
        this.dialoguePrevButton.setText("<", 'AlegrayaBold', 50, '#9bd7b5');
        this.dialoguePrevButton.toggleVisibleText();

        size = {x: 250, y: 30};
        pos = {x: 530, y:85};
        radius = 10;
        lineWidth = 5;
        this.menuboardButton = new Button(size, pos, radius, lineWidth);
        this.menuboardButton.setColors('#4949497e','#00000060','#353535ce','#00000060','#353535ce','#88a8d800');
        this.menuboardButton.setText("Today's Menu +", 'AlegrayaBold', 20, '#ffffff9d');
        this.menuboardButton.toggleVisibleText();

        size = {x: 50, y: 50};
        pos = {x: 1407, y:100};
        radius = 10;
        lineWidth = 5;
        this.escapeButton = new Button(size, pos, radius, lineWidth);
        this.escapeButton.setColors('#4949497e','#00000060','#353535ce','#00000060','#353535ce','#88a8d800');
        this.escapeButton.setText("X", 'AlegrayaBold', 40, '#ffffff9d');
        this.escapeButton.toggleVisibleText();
    }

    drawButtons(ctx){
        this.submitButton.draw(ctx);
        this.dialogueNextButton.draw(ctx);
        this.dialoguePrevButton.draw(ctx);
        this.helpButton.draw(ctx);
        this.menuboardButton.draw(ctx);
    }

    drawKuro(ctx){
        const defSize = {x: 100, y: 66};
        const size = {x: defSize.x * this.scale.x, y: defSize.y * this.scale.y};
        const pos = {
            x: this.inputWindow.pos.x + (10 * this.scale.x),
            y: this.inputWindow.pos.y + (this.inputWindow.size.y / 2) - (size.y / 2) - (5 * this.scale.y)
        };

        ctx.drawImage(this.kuroTexture, pos.x, pos.y, size.x, size.y);
    }

    drawMenu(ctx){
        const extra = 50;
        const size = {x: (this.menuTexture.width + extra) * this.scale.x, y: (this.menuTexture.height + extra) * this.scale.y};
        const pos = {x: ((GAME_WIDTH / 2) - ((this.menuTexture.width + extra) / 2)) * this.scale.x,
                y: ((GAME_HEIGHT / 2) - ((this.menuTexture.height + extra) / 2)) * this.scale.y
            };

        ctx.fillStyle = '#000000c7';
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.menuTexture, pos.x, pos.y, size.x, size.y);
    }

    clearInputBuffer(){
        if(this.inputBuffer !== ""){
            this.inputBuffer = "";
            console.log("Buffer Cleared!");
        }
    }

    getKeyboardInput(key){
        if(this.inputType === InputType.KEYBOARD && this.inputActive){
            if(this.inputBuffer.length < this.maxDigits){
                this.inputBuffer += key;
            } else {
                console.log("Received Input: ", this.inputBuffer);
            }
        }
    }

    removeKeyboardInput(){
        if(this.inputType === InputType.KEYBOARD && this.inputActive){
            if(this.inputBuffer.length > 0){
                this.inputBuffer = this.inputBuffer.slice(0, -1);
                console.log("New Input buffer: ", this.inputBuffer);
            }
        }
    }

    pressButton(button){
        if(this.inputType === InputType.KEYBOARD && this.inputActive){
            if(!button.pressed){
                button.pressed = true;
            }
        }
    }
}
