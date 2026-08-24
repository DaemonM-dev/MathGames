import { FoodItem } from "./fooditem.js"

export class Dialogue{
    constructor(size, pos){
        this.boundSize = size;
        this.boundPos = pos;

        this.initial = {boundSize: size, boundPos: pos};

        this.font = 'Arial';
        this.fontSize = 0;
        this.initialFontSize = 0;
        this.fontColor = 'white';

        this.levelNum = 1;
        this.questionNum = 1;

        this.activeFoodItems = [];

        this.instructional = [
            "Select the Kuro icon with your mouse to begin typing your answers!",
            "Try clicking and dragging the food items over to the large white box!"
        ];

        this.errors = [
            "Almost, try again!",
            "Close, but not quite!",
            "Oops, lets give it another shot!"
        ];

        this.success = [
            "Success!",
            "Great Job!",
            "Well Done!"
        ];

        this.activeQuestion = " ";
        this.activeAnswer = 0;

        this.cachedQuestion = " ";
    }

    setFont(font, size, color){
        this.font = font;
        this.fontSize = size;
        this.initialFontSize = size;
        this.fontColor = color;
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.fontSize = this.initialFontSize * minScale;
        this.boundPos = {x: this.initial.boundPos.x * scale.x, y:this.initial.boundPos.y * scale.y};
        this.boundSize = {x: this.initial.boundSize.x * scale.x, y:this.initial.boundSize.y * scale.y};
    }

    draw(ctx){
        ctx.fillStyle = this.fontColor || 'black';
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const textX = this.boundPos.x + this.boundSize.x / 2;
        const textY = this.boundPos.y + this.boundSize.y / 2;
        
        // Wrap the text
        const lineHeight = this.fontSize * 1.6;
        const lines = this.wrapText(ctx, this.activeQuestion, textX, textY, this.boundSize.x - 75, lineHeight);
        
        // Draw each line
        lines.forEach((line, i) => {
            const y = textY + (i - (lines.length - 1) / 2) * lineHeight;
            ctx.fillText(line.trim(), textX, y);
        });
    }

    newLevelOneQuestion(food1, food2, food3){
        if(food1 !== null && food2 !== null){
            if(food3 === null){
                this.activeQuestion = "I would like to buy a " + food1.name + " and a " + food2.name + ". How much will it cost?";
                this.activeAnswer = food1.value + food2.value;
            } else {
                this.activeQuestion = "I would like to buy a " + food1.name + ", a " + food2.name + ", and a " + food3.name + ". How much will it cost?";
                this.activeAnswer = food1.value + food2.value + food3.value;
            }
            console.log("New Lvl 1 Question: ", this.activeQuestion);
            console.log("New answer: ", this.activeAnswer)
        }
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lines = [];
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        return lines;
    }
}