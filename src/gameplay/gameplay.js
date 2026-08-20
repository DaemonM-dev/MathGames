import { GAME_WIDTH, GAME_HEIGHT, Command, Maths, InputType, Speaker } from "../constants.js";
import { GameObject } from "./gameobjects.js";
import { Level } from '../level.js'
import { Button } from './button.js'

const MAX_LEVELS = 10;

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.scale = { x: 1.0, y: 1.0 };

        this.purpleRect = null;
        this.background = null;
        this.vertBar = null;
        this.horizBar = null;
        this.boy = null;
        this.girl = null;
        this.dropZone = null;
        this.dialogueBox = null;

        this.submit = null;
        this.dialogueNext = null;
        this.dialoguePrev = null;
        this.help = null;
    }

    init(assets){
        this.initBackground(assets);
        this.initButtons();
    }
    update(command, mousePos, scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.scaleBackground();
            this.scaleButtons();
        }

        this.submit.update(mousePos, command);
        this.dialogueNext.update(mousePos, command);
        this.dialoguePrev.update(mousePos, command);
        this.help.update(mousePos, command);

        if(this.submit.isPressed()){
            console.log("Submit Button Pressed");
        } else if (this.dialogueNext.isPressed()){
            console.log("Next Dialogue Button Pressed");
        } else if(this.dialoguePrev.isPressed()){
            console.log("Preivous Dialogue Button Pressed");
        } else if(this.help.isPressed()){
            console.log("Help Button Pressed");
        }

    }
    draw(ctx){
        this.drawBackground(ctx);
        this.drawButtons(ctx);
    }

    scaleBackground(){
        this.purpleRect.changeScale(this.scale);
        this.background.changeScale(this.scale);
        this.vertBar.changeScale(this.scale);
        this.horizBar.changeScale(this.scale);
        this.boy.changeScale(this.scale);
        this.girl.changeScale(this.scale);
        this.dialogueBox.changeScale(this.scale);
        this.dropZone.changeScale(this.scale);
    }
    scaleButtons(){
        this.submit.changeScale(this.scale);
        this.dialogueNext.changeScale(this.scale);
        this.dialoguePrev.changeScale(this.scale);
        this.help.changeScale(this.scale);
    }

    initBackground(assets){
        // Purple Rectangle
        const BG_SIZE = {x: 1280, y: 720};
        this.purpleRect = new GameObject(null, {x:BG_SIZE.x , y: 360}, {x: 0, y: GAME_HEIGHT - 360});
        this.purpleRect.setColor('purple');

        // Cafe Background
        this.background = new GameObject(assets.getAsset('background'), BG_SIZE, {x: 0, y: 0});

        // Comic strip borders
        const BAR_WIDTH = 14;
        this.vertBar = new GameObject(null, {x: BAR_WIDTH, y: GAME_HEIGHT}, {x: BG_SIZE.x - BAR_WIDTH / 2, y: 0});
        this.vertBar.setColor('black');
        this.horizBar = new GameObject(null, {x: BG_SIZE.x, y: BAR_WIDTH}, {x: 0, y:BG_SIZE.y - BAR_WIDTH / 2});
        this.horizBar.setColor('black');

        // Characters
        const CHAR_SCALE = 0.75;
        const CHAR_SIZE = {x: 450 * CHAR_SCALE, y: 600 * CHAR_SCALE};
        this.boy = new GameObject(assets.getAsset('boy'), CHAR_SIZE, {x: 0, y: GAME_HEIGHT - CHAR_SIZE.y});
        this.girl = new GameObject(assets.getAsset('girl'),CHAR_SIZE, {x: BG_SIZE.x - CHAR_SIZE.x, y:GAME_HEIGHT - CHAR_SIZE.y});

        // DropZone (Rectangle on right hand side of screen)
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

        // Dialogue Box (between Characters)
        this.dialogueBox = new GameObject(null, {x: 500, y:225}, {x: 390, y: 800});
        this.dialogueBox.setColor('#f0b155');
        this.dialogueBox.setOutlineColor('black');
        this.dialogueBox.setOutlineWidth(8);
        this.dialogueBox.setRadius(90);
    }
    initButtons(){
         // Submit Button (Below DropZone)
        let size = {x: 200, y:100 };
        let pos = { x: this.dropZone.pos.x + (this.dropZone.size.x / 2) - (size.x / 2), y: 800};
        let radius = 45;
        let lineWidth = 5;
        this.submit = new Button(size, pos, radius, lineWidth);
        this.submit.setColors('#9bd7b591','#9bd7b5','#9bd7b5c8','#9bd7b5','#9bd7b591','#9bd7b500');

        size = {x:150, y:75};
        pos = {x: 25, y: 25};
        radius = 35;
        this.help = new Button(size, pos, radius, lineWidth);
        this.help.setColors('#f3b15576','#f3b255','#f3b155bb','#f3b255','#f3b15576','#f3b15500');

        radius = 22;

        size = {x:50, y:50};
        pos = {x: 850, y: GAME_HEIGHT - 75};
        this.dialogueNext = new Button(size, pos, radius, lineWidth);
        this.dialogueNext.setColors('#88a8d877','#88a8d8','#88a8d8ce','#88a8d8','#88a8d877','#88a8d800');

        size = {x:50, y:50};
        pos = {x: 350, y: GAME_HEIGHT - 75};
        this.dialoguePrev = new Button(size, pos, radius, lineWidth);
        this.dialoguePrev.setColors('#88a8d877','#88a8d8','#88a8d8ce','#88a8d8','#88a8d877','#88a8d800');
    }

    drawBackground(ctx){
        ctx.fillStyle = this.purpleRect.color;
        ctx.fillRect(this.purpleRect.pos.x, this.purpleRect.pos.y, this.purpleRect.size.x, this.purpleRect.size.y);

        ctx.drawImage(this.background.texture, this.background.pos.x,
             this.background.pos.y, this.background.size.x, this.background.size.y);

        ctx.fillStyle = this.vertBar.color;
        ctx.fillRect(this.vertBar.pos.x, this.vertBar.pos.y, this.vertBar.size.x, this.vertBar.size.y);
        ctx.fillRect(this.horizBar.pos.x, this.horizBar.pos.y, this.horizBar.size.x, this.horizBar.size.y);

        ctx.fillStyle = this.dropZone.color;
        ctx.lineWidth = this.dropZone.outlineWidth;
        ctx.strokeStyle = this.dropZone.outlineColor;
        ctx.beginPath();
        ctx.roundRect(this.dropZone.pos.x, this.dropZone.pos.y, this.dropZone.size.x, this.dropZone.size.y, this.dropZone.radius);
        ctx.fill();
        ctx.stroke();

        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);

        ctx.fillStyle = this.dialogueBox.color;
        ctx.lineWidth = this.dialogueBox.outlineWidth;
        ctx.strokeStyle = this.dialogueBox.outlineColor;
        ctx.beginPath();
        switch(this.activeSpeaker){
            case Speaker.BOY:
                ctx.roundRect(this.dialogueBox.pos.x, this.dialogueBox.pos.y, this.dialogueBox.size.x, this.dialogueBox.size.y,
                    [0, this.dialogueBox.radius, this.dialogueBox.radius, this.dialogueBox.radius]);
            break;
            case Speaker.GIRL:
                ctx.roundRect(this.dialogueBox.pos.x, this.dialogueBox.pos.y, this.dialogueBox.size.x, this.dialogueBox.size.y,
                    [this.dialogueBox.radius, 0, this.dialogueBox.radius, this.dialogueBox.radius]);
            break;
        }
            ctx.fill();
        ctx.stroke();
    }
    drawButtons(ctx){
        this.submit.draw(ctx);
        this.dialogueNext.draw(ctx);
        this.dialoguePrev.draw(ctx);
        this.help.draw(ctx);
    }
}