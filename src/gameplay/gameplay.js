import { GAME_WIDTH, GAME_HEIGHT, Commands, Maths, InputType, Speaker } from "../constants.js";
import { GameObject } from "./gameobjects.js";
import { Level } from '../levels/levels.js'

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

        this.DZoutside = null,
        this.DZinside = null,
        this.DZbounds = null,

        this.submitButton = null,
        this.foodSpawnPositions = [],

        this.dialogueBox = null,
        this.activeDialogue = null

        this.activeSpeaker = Speaker.GIRL;

        this.level1 = null;
        this.level2 = null;
        this.level3 = null;
        this.level4 = null;
        this.level5 = null;
    }

    init(assets){
        this.initStaticElements(assets);
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
            this.DZoutside.changeScale(this.scale);
            this.DZinside.changeScale(this.scale);
            this.submitButton.changeScale(this.scale);
            this.dialogueBox.changeScale(this.scale);
        }

        if(mousePos.x !== this.mousePos.x || mousePos.y !== this.mousePos.y){
            this.mousePos = mousePos;
            if(this.submitButton.intersects(this.mousePos)){
                this.submitButton.setColor('blue');
            } else {
               this.submitButton.setColor('green');
            }
        }

        switch(command){
            case Commands.MOUSE_DOWN:
                break;
            case Commands.MOUSE_UP:
                break;
        }


    }

    draw(ctx){
        this.drawStaticElements(ctx);
    }

    initStaticElements(assets){
        const BG_SIZE = {x: 1280, y: 720};
        this.purpleRect = new GameObject(null, {x:BG_SIZE.x , y: 360}, {x: 0, y: GAME_HEIGHT - 360});
        this.background = new GameObject(assets.getAsset('background'), BG_SIZE, {x: 0, y: 0});

        const BAR_WIDTH = 14;
        this.vertBar = new GameObject(null, {x: BAR_WIDTH, y: GAME_HEIGHT}, {x: BG_SIZE.x - BAR_WIDTH / 2, y: 0});
        this.horizBar = new GameObject(null, {x: BG_SIZE.x, y: BAR_WIDTH}, {x: 0, y:BG_SIZE.y - BAR_WIDTH / 2});

        const CHAR_SCALE = 0.75;
        const CHAR_SIZE = {x: 450 * CHAR_SCALE, y: 600 * CHAR_SCALE};
        this.boy = new GameObject(assets.getAsset('boy'), CHAR_SIZE, {x: 0, y: GAME_HEIGHT - CHAR_SIZE.y});
        this.girl = new GameObject(assets.getAsset('girl'),CHAR_SIZE, {x: BG_SIZE.x - CHAR_SIZE.x, y:GAME_HEIGHT - CHAR_SIZE.y});
    
        const DZ_OUT_SIZE = { x: 500 , y: 500 };
        const DZ_OUT_POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - DZ_OUT_SIZE.x) / 2,
            y: BG_SIZE.y - DZ_OUT_SIZE.y
        };
        this.DZoutside = new GameObject(null, DZ_OUT_SIZE, DZ_OUT_POS);
        
        const DZ_IN_SIZE = { x: 470, y: 470 };
        const DZ_IN_POS = {
            x: DZ_OUT_POS.x + ((DZ_OUT_SIZE.x - DZ_IN_SIZE.x) / 2),
            y: DZ_OUT_POS.y + ((DZ_OUT_SIZE.y - DZ_IN_SIZE.y) / 2)
        };
        this.DZinside = new GameObject(null, DZ_IN_SIZE, DZ_IN_POS);
        this.DZbounds = {...this.DZoutside};

        const SUBMIT_SIZE = {x: 200, y:100 };
        const SUBMIT_POS = {
            x: (GAME_WIDTH - (GAME_WIDTH - BG_SIZE.x)) + ((GAME_WIDTH - BG_SIZE.x) - SUBMIT_SIZE.x) / 2,
            y: DZ_OUT_POS.y + DZ_OUT_SIZE.y + 50
        };
        this.submitButton = new GameObject(null, SUBMIT_SIZE, SUBMIT_POS);

        this.dialogueBox = new GameObject(null, {x: 500, y:225}, {x: 390, y: 800});
        this.dialogueBox.setColor('#f0b155');
        this.dialogueBox.setOutlineColor('black');
        this.dialogueBox.setOutlineWidth(8);
        this.dialogueBox.setRadius(90);

        this.purpleRect.setColor('purple');
        this.vertBar.setColor('black');
        this.horizBar.setColor('black');
        this.DZoutside.setColor('black');
        this.submitButton.setColor('green');

        this.submitButton.setRadius(10);
    }
    drawStaticElements(ctx){
        ctx.fillStyle = this.purpleRect.color;
        ctx.fillRect(this.purpleRect.pos.x, this.purpleRect.pos.y, this.purpleRect.size.x, this.purpleRect.size.y);

        ctx.drawImage(this.background.texture, this.background.pos.x,
             this.background.pos.y, this.background.size.x, this.background.size.y);

        ctx.fillStyle = this.vertBar.color;
        ctx.fillRect(this.vertBar.pos.x, this.vertBar.pos.y, this.vertBar.size.x, this.vertBar.size.y);
        ctx.fillRect(this.horizBar.pos.x, this.horizBar.pos.y, this.horizBar.size.x, this.horizBar.size.y);
        ctx.fillRect(this.DZoutside.pos.x, this.DZoutside.pos.y, this.DZoutside.size.x, this.DZoutside.size.y);

        ctx.fillStyle = this.DZinside.color;
        ctx.fillRect(this.DZinside.pos.x, this.DZinside.pos.y, this.DZinside.size.x, this.DZinside.size.y);

        ctx.drawImage(this.boy.texture, this.boy.pos.x, this.boy.pos.y, this.boy.size.x, this.boy.size.y);
        ctx.drawImage(this.girl.texture, this.girl.pos.x, this.girl.pos.y, this.girl.size.x, this.girl.size.y);

        ctx.fillStyle = this.submitButton.color;
        ctx.beginPath();
        ctx.roundRect(this.submitButton.pos.x, this.submitButton.pos.y, this.submitButton.size.x, this.submitButton.size.y, this.submitButton.radius);
        ctx.fill();

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

    initPossibleFoodSpawns(){
        this.foodSpawnPositions = [
            { x: 245, y: 140 },
            { x: 468, y: 140 },
            { x: 695, y: 145 },
            { x: 920, y: 142 },
            { x: 240, y: 375 },
            { x: 472, y: 380 },
            { x: 698, y: 378 },
            { x: 925, y: 380 }
        ];
    }

    initLevelDialogue(levelNum){
        switch(levelNum){
            case 1:
                this.levelOneDialogue();
                this.activeDialogue = this.level1.getQuestions();
            break;
            case 2:
                this.levelTwoDialogue();
                this.activeDialogue = this.level2.getQuestions();
            break;
            case 3:
                this.levelThreeDialogue();
                this.activeDialogue = this.level3.getQuestions();
            break;
            case 4:
                this.levelFourDialogue();
                this.activeDialogue = this.level4.getQuestions();
            break;
            case 5:
                this.levelFiveDialogue();
                this.activeDialogue = this.level5.getQuestions();
            break;
        }
    }



    levelOneDialogue(){
        let question = "How much Kuro would it take to buy the chocolate cake and the fruit bowl?";
        let answer = 25;
        this.level1.addQuestion(1, Speaker.BOY, question, answer);

        question = "How much Kuro would it take to buy the salad and the cupcakes?";
        answer = 16;
        this.level1.addQuestion(2, Speaker.GIRL, question, answer);

        question = "How much Kuro would it take to buy the salad and the cupcakes?";
        answer = 16;
        this.level1.addQuestion(3, Speaker.BOY, question, answer);
    }
    levelTwoDialogue(){
        
    }
    levelThreeDialogue(){
        
    }
    levelFourDialogue(){

    }
    levelFiveDialogue(){
        
    }
}