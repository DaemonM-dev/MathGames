export class Dialogue{
    constructor(){
        this.font = 'Arial';
        this.fontSize = 0;
        this.fontColor = 'white';

        this.pos = {x:0, y:0};

        this.maxSize = {x: 0, y: 0};
        this.lineSpacing = 1.8;
        this.minFontSize = 5;

        this.initial = {fontSize: 0, pos: {x:0, y:0}, maxSize: {x:0,y:0}, lineSpacing: 1.2, minFontSize: 5};

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
        this.activeAnswer = 0.0;
    }

    initFont(font, fontSize, lineSpacing, fontColor){
            this.font = font;
            this.fontSize = fontSize;
            this.lineSpacing = lineSpacing;
            this.initial.fontSize = fontSize;
            this.initial.lineSpacing = lineSpacing;
            this.fontColor = fontColor;
    }

    initBounds(pos, size, padding, minFontSize){
            this.pos = {...pos};
            this.maxSize = {x: size.x - padding, y: size.y - padding};
            this.minFontSize = minFontSize;

            this.initial.pos = {...pos};
            this.initial.maxSize = {...this.maxSize};
            this.initial.minFontSize = {...this.minFontSize};
    }

    changeScale(scale){

        this.pos = {x:this.initial.pos.x * scale.x, y:this.initial.pos.y * scale.y};
        this.maxSize = {x:this.initial.maxSize.x * scale.x , y: this.initial.maxSize.y * scale.y};

        const minScale = Math.min(scale.x, scale.y);
        this.fontSize = this.initial.fontSize * minScale;
        this.minFontSize = this.initial.minFontSize * minScale;
    }

   draw(ctx){
        ctx.fillStyle = this.fontColor || 'black';
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const lines = this.wrapText(ctx, this.activeText);
        this.drawWrappedText(ctx, lines);
    }

    wrapText(ctx, text) {
        const words = text.split(' ');
        let currentLine = '';
        let lines = [];
        
        for (let word of words) {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const testWidth = ctx.measureText(testLine).width;
            
            if (testWidth > this.maxSize.x && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    }


    drawWrappedText(ctx, lines){
        const x = this.pos.x;
        const y = this.pos.y;
        const lineHeight = this.fontSize * this.lineSpacing;
        
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
                this.activeText = "I would like to buy " + food1.name + " and " + food2.name + ". How much will it cost?";
                this.activeAnswer = food1.value + food2.value;
            } else {
                this.activeText = "I would like to buy " + food1.name + ", " + food2.name + ", and " + food3.name + ". How much will it cost?";
                this.activeAnswer = food1.value + food2.value + food3.value;
            }
        }
    }

    getNewAnswer(){
        console.log("Active Answer: ", this.activeAnswer);
        return this.activeAnswer;
    }

    toggleKeyboardInputHelpMsg(level){

        let index = 0;

        switch(level){
            case 1:
            case 3:
            case 4:
                index = 0;
                break;
            case 2:
            case 5:
                index = 1;
                break;
        }

        if(this.activeText !== this.instructional[index]){
            this.cachedMessage = this.activeText;
            this.activeText = this.instructional[index];
        } else {
            this.activeText = this.cachedMessage;
        }
    }
}