export class Dialogue{
    constructor(){
        this.font = 'Arial';
        this.fontSize = 0;
        this.fontColor = 'white';

        this.boundSize = null;
        this.boundPos = null;

        this.initial = {fontSize: 0, boundSize: null , boundPos: null};

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

        this.activeText = " ";
        this.cachedText = " ";
        this.activeAnswer = " ";
    }

    initFont(font, fontSize, fontColor){
            this.font = font;
            this.fontSize = fontSize;
            this.initial.fontSize = fontSize;
            this.fontColor = fontColor;
    }

    initBounds(boundSize, boundPos){
        this.boundSize = {...boundSize};
        this.boundPos = {...boundPos};

        this.initial.boundSize = {...boundSize};
        this.initial.boundPos = {...boundPos};
    }

    changeScale(scale){
        const minScale = Math.min(scale.x, scale.y);
        this.fontSize = this.initial.fontSize * minScale;
        this.boundSize = { x:this.initial.boundSize.x * scale.x, y: this.initial.boundSize.y * scale.y };
        this.boundPos = { x:this.initial.boundPos.x * scale.x, y: this.initial.boundPos.y * scale.y };
    }

   draw(ctx){
        ctx.fillStyle = this.fontColor || 'black';
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const lines = this.wrapText(ctx, this.activeText);
        this.drawWrappedText(ctx, lines);
    }

    wrapText(ctx, text){
        const maxWidth = this.boundSize.x;
        const words = text.split(' ');
        let line = '';
        let lines = [];
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + (line ? ' ' : '') + words[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth - 30 && i > 0) {
                lines.push(line);
                line = words[i];
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        return lines;
    }

    drawWrappedText(ctx, lines){
        const x = this.boundPos.x;
        const y = this.boundPos.y;
        const lineHeight = this.fontSize;
        
        const totalHeight = lines.length * lineHeight;

        let currentY = y - (totalHeight / 2) + (lineHeight / 2);
        
        lines.forEach(line => {
            ctx.fillText(line, x, currentY);
            currentY += lineHeight;
        });
    }

    initLevelOneQuestion(food1, food2, food3){
        if(food1 && food2){
            if(!food3){
                this.activeText = "I would like to buy a " + food1.name + " and a " + food2.name + ". How much will it cost?";
                this.activeAnswer = food1.value + food2.value;
            } else {
                this.activeText = "I would like to buy a " + food1.name + ", a " + food2.name + ", and a " + food3.name + ". How much will it cost?";
                this.activeAnswer = food1.value + food2.value + food3.value;
            }
        }
    }

    toggleKeyboardInputHelpMsg(){
        if(this.activeText !== this.instructional[0]){
            this.cachedMessage = this.activeText;
            this.activeText = this.instructional[0];
        } else {
            this.activeText = this.cachedMessage;
        }
    }
}