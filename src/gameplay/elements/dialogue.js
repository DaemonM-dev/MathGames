export class Dialogue{
    constructor(){
        this.font = 'Arial';
        this.fontSize = 0;
        this.fontColor = 'white';

        this.maxLength = 0;
        this.boundSize = null;
        this.boundPos = null;

        this.initial = {fontSize: 0, maxLength: 0, boundSize: null , boundPos: null};

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

        this.activeText = "Chicka Chicka boom BOOM";
        this.activeAnswer = " ";
    }

    initFont(font, fontSize, fontColor){
            this.font = font;
            this.fontSize = fontSize;
            this.initial.fontSize = fontSize;
            this.fontColor = fontColor;
    }

    initBounds(maxLength, boundSize, boundPos){
        this.maxLength = maxLength;
        this.boundSize = {...boundSize};
        this.boundPos = {...boundPos};

        this.initial.maxLength = maxLength;
        this.initial.boundSize = {...boundSize};
        this.initial.boundPos = {...boundPos};
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.fontSize = this.initial.fontSize * minScale;
        this.maxLength = this.initial.maxLength * minScale;
        this.boundSize = { x:this.initial.boundSize.x * scale.x, y: this.initial.boundSize.y * scale.y };
        this.boundPos = { x:this.initial.boundPos.x * scale.x, y: this.initial.boundPos.y * scale.y };

        console.log("Font Size:",this.fontSize);
        console.log("Max Length:",this.maxLength);
        console.log("BoundSize:",this.boundSize);
        console.log("BoundPos:",this.boundPos);
    }


    draw(ctx){
        ctx.fillStyle = this.fontColor || 'black';
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(this.activeText, this.boundPos.x, this.boundPos.y, this.maxLength);
    }
}