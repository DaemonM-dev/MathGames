import { getRandomInt, getRandomFloat } from '../../globals.js'

export class Dialogue{
    constructor(){
        this.scale = {x:1.0, y:1.0};
        this.font = 'Arial';
        this.fontSize = 0;
        this.fontColor = 'white';
        this.pos = {x:0, y:0};
        this.maxSize = {x: 0, y: 0};
        this.lineSpacing = 1.8;
        this.minFontSize = 5;
        this.initial = {fontSize: 0, pos: {x:0, y:0}, maxSize: {x:0,y:0}, lineSpacing: 1.2, minFontSize: 5};

        this.mathProblem = "";
        this.mathVisible = false;

        this.activeText = "";
        this.cachedText = "";
        this.activeAnswer = 0.0;
        this.startingKuro = 0;

        this.instructionIndex = 0;
        this.instructional = [
            "Select the Kuro icon with your mouse to begin typing your answers!",
            "Try clicking and dragging the food items over to the large white box!"
        ];
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
        this.scale = scale;
        this.pos = {x:this.initial.pos.x * scale.x, y:this.initial.pos.y * scale.y};
        this.maxSize = {x:this.initial.maxSize.x * scale.x , y: this.initial.maxSize.y * scale.y};
        const minScale = Math.min(scale.x, scale.y);
        this.fontSize = this.initial.fontSize * minScale;
        this.minFontSize = this.initial.minFontSize * minScale;
    }

    draw(ctx){
        ctx.fillStyle = this.fontColor || 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if(this.mathVisible){
            const FS = this.fontSize * 1.5;
            ctx.font = `${FS}px ${this.font}`;
            ctx.fillText(this.mathProblem, 1600 * this.scale.x, 675 * this.scale.y);
        }

        ctx.font = `${this.fontSize}px ${this.font}`;

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
        const lineHeight = this.fontSize * this.lineSpacing;
        const totalHeight = lines.length * lineHeight;
        let currentY = this.pos.y - (totalHeight / 2) + (lineHeight / 2);
        lines.forEach(line => {
            ctx.fillText(line, this.pos.x, currentY);
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
    initLevelTwoQuestion(value1, value2, value3){
        let sum = 0;
        if(value3 === 0){
            sum = value1 + value2;
            this.activeText = "I have " + sum + " KURO to buy food. What TWO items can I get with ZERO KURO left over?";
        } else {
            sum = value1 + value2 + value3;
            this.activeText = "I have " + sum + " KURO to buy food. What THREE items can I get with ZERO KURO left over?";
        }
        this.activeAnswer = sum;
    }
    initLevelThreeQuestion(food1, food2, food3){
        let inc = getRandomInt(1, 3);
        switch(inc){
            case 1: inc = 0.25; break;
            case 2: inc = 0.5; break;
            case 3: inc = 0.75; break;
        }
        let min = 0;
        let max = 0;
        if(food1 && food2){
            if(!food3){
                min = food1.value + food2.value;
            } else {
                min = food1.value + food2.value + food3.value;
            }
        }
        max = min + 10;
        this.startingKuro = getRandomInt(min, max) + inc;

        this.activeAnswer = this.startingKuro - min;
        this.activeText = "I have " + this.startingKuro + " KURO. How much will I have remaining after buying these food items?"
    }
    initLevelFourQuestion(food, total){
        const MSG = getRandomInt(1, 3);
        let start = "";
        let middle = "";
        let count = "";
        let name = "";

        switch(total){
            case 2: count = "TWO ";     break;
            case 3: count = "THREE ";   break;
            case 4: count = "FOUR ";    break;
            case 5: count = "FIVE ";    break;
            case 6: count = "SIX ";     break;
        }
        switch(food.name){
            case "the slice of Chocolate Cake":     name = "slices of Chocolate Cake";  break;
            case "the Cupcakes":                    name = "bundles of Cupcakes";       break;
            case "the Fruit Bowl":                  name = "bowls of Fruit";            break;
            case "the slice of Fruit Cake":         name = "slices of Fruit Cake";      break;
            case "the slice of Matcha Cake":        name = "slices of Matcha Cake";     break;
            case "the Rice Cakes":                  name = "bundles of Rice Cakes";     break;
            case "the Salad":                       name = "bowls of Salad";            break;
            case "the Tofu":                        name = "plates of Tofu";            break;
        }

        switch(MSG){
            case 1:
                start = "Let's purchase some food for a picnic! ";
                middle = "How much will it cost to buy ";
                break;
            case 2:
                start = "The food here looks delicious, let's get enough for everyone! ";
                middle = "How much for ";
                break;
            case 3:
                start = "Lets get food for an event! ";
                middle = "How much will we spend on "
                break;
        }
        this.activeText = start + middle + count + name;
        this.mathProblem = food.value + " x " + total + " = ";
    }
    initLevelFiveQuestion(discount, line1, line2, foods){
        // discount = percentage discout and a decimal value (ie. 0.25, 0.5, 0.75)
        // line1 = percentage discount as a string (ie. "25%", "50%", "75%")
        // line2 = what that percentage applies to (ie. "Healthy Items", "Sweet Items", "All Items!")
        // foods = two or three randomly selected food items
        let sumBeforeDiscount = 0;
        let sumAfterDiscount = 0;
        let healthyItems = 0;
        let sweetItems = 0;

        for(let i = 0; i < foods.length; i++){
            sumBeforeDiscount = sumBeforeDiscount + foods[i].value;
            switch(line2){
                case "Healthy Items":
                    if(foods[i].type === 'Healthy'){
                        sumAfterDiscount = sumAfterDiscount + (foods[i].value - (foods[i].value * discount));
                    }
                break;
                case "Sweet Items":
                    if(foods[i].type === 'Sweet'){
                        sumAfterDiscount = sumAfterDiscount + (foods[i].value - (foods[i].value * discount));
                    }
                break;
                case "All Items":
                    sumAfterDiscount = sumAfterDiscount + foods[i].value - (foods[i].value * discount);
                    break;
            }
        }

        this.startingKuro = sumAfterDiscount;
        this.activeAnswer = sumBeforeDiscount;
        console.log("Sum BEFORE discount: ", sumBeforeDiscount )
        console.log("Sum AFTER discount: ", sumAfterDiscount );


        // Message generation
        this.activeText = "We have " + this.startingKuro + " KURO. There is a " + line1 + " discount on " + line2 + ". ";

        if(healthyItems === 0 && sweetItems === 0){
            let FOODCOUNT = "";
            if(foods.length === 2){FOODCOUNT = "TWO";}
            else{FOODCOUNT = "THREE";}
            this.activeText += "What " + FOODCOUNT + " Food items can I get without having any change left over?";




        } else if(healthyItems > 0 && sweetItems === 0 || healthyItems === 0 && sweetItems > 0){
            let FOODCOUNT = "";
            if(foods.length === 2){FOODCOUNT = "TWO";}
            else{FOODCOUNT = "THREE";}
            if(healthyItems !== 0){
                this.activeText += "What " + FOODCOUNT + " SWEET items can I get without having any change left over?";
            } else if (sweetItems !== 0){
                this.activeText += "What " + FOODCOUNT + " HEALTHY items can I get without having any change left over?";
            }




        } else {
            let hc = ""; // Healthy count as string
            let sc = ""; // Sweet count as string
            switch(healthyItems){case 1: hc = "ONE"; break; case 2: hc = "TWO"; break; case 3: hc = "THREE"; break;}
            switch(sweetItems){case 1: sc = "ONE"; break; case 2: sc = "TWO"; break; case 3: sc = "THREE"; break;}

            this.activeText += "What " + hc + " HEALTHY item"; if(healthyItems !== 1){this.activeText += "s"};
            this.activeText += " and what " + sc + " SWEET item"; if(sweetItems !== 1){this.activeText += "s"};
            this.activeText += " can I get without having any change left over?";
        }

    }
    getNewAnswer(){
        return this.activeAnswer;
    }

    setHelpMessage(level){
        switch(level){
            case 1: case 3: case 4: this.instructionIndex = 0; break;
            case 2: case 5:         this.instructionIndex = 1; break;
        }
    }
    toggleInputHelpMsg(){
        if(this.activeText !== this.instructional[this.instructionIndex]){
            this.cachedText = this.activeText;
            this.activeText = this.instructional[this.instructionIndex];
        } else {
            this.activeText = this.cachedText;
        }
    }
}