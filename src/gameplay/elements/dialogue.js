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
        this.instructionalMsg = [
            "Select the Kuro icon with your mouse to begin typing your answers!",
            "Try clicking and dragging the food items over to the large white box!"
        ];


        this.activeText = "This is a new text with words of different sizes that I am using to test a hypothesis. ";
        this.cachedText = "";

        this.wrappingText = false;
        this.wordArray = [];
        this.lines = [];
    }

    changeScale(scale){
        this.scale = scale;
        this.fontSize = this.initial.fontSize * this.scale;
        this.bounds.pos = {x:this.bounds.pos.x * this.scale, y:this.bounds.pos.y * this.scale};
        this.bounds.size = {x:this.bounds.size.x * this.scale, y:this.bounds.size.y * this.scale};
        this.center = {x:this.initial.center.x * this.scale, y:this.initial.center.y * this.scale};
    }

    update(ctx){
        if(this.activeText !== this.cachedText || this.wrappingText){
            this.wrapText(ctx);
            this.wrappingText = false;
            this.cachedText = this.activeText;
        }
    }

    draw(ctx){
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
    this.wordArray = [];
    this.lines = [];
    ctx.font = `${this.fontSize}px PoppinsBold`;
    this.wordArray = this.activeText.split(' ');

    let line = '';
    for(let i = 0; i < this.wordArray.length; i++){
        let testLine = '';
        if(line === ''){
            testLine = this.wordArray[i];
        } else {
            testLine = line + ' ' + this.wordArray[i];
        }
        const testWidth = ctx.measureText(testLine).width;
        if(testWidth > this.bounds.size.x){
            this.lines.push(line);
            line = this.wordArray[i];
        } else {
            line = testLine;
        }
    }
    if(line !== ''){ this.lines.push(line); }
}


    setText(text){
        this.activeText = text;
        this.wrappingText = true;
    }
}