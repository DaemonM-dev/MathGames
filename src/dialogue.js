export class Dialogue{
    constructor(fontSize, pos, padding, maxWidth){
        this.scale = { x: 1.0, y: 1.0 };
       
        this.level_1_text = [];
        /*
        this.level_2_text = [];
        this.level_3_text = [];
        this.level_4_text = [];
        this.level_5_text = [];
        this.level_6_text = [];
        this.level_7_text = [];
        this.level_8_text = [];
        this.level_9_text = [];
        this.level_10_text = [];
        */

        this.activeLevel = 1;
        this.activeText = null;
        this.currentMessageIndex = 0;

        this.font = 'Arial';
        this.color = 'black';
        this.fontSize = fontSize;
        this.initialFontSize = fontSize;
        this.maxWidth = maxWidth;
        this.initialMaxWidth = {...maxWidth};

        this.pos = pos;
        this.initialPos = {...pos};

        this.padding = padding;
        this.initialPadding = padding;

        this.initText();
    }

    initText(){
        this.initLevelOneText();
        /*
        initLevelTwoText();
        initLevelThreeText();
        initLevelFourText();
        initLevelFiveText();
        initLevelSixText();
        initLevelSevenText();
        initLevelEightText();
        initLevelNineText();
        initLevelTenText();
        */

        this.activeText = this.level_1_text[this.currentMessageIndex];
    }

    update(scale, deltaTime){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;
            this.changeScale(this.scale);
        }
    }

    draw(ctx){
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.activeText, this.pos.x + this.padding, this.pos.y + this.padding, this.maxWidth);
    }

    changeScale(scale){
        const newScale = Math.min(scale.x, scale.y);
        this.fontSize = this.initialFontSize * newScale;
        this.padding = this.initialPadding * newScale;
        this.pos = {x: this.initialPos.x * scale.x, y: this.initialPos.x * scale.y};
    }

    initLevelOneText(){
        this.level_1_text.push("Welcome to the Game!!");
        this.level_1_text.push("I would like to buy some fruit.");
        this.level_1_text.push("Make sure you have enough money!");
    }
}