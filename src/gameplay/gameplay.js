import { GAME_WIDTH, GAME_HEIGHT, Commands, Maths, InputType, Speaker } from "../constants.js";
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

        this.submitButton = null;


        this.levels = [];
        this.activeLevel = 1;
        this.activeSpeaker = Speaker.GIRL;
    }

    init(assets){
        this.initStaticElements(assets);
        this.initButtons();

        this.levels.push(new Level(1, Maths.ADDITION, InputType.KEYBOARD));
        this.levels.push(new Level(2, Maths.ADDITION, InputType.DRAG_DROP));
        this.levels.push(new Level(3, Maths.ADD_SUB, InputType.KEYBOARD));
        this.levels.push(new Level(4, Maths.MULTIPLICATION, InputType.KEYBOARD));
        this.levels.push(new Level(5, Maths.FRACTIONS, InputType.DRAG_DROP));

        this.initLevelQuestions(1);

        console.log(this.levels[0].questions);
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
            this.dialogueBox.changeScale(this.scale);
            this.dropZone.changeScale(this.scale);

            this.submitButton.changeScale(this.scale);
        }

        this.submitButton.update(mousePos, command);

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
        this.drawButtons(ctx);
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

        // Dialogue Box (between Characters)
        this.dialogueBox = new GameObject(null, {x: 500, y:225}, {x: 390, y: 800});
        this.dialogueBox.setColor('#f0b155');
        this.dialogueBox.setOutlineColor('black');
        this.dialogueBox.setOutlineWidth(8);
        this.dialogueBox.setRadius(90);
    }

    initButtons(){
         // Submit Button (Below DropZone)
        const SUBMIT_SIZE = {x: 200, y:100 };
        const SUBMIT_POS = { x: this.dropZone.pos.x + (this.dropZone.size.x / 2) - (SUBMIT_SIZE.x / 2),
                             y: 850};
        this.submitButton = new Button(SUBMIT_SIZE, SUBMIT_POS, 10, 4);
        this.submitButton.setColors('#40ff50','#196f0f',
                                    '#40ffa9','#0f5d6f',
                                    '#ec40ff','#510960');
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
        this.submitButton.draw(ctx);
    }

    initLevelQuestions(levelNum){
        switch(levelNum){
            case 1:
                this.lvlOneQuestions();
            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
            break;
            case 5:
            break;
        }
    }

    lvlOneQuestions(){
        let question = "N/A";
        let answer = "N/A";

        question = "How much Kuro would it cost to buy a bowl of fruit salad and a chocolate cake?";
        answer = "15";
        this.levels[0].addQuestion(1, Speaker.GIRL, question, answer);

        question = "How much Kuro would it cost to buy a bowl of salad and cupcakes?";
        answer = "9";
        this.levels[0].addQuestion(2, Speaker.BOY, question, answer);

        question = "How much Kuro would it cost to buy a Macha Cake and a Fruit Cake?";
        answer = "20";
        this.levels[0].addQuestion(3, Speaker.GIRL, question, answer);

        question = "How much Kuro would it cost to buy tofu and a salad?";
        answer = "14";
        this.levels[0].addQuestion(4, Speaker.BOY, question, answer);

        question = "How much Kuro would it cost to buy all the cake?";
        answer = "15";
        this.levels[0].addQuestion(5, Speaker.GIRL, question, answer);
    }
}