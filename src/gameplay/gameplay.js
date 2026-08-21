import { GAME_WIDTH, GAME_HEIGHT, Command, Maths, InputType, Speaker, Direction } from "../constants.js";
import { GameObject } from "./gameobjects.js";
import { Scene } from './scene.js'
import { SpeechBubble } from './speechbubble.js'
import { Button } from './button.js'

const MAX_LEVELS = 10;

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.scale = { x: 1.0, y: 1.0 };

        this.q_lvl_limit = 5;
        this.level = 1;
        this.question = 1;

        this.scene = null;

        // Buttons
        this.submit = null;
        this.dialogueNext = null;
        this.dialoguePrev = null;
        this.help = null;

        this.speechBubble = null;

        this.progressWindow = null;
        this.dropZone = null;
        this.inputWindow = null;
    }

    init(assets){
        this.scene = new Scene();
        this.scene.init(assets);
        this.initDropZone();
        this.initSpeechBubble();
        this.initButtons(assets);
    }
    update(command, mousePos, scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;

            this.scene.changeScale(this.scale);
            // Buttons
            this.submit.changeScale(this.scale);
            this.dialogueNext.changeScale(this.scale);
            this.dialoguePrev.changeScale(this.scale);
            this.help.changeScale(this.scale);
            //
            this.speechBubble.changeScale(this.scale);

            this.progressWindow.changeScale(this.scale);
            this.dropZone.changeScale(this.scale);
            this.inputWindow.changeScale(this.scale);
        }

        this.submit.update(mousePos, command);
        this.dialogueNext.update(mousePos, command);
        this.dialoguePrev.update(mousePos, command);
        this.help.update(mousePos, command);

        if(this.submit.isPressed()){
            console.log("Submit Button Pressed");
        } else if (this.dialogueNext.isPressed()){
            console.log("Next Dialogue Button Pressed");
            this.speechBubble.setDirection(Direction.RIGHT);
        } else if(this.dialoguePrev.isPressed()){
            console.log("Previous Dialogue Button Pressed");
            this.speechBubble.setDirection(Direction.LEFT);
        } else if(this.help.isPressed()){
            console.log("Help Button Pressed");
        }
    }
    draw(ctx){
        this.scene.draw(ctx);
        this.drawButtons(ctx);
        this.speechBubble.draw(ctx);
        this.progressWindow.draw(ctx);
        this.drawDropZone(ctx);
        this.inputWindow.draw(ctx);
    }

    initDropZone(){
        const BG_SIZE = {x: 1280, y: 720};
        const DZ_SIZE = { x: 500, y: 500 };
        const DZ_POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - DZ_SIZE.x) / 2,
            y: BG_SIZE.y - DZ_SIZE.y
        };
        this.dropZone = new GameObject(null, DZ_SIZE, DZ_POS);
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


        const BG_SIZE = {x: 1280, y: 720};

        size = {x: 500, y:175};
        pos = { x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - size.x) / 2, y:20};
        radius = 35;
        lineWidth = 8;
        this.progressWindow = new SpeechBubble(size, pos, radius, lineWidth);
        this.progressWindow.setColors('white', 'black');

        size = {x: 500, y:175};
        pos = { x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - size.x) / 2, y:745};
        radius = 35;
        lineWidth = 8;
        this.inputWindow = new SpeechBubble(size, pos, radius, lineWidth);
        this.inputWindow.setColors('white', 'black');
    }

    initButtons(assets){
         // Submit Button (Below DropZone)
        let size = {x: 200, y:100 };
        let pos = { x: this.dropZone.pos.x + (this.dropZone.size.x / 2) - (size.x / 2), y: GAME_HEIGHT - size.y - 30};
        let radius = 45;
        let lineWidth = 5;
        this.submit = new Button(size, pos, radius, lineWidth);
        this.submit.setColors('#f3b15576','#f3b255','#f3b155bb','#f3b255','#f3b15576','#f3b15500');
        this.submit.setText("Enter", assets.getAsset('alegraya_bold'), 50, '#f3b255');

        size = {x:150, y:75};
        pos = {x: 25, y: 25};
        radius = 30;
        this.help = new Button(size, pos, radius, lineWidth);
        this.help.setColors('#9bd7b591','#9bd7b5','#9bd7b5c8','#9bd7b5','#9bd7b591','#9bd7b500');
        this.help.setText("Info", assets.getAsset('alegraya_bold'), 50, '#9bd7b5');

        size = {x:50, y:50};
        pos = {x: 925, y: GAME_HEIGHT - 75};
        radius = 22;
        this.dialogueNext = new Button(size, pos, radius, lineWidth);
        this.dialogueNext.setColors('#88a8d877','#88a8d8','#88a8d8ce','#88a8d8','#88a8d877','#88a8d800');
        this.dialogueNext.setText(">", assets.getAsset('alegraya_bold'), 50, '#9bd7b5');

        size = {x:50, y:50};
        pos = {x: 300, y: GAME_HEIGHT - 75};
        this.dialoguePrev = new Button(size, pos, radius, lineWidth);
        this.dialoguePrev.setColors('#88a8d877','#88a8d8','#88a8d8ce','#88a8d8','#88a8d877','#88a8d800');
        this.dialoguePrev.setText("<", assets.getAsset('alegraya_bold'), 50, '#9bd7b5');
    }
    drawButtons(ctx){
        this.submit.draw(ctx);
        this.dialogueNext.draw(ctx);
        this.dialoguePrev.draw(ctx);
        this.help.draw(ctx);
    }
}