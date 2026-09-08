import { getRandomInt, getRandomFloat } from '../../globals.js'

export class Dialogue{
    constructor(bounds){
        this.scale = 1.0;

        this.fontSize = 20;
        this.bounds = {...bounds};
        this.center = {
            x: bounds.pos.x + (bounds.size.x / 2),
            y: bounds.pos.y + (bounds.size.y / 2)
        };
        this.initial = {fontSize: 50, bounds: {...bounds}, center: {...this.center}};

        this.activeText = "Sample Text";
        this.cachedText = "";
        this.activeAnswer = 0.0;
        this.mathProblem = "";
        this.viewingMathProblem = false;
        this.instructionIndex = 0;
        this.instructionalMsg = [
            "Select the Kuro icon with your mouse to begin typing your answers!",
            "Try clicking and dragging the food items over to the large white box!"
        ];
    }

    changeScale(scale){
        this.scale = scale;
        this.fontSize = this.initial.fontSize * this.scale;
        this.bounds.pos = {x:this.bounds.pos.x * this.scale, y:this.bounds.pos.y * this.scale};
        this.bounds.size = {x:this.bounds.size.x * this.scale, y:this.bounds.size.y * this.scale};
        this.center = {x:this.initial.center.x * this.scale, y:this.initial.center.y * this.scale};
    }

    draw(ctx){
        ctx.font = `${this.fontSize}px ${'PoppinsBold'}`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.activeText, this.center.x, this.center.y);
    }
}