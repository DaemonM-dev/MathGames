import { GAME_WIDTH, GAME_HEIGHT, Commands, Maths, InputType, Speaker } from "../constants.js";
import { GameObject } from "./gameobjects.js";
import { Level } from '../level.js'

const MAX_LEVELS = 10;

export class Gameplay {
    constructor(){
        this.mousePos = { x: 0.0, y: 0.0 };
        this.scale = { x: 1.0, y: 1.0 };

        this.purpleRect = null,
        this.background = null,
        this.vertBar = null,
        this.horizBar = null,
        this.boy = null,
        this.girl = null,
        this.dropZone = null,
        this.submitButton = null,
        this.dialogueBox = null,

        this.levels = [];
        this.activeLevel = 1;
        this.activeSpeaker = Speaker.GIRL;
    }

    init(assets){
        this.initStaticElements(assets);

        this.levels.push(new Level(1, Maths.ADDITION, InputType.KEYBOARD));
        this.levels.push(new Level(2, Maths.ADDITION, InputType.DRAG_DROP));
        this.levels.push(new Level(3, Maths.ADD_SUB, InputType.KEYBOARD));
        this.levels.push(new Level(4, Maths.MULTIPLICATION, InputType.KEYBOARD));
        this.levels.push(new Level(5, Maths.FRACTIONS, InputType.DRAG_DROP));
    }

    update(command, mousePos, scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.purpleRect.changeScale(this.scale);
            this.background.changeScale(this.scale);
            this.vertBar.changeScale(this.scale);
            this.horizBar.changeScale(this.scale);
            this.boy.changeScale(this.scale);
            this.girl.changeScale(this.scale);
            this.submitButton.changeScale(this.scale);
            this.dialogueBox.changeScale(this.scale);
            this.dropZone.changeScale(this.scale);
        }

        if(mousePos.x !== this.mousePos.x || mousePos.y !== this.mousePos.y){
            this.mousePos = mousePos;
            if(this.submitButton.intersects(this.mousePos)){
                this.submitButton.setColor('#196f0f');
                this.submitButton.setOutlineColor('#196f0f');
            } else {
                this.submitButton.setColor('#40ff50');
                this.submitButton.setOutlineColor('#196f0f');
            }
        }

        switch(command){
            case Commands.MOUSE_DOWN:
                break;
            case Commands.MOUSE_UP:
                break;
        }

        const newSpeaker = this.levels[this.activeLevel - 1].getActiveSpeaker();
        if(this.activeSpeaker !== newSpeaker){
            this.activeSpeaker = newSpeaker;
        }
    }

    draw(ctx){
        this.drawStaticElements(ctx);
    }

    initStaticElements(assets){
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

        // Submit Button (Below DropZone)
        const SUBMIT_SIZE = {x: 200, y:100 };
        const SUBMIT_POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - SUBMIT_SIZE.x) / 2,
            y: DZ_POS.y + DZ_SIZE.y + 50
        };
        this.submitButton = new GameObject(null, SUBMIT_SIZE, SUBMIT_POS);
        this.submitButton.setColor('#40ff50');
        this.submitButton.setOutlineColor('#196f0f');
        this.submitButton.setOutlineWidth(4);
        this.submitButton.setRadius(10);

        // Dialogue Box (between Characters)
        this.dialogueBox = new GameObject(null, {x: 500, y:225}, {x: 390, y: 800});
        this.dialogueBox.setColor('#f0b155');
        this.dialogueBox.setOutlineColor('black');
        this.dialogueBox.setOutlineWidth(8);
        this.dialogueBox.setRadius(90);
    }
    drawStaticElements(ctx){
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

        ctx.fillStyle = this.submitButton.color;
        ctx.lineWidth = this.submitButton.outlineWidth;
        ctx.strokeStyle = this.submitButton.outlineColor;
        ctx.beginPath();
        ctx.roundRect(this.submitButton.pos.x, this.submitButton.pos.y, this.submitButton.size.x, this.submitButton.size.y, this.submitButton.radius);
        ctx.fill();
        ctx.stroke();

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
}