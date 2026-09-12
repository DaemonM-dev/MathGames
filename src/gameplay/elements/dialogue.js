import { getRandomInt, getRandomFloat } from '../../globals.js'

export class Dialogue{
    constructor(bounds){
        this.scale = 1.0;

        this.fontSize = 30;
        this.bounds = {...bounds};
        this.center = {
            x: bounds.pos.x + (bounds.size.x / 2),
            y: bounds.pos.y + (bounds.size.y / 2)
        };
        this.initial = {fontSize: this.fontSize, bounds: {...bounds}, center: {...this.center}};

        this.instructionIndex = 0;
        this.instructionMsg = [
            "Select the Kuro icon with your mouse to begin typing your answers!",
            "Try clicking and dragging the food items over to the large white box!"
        ];

        this.activeText = "This is a new text with words of different sizes that I am using to test a hypothesis. ";
        this.cachedText = "";

        this.wordArray = [];
        this.lines = [];

        this.fontReady = false;
        this.wrappingText = true;

        document.fonts.load(`${this.fontSize}px PoppinsBold`).finally(() => {
            this.fontReady = true;
            this.wrappingText = true;
        });

        this.answer = -1;
        this.foodCount = -1;
        this.startingKuro = -1;
    }

    changeScale(scale){
        this.scale = scale;
        this.fontSize = this.initial.fontSize * this.scale;
        this.bounds.pos = {x:this.initial.bounds.pos.x * this.scale, y:this.initial.bounds.pos.y * this.scale};
        this.bounds.size = {x:this.initial.bounds.size.x * this.scale, y:this.initial.bounds.size.y * this.scale};
        this.center = {x:this.initial.center.x * this.scale, y:this.initial.center.y * this.scale};
        this.wrappingText = true;
    }

    update(ctx){
        if(this.wrappingText && this.fontReady){
            this.wrapText(ctx);
            this.wrappingText = false;
        }
    }

    draw(ctx){
        if(!this.fontReady) return;
        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lineHeight = this.fontSize * 1.4;
        const totalHeight = this.lines.length * lineHeight;
        const startY = this.center.y - totalHeight / 2 + lineHeight / 2;

        for(let i = 0; i < this.lines.length; i++){
            const yPos = startY + i * lineHeight;
            ctx.fillText(this.lines[i], this.center.x, yPos);
        }
    }

    wrapText(ctx){
        const minFontSize = 10;
        let fontSize = Math.max(this.initial.fontSize * this.scale, minFontSize);
        let lines = [];

        for(fontSize; fontSize >= minFontSize; fontSize--){
            ctx.font = `${fontSize}px PoppinsBold`;
            lines = this.splitIntoLines(ctx, this.activeText, this.bounds.size.x);

            const lineHeight = fontSize * 1.4;
            const totalHeight = lines.length * lineHeight;

            if(totalHeight <= this.bounds.size.y){
                break;
            }
        }

        this.fontSize = fontSize;
        this.lines = lines;
    }

    splitIntoLines(ctx, text, maxWidth){
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for(const word of words){
            const testLine = line === '' ? word : `${line} ${word}`;
            if(ctx.measureText(testLine).width > maxWidth && line !== ''){
                lines.push(line);
                line = word;
            } else {
                line = testLine;
            }
        }
        if(line !== ''){ lines.push(line); }
        return lines;
    }

    toggleInstruction(level){
        switch(level){
            case 1: case 3: case 5: this.instructionIndex = 0; break;
            case 2: case 5: this.instructionIndex = 1; break;
        }
        if(this.activeText !== this.instructionMsg[this.instructionIndex]){
            this.cachedText = this.activeText;
            this.activeText = this.instructionMsg[this.instructionIndex];
        } else {
            this.activeText = this.cachedText;
        }
        this.wrappingText = true;
    }

    setText(text){
        this.activeText = text;
        this.wrappingText = true;
    }

    getAnswer(){
        return this.answer;
    }

    getAnswerFoodCount(){
        return this.foodCount;
    }

    initLvlOneQuestion(copies){
        this.answer = -1;
        if(!copies || copies.length < 2) {return;}
        const food1 = copies[0];
        const food2 = copies[1];
        const food3 = copies[2];
        
        if(food1 && food2){
            if(!food3){
                this.activeText = "I would like to buy " + food1.name + " and " + food2.name + ". How much will it cost?";
                this.answer = food1.value + food2.value;
            } else {
                this.activeText = "I would like to buy " + food1.name + ", " + food2.name + ", and " + food3.name + ". How much will it cost?";
                this.answer = food1.value + food2.value + food3.value;
            }
        }
    }

    initLvlTwoQuestion(copies){
        this.answer = -1;
        this.foodCount = -1;
        if(!copies || copies.length < 2) {return;}
        let value1 = 0;
        let value2 = 0;
        let value3 = 0;
        if(copies[0]){value1 = copies[0].value;}
        if(copies[1]){value2 = copies[1].value;}
        if(copies[2]){value3 = copies[2].value;}
        for(let i = 0; i < copies.length; i++){
            console.log(copies[i].name);
        }
        let sum = 0;
        if(value3 === 0){
            sum = value1 + value2;
            this.foodCount = 2;
            this.activeText = "I have " + sum + " KURO to buy food. What TWO items can I get with ZERO KURO left over?";
        } else {
            sum = value1 + value2 + value3;
            this.foodCount = 3;
            this.activeText = "I have " + sum + " KURO to buy food. What THREE items can I get with ZERO KURO left over?";
        }
        this.answer = sum;
    }

    initLvlThreeQuestion(copies){
        this.startingKuro = -1;
        this.answer = -1;

        let max = 0;
        let min = 0;
        let inc = 0;

        const food1 = copies[0];
        const food2 = copies[1];
        const food3 = copies[2];

        switch(getRandomInt(1, 3)){
            case 1: inc = 0.25; break;
            case 2: inc = 0.50; break;
            case 3: inc = 0.75; break;
        }
        
        if(food1 && food2){
            if(!food3){
                min = food1.value + food2.value;
            } else {
                min = food1.value + food2.value + food3.value;
            }
        }

        max = min + 10;
        this.startingKuro = getRandomInt(min, max) + inc;
        this.answer = this.startingKuro - min;

        let zero = "";
        if(inc === 0.50){
            zero = "0";
        }

        this.activeText = "I have " + this.startingKuro + zero + " KURO. How much will I have remaining after buying these food items?";
    }
}