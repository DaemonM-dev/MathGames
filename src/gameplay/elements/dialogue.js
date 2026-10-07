import { getRandomInt } from '../../globals.js'
import { Language }     from '../../enums/language.js'
import { Difficulty }   from '../../enums/difficulty.js'
import { Game }         from '../../game.js'

export class Dialogue{
    constructor(bounds, language){
        this.scale      = 1.0;
        this.language   = language;
        this.fontSize   = 30;
        this.bounds     = {...bounds};
        this.center     = {
            x: bounds.pos.x + (bounds.size.x / 2),
            y: bounds.pos.y + (bounds.size.y / 2)
        };
        this.initial    = {
            fontSize: this.fontSize, 
            bounds: {...bounds}, 
            center: {...this.center}
        };

        this.instructionIndex   = 0;

        switch(this.language)
        {
            case Language.ENGLISH:
                this.instructionMsg = [
                    "Select the Kuro icon with your mouse to begin typing your answers!",
                    "Try clicking and dragging the food items over to the large white box!"
                ];
                break;
            case Language.IRISH:
                this.instructionMsg = [
                    "Roghnaigh an deilbhín Kuro le do luch chun tús a chur le clóscríobh do chuid freagraí!",
                    "Bain triail as cliceáil agus tarraing na míreanna bia anonn go dtí an bosca mór bán!"
                ];
                break;
        }

        this.activeText = "NaN";
        this.cachedText = "";

        this.wordArray  = [];
        this.lines      = [];

        this.fontReady      = false;
        this.wrappingText   = true;

        document.fonts.load(`${this.fontSize}px PoppinsBold`).finally(() => {
            this.fontReady = true;
            this.wrappingText = true;
        });

        this.answer         = 0;
        this.foodCount      = 0;
        this.startingKuro   = 0;
        this.mathProblem    = "";
        this.foodTypes      = {healthy: 0, sweet: 0};

        // Returnable answer parameters
        this.ANSWER     = 0;
        this.FOOD_COUNT = 0;
        this.FOOD_SUM   = 0;
        this.START_KURO = 0;
        this.FOOD_TYPES = {healthy: 0, sweet: 0};
    }

    changeScale(scale){
        this.scale          = scale;
        this.fontSize       = this.initial.fontSize * this.scale;
        this.bounds.pos     = {x:this.initial.bounds.pos.x * this.scale, y:this.initial.bounds.pos.y * this.scale};
        this.bounds.size    = {x:this.initial.bounds.size.x * this.scale, y:this.initial.bounds.size.y * this.scale};
        this.center         = {x:this.initial.center.x * this.scale, y:this.initial.center.y * this.scale};
        this.wrappingText   = true;
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
            case 1: case 3: case 4: this.instructionIndex = 0; break;
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

    initLvlOneQuestion(copies)
    {
        if(!copies || copies.length < 2) 
        {
            return;
        }
        this.FOOD_SUM = 0;

        for(let i = 0; i < copies.length; i++)
        {
            if(copies[i])
            {
                this.FOOD_SUM = this.FOOD_SUM + copies[i].value;
            }
        }
        
        if(copies[0] && copies[1])
        {
            switch(this.language)
            {
                case Language.ENGLISH:
                    if(!copies[2])
                    {
                        this.activeText = "I would like to buy " + copies[0].name + " and " + copies[1].name + ". How much will it cost?";
                    } 
                    else 
                    {
                        this.activeText = "I would like to buy " + copies[0].name + ", " + copies[1].name + ", and " + copies[2].name + ". How much will it cost?";
                    }
                    break;
                case Language.IRISH:
                    if(!copies[2])
                    {
                        this.activeText = "Ba mhaith liom " + copies[0].name + " agus " + copies[1].name + ". Cé mhéad a chosnóidh sé?";
                    } 
                    else 
                    {
                        this.activeText = "Ba mhaith liom " + copies[0].name + ", " + copies[1].name + ", agus " + copies[2].name + ". Cé mhéad a chosnóidh sé?";
                    }
                    break;
            }
        }
        console.log("Correct Answer: FOOD_SUM =", this.FOOD_SUM);
    }

    initLvlTwoQuestion(copies)
    {
        if(!copies || copies.length < 2)
        {
            return;
        }

        this.FOOD_COUNT = 0;
        this.FOOD_SUM = 0;

        for(let i = 0; i < copies.length; i++)
        {
            if(copies[i])
            {
                this.FOOD_COUNT++;
                this.FOOD_SUM = this.FOOD_SUM + copies[i].value;
            }
        }

        let zero = "";
        if(this.FOOD_SUM % 1 === 0.50)
        {
            zero = "0";
        } 
        else if(this.FOOD_SUM % 1 === 0.00)
        {
            zero = ".00";
        } 



        if(copies[0] && copies[1])
        {
            switch(this.language)
            {
                case Language.ENGLISH:
                    if(!copies[2])
                    {
                        this.activeText = "I have " + this.FOOD_SUM + zero + " KURO to buy food. What TWO items can I get with ZERO KURO left over?";
                    }
                    else
                    {
                        this.activeText = "I have " + this.FOOD_SUM + zero + " KURO to buy food. What THREE items can I get with ZERO KURO left over?";
                    }
                    break;
                case Language.IRISH:
                    if(!copies[2])
                    {
                        this.activeText = "Tá " + this.FOOD_SUM + zero + " KURO agam chun bia a cheannach. Cén DÁ rud is féidir liom a cheannach gan KURO ar bith a bheith fágtha agam?";
                    }
                    else
                    {
                        this.activeText = "Tá " + this.FOOD_SUM + zero + " KURO agam chun bia a cheannach. Cé na TRÍ rud is féidir liom a cheannach gan KURO ar bith a bheith fágtha agam?";
                    }
                    break;
            }
        }
        console.log("Correct Answer: FOOD_COUNT =", this.FOOD_COUNT);
        console.log("Correct Answer: FOOD_SUM =", this.FOOD_SUM);
    }

    initLvlThreeQuestion(copies)
    {
        if(!copies || copies.length < 2)
        {
            return;
        }

        this.ANSWER = 0;
        this.START_KURO = 0;
        this.FOOD_SUM = 0;

        let max = 0;
        let inc = 0;

        for(let i = 0; i < copies.length; i++)
        {
            if(copies[i])
            {
                this.FOOD_SUM = this.FOOD_SUM + copies[i].value;
            }
        }

        switch(getRandomInt(1, 3))
        {
            case 1: inc = 0.25; break;
            case 2: inc = 0.50; break;
            case 3: inc = 0.75; break;
        }
        
        if(copies[0] && copies[1])
        {
            if(!copies[2])
            {
                this.FOOD_SUM = copies[0].value + copies[1].value;
            } 
            else
            {
                this.FOOD_SUM = copies[0].value + copies[1].value + copies[2].value;
            }
        }

        max = this.FOOD_SUM + 10;

        this.START_KURO = getRandomInt(this.FOOD_SUM, max) + inc;
        this.ANSWER = this.START_KURO - this.FOOD_SUM;

        let zero = "";
        if(this.START_KURO % 1 === 0.50)
        {
            zero = "0";
        }
        else if(this.START_KURO % 1 === 0.00)
        {
            zero = ".00";
        }

        switch(this.language)
        {
            case Language.ENGLISH:
                this.activeText = "I have " + this.START_KURO + zero + " KURO. How much will I have remaining after buying these food items?";
                break;
            case Language.IRISH:
                this.activeText = "Tá  " + this.START_KURO + zero + " KURO agam. Cé mhéad KURO a bheidh fágtha agam tar éis dom na hearraí bia seo a cheannach?";
                break;
        }
        console.log("Correct Answer: ANSWER =", this.ANSWER);
    }

    initLvlFourQuestion(duplicates)
    {
        if(!duplicates || duplicates.length < 2 || duplicates.length > 6)
        {
            return;
        }

        this.FOOD_SUM = 0;

        let count   = "";
        let name    = "";
        let start   = "";
        let middle  = "";
        let end     = "";

        for(let i = 0; i < duplicates.length; i++)
        {
            this.FOOD_SUM = this.FOOD_SUM + duplicates[i].value;
        }

        if(this.language === Language.ENGLISH)
        {
            switch(duplicates.length)
            {
                case 2: count = "TWO ";     break;
                case 3: count = "THREE ";   break;
                case 4: count = "FOUR ";    break;
                case 5: count = "FIVE ";    break;
                case 6: count = "SIX ";     break;
            }

            switch(duplicates[0].name){
                case "the slice of Chocolate Cake":     name = "slices of Chocolate Cake";  break;
                case "the Cupcakes":                    name = "bundles of Cupcakes";       break;
                case "the Fruit Bowl":                  name = "bowls of Fruit";            break;
                case "the slice of Fruit Cake":         name = "slices of Fruit Cake";      break;
                case "the slice of Matcha Cake":        name = "slices of Matcha Cake";     break;
                case "the Rice Cakes":                  name = "bundles of Rice Cakes";     break;
                case "the Salad":                       name = "bowls of Salad";            break;
                case "the Tofu":                        name = "plates of Tofu";            break;
            }

            switch(getRandomInt(1,3)){
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

            this.activeText = start + middle + count + name + "?";
        }
        else if (this.language === Language.IRISH)
        {
            switch(duplicates.length)
            {
                /*
                case 2: count = "dó ";          break;
                case 3: count = "trí ";         break;
                case 4: count = "ceathair ";    break;
                case 5: count = "cúig ";        break;
                case 6: count = "sé ";          break;
                */

                case 2: count = "2 ";   break;
                case 3: count = "3 ";   break;
                case 4: count = "4 ";   break;
                case 5: count = "5 ";   break;
                case 6: count = "6 ";   break;
            }

            switch(duplicates[0].name){
                case "slisne cáca seacláide":   name = "slisíní cáca seacláide";    break;
                case "cácaí beaga":             name = "trádairí cácaí beaga";      break;
                case "babhla torthaí":          name = "babhlaí torthaí ";          break;
                case "slisne cáca torthaí":     name = "slisíní cáca torthaí";      break;
                case "slisne cáca matcha":      name = "slisíní cáca Matcha";       break;
                case "cácaí ríse":              name = "bearta cácaí ríse";         break;
                case "an sailéad":              name = "babhlaí sailéid";           break;
                case "an tófú":                 name = "plátaí tofu";               break;
            }

            switch(getRandomInt(1,3)){
                case 1:
                    start   = "Ceannóimid bia don phicnic! ";
                    middle  = "Cé mhéad a chosnóidh sé chun ";
                    end     = " a cheannach";
                    break;
                case 2:
                    start = "Tá cuma an–bhlasta ar an mbia anseo. Ceannóimid go leor do gach duine! ";
                    middle = "Cé mhéad atá ar  ";
                    break;
                case 3:
                    start = "Ceannóimid bia d’ócáid! ";
                    middle = "Cé mhéad a chaithfimid ar "
                    break;
            }
            this.activeText = start + middle + count + name + end + "?";
        }
        this.mathProblem = duplicates[0].value + " x " + duplicates.length + " = ";
        console.log("Correct Answer: FOOD_SUM =", this.FOOD_SUM);
    }

    initLvlFiveQuestion(coupon, copies)
    {
        if(!coupon || !copies)
        {
            return;
        }

        this.START_KURO = 0;
        this.FOOD_COUNT = 0;
        this.FOOD_SUM = 0;
        this.FOOD_TYPES = {healthy: 0, sweet: 0};

        const DISCOUNT = coupon.discount;
        const DISCOUNT_STR = coupon.line1;
        const TYPE_STR = coupon.line2;
        let sumAfterDiscount = 0;
        let healthyCountString = "";
        let sweetCountString = "";

        this.FOOD_COUNT = copies.length;

        if(this.language === Language.ENGLISH)
        {
            for(let i = 0; i < copies.length; i++)
            {
                this.FOOD_SUM = this.FOOD_SUM + copies[i].value;
                switch(TYPE_STR)
                {
                    case "All Items":
                        sumAfterDiscount = sumAfterDiscount + (copies[i].value - (copies[i].value * DISCOUNT));
                        switch(copies[i].type)
                        {
                            case 'Healthy':
                                this.FOOD_TYPES.healthy++;
                            break;
                            case 'Sweet':
                                this.FOOD_TYPES.sweet++;
                            break;
                        }
                    break;
                    case "Healthy Items":
                        switch(copies[i].type)
                        {
                            case 'Healthy':
                                sumAfterDiscount = sumAfterDiscount + (copies[i].value - (copies[i].value * DISCOUNT));
                                this.FOOD_TYPES.healthy++;
                            break;
                            case 'Sweet':
                                sumAfterDiscount = sumAfterDiscount + copies[i].value;
                                this.FOOD_TYPES.sweet++;
                            break;
                        }
                    break;
                    case "Sweet Items":
                        switch(copies[i].type)
                        {
                            case 'Healthy':
                                sumAfterDiscount = sumAfterDiscount + copies[i].value;
                                this.FOOD_TYPES.healthy++;
                            break;
                            case 'Sweet':
                                sumAfterDiscount = sumAfterDiscount + (copies[i].value - (copies[i].value * DISCOUNT));
                                this.FOOD_TYPES.sweet++;
                            break;
                        }
                    break;
                }
            }

            this.START_KURO = sumAfterDiscount;

            let zero = "";
            if(sumAfterDiscount - Math.floor(sumAfterDiscount) > 0)
            {
                zero = "0";
            }
            else if(sumAfterDiscount - Math.floor(sumAfterDiscount) === 0)
            {
                zero = ".00";
            }

            this.activeText = "We have " + this.START_KURO + zero + " KURO. There is a " + DISCOUNT_STR + " discount on " + TYPE_STR + ". ";
            switch (this.FOOD_TYPES.healthy){
                case 1: healthyCountString = "ONE";     break;
                case 2: healthyCountString = "TWO";     break;
                case 3: healthyCountString = "THREE";   break;
            }
            switch (this.FOOD_TYPES.sweet){
                case 1: sweetCountString = "ONE";   break;
                case 2: sweetCountString = "TWO";   break;
                case 3: sweetCountString = "THREE"; break;
            }

            if(Game.gameplay.difficulty === Difficulty.REGULAR)
            {
                let count_str = "";
                if(this.FOOD_COUNT === 2)
                {
                    count_str = "TWO";
                }
                else if(this.FOOD_COUNT === 3)
                {
                    count_str = "THREE";
                }
                this.activeText += "What " + count_str + " foods can I purchase and have no change left over?";
            }
            else if(Game.gameplay.difficulty === Difficulty.CHALLENGE)
            {
                if(this.FOOD_TYPES.healthy > 0 && this.FOOD_TYPES.sweet > 0){
                    this.activeText += "What " + healthyCountString + " HEALTHY food"; if(this.FOOD_TYPES.healthy > 1){this.activeText += "s";}
                    this.activeText += " and what " + sweetCountString + " SWEET food"; if(this.FOOD_TYPES.sweet > 1){this.activeText += "s";}
                    this.activeText += " can I purchase and have no change left over?";
                } else if (this.FOOD_TYPES.healthy > 0){
                    this.activeText += "What " + healthyCountString + " HEALTHY food"; if(this.FOOD_TYPES.healthy > 1){this.activeText += "s";}
                    this.activeText += " can I purchase and have no change left over?";
                } else if (this.FOOD_TYPES.sweet > 0){
                    this.activeText += "What " + sweetCountString + " SWEET food"; if(this.FOOD_TYPES.sweet > 1){this.activeText += "s";}
                    this.activeText += " can I purchase and have no change left over?";
                }
            }
        }
        else if (this.language === Language.IRISH)
        {
            for(let i = 0; i < copies.length; i++)
            {
                this.FOOD_SUM = this.FOOD_SUM + copies[i].value;
                switch(TYPE_STR)
                {
                    case "Gach Mír":
                        sumAfterDiscount = sumAfterDiscount + (copies[i].value - (copies[i].value * DISCOUNT));
                        switch(copies[i].type)
                        {
                            case 'Healthy':
                                this.FOOD_TYPES.healthy++;
                            break;
                            case 'Sweet':
                                this.FOOD_TYPES.sweet++;
                            break;
                        }
                    break;
                    case "Míreanna Sláintiúla":
                        switch(copies[i].type)
                        {
                            case 'Healthy':
                                sumAfterDiscount = sumAfterDiscount + (copies[i].value - (copies[i].value * DISCOUNT));
                                this.FOOD_TYPES.healthy++;
                            break;
                            case 'Sweet':
                                sumAfterDiscount = sumAfterDiscount + copies[i].value;
                                this.FOOD_TYPES.sweet++;
                            break;
                        }
                    break;
                    case "Míreanna Milis":
                        switch(copies[i].type)
                        {
                            case 'Healthy':
                                sumAfterDiscount = sumAfterDiscount + copies[i].value;
                                this.FOOD_TYPES.healthy++;
                            break;
                            case 'Sweet':
                                sumAfterDiscount = sumAfterDiscount + (copies[i].value - (copies[i].value * DISCOUNT));
                                this.FOOD_TYPES.sweet++;
                            break;
                        }
                    break;
                }
            }

            this.START_KURO = sumAfterDiscount;

            let zero = "";
            if(sumAfterDiscount - Math.floor(sumAfterDiscount) > 0)
            {
                zero = "0";
            }
            else if(sumAfterDiscount - Math.floor(sumAfterDiscount) === 0)
            {
                zero = ".00";
            }

            this.activeText = "Tá " + this.START_KURO + zero + " KURO againn. Tá " + DISCOUNT_STR + " ar gach bhia " + TYPE_STR + ". ";

            switch (this.FOOD_TYPES.healthy){
                /*
                case 1: healthyCountString = "AON";     break;
                case 2: healthyCountString = "DÓ";      break;
                case 3: healthyCountString = "TRÍ";     break;
                */

                case 1: healthyCountString = "1";   break;
                case 2: healthyCountString = "2";   break;
                case 3: healthyCountString = "3";   break;
            }

            switch (this.FOOD_TYPES.sweet){
                /*
                case 1: sweetCountString = "AON";   break;
                case 2: sweetCountString = "DÓ";    break;
                case 3: sweetCountString = "TRÍ";   break;
                */

                case 1: sweetCountString = "1";   break;
                case 2: sweetCountString = "2";   break;
                case 3: sweetCountString = "3";   break;
            }


            if(Game.gameplay.difficulty === Difficulty.REGULAR)
            {
                let count_str = "";
                if(this.FOOD_COUNT === 2)
                {
                    // count_str = "DÓ ";
                    count_str = "2 ";
                }
                else if(this.FOOD_COUNT === 3)
                {
                    // count_str = "TRÍ";
                    count_str = "3 ";
                }
                this.activeText += "Cad é an " + count_str + " bhia is féidir liom a cheannach agus nach bhfuil aon airgead fágtha?";
            }
            else if(Game.gameplay.difficulty === Difficulty.CHALLENGE)
            {
                if(this.FOOD_TYPES.healthy > 0 && this.FOOD_TYPES.sweet > 0)
                {
                    this.activeText += "Cé na " + healthyCountString + " bhia sláintiúil";
                    this.activeText += " agus cad é na " + sweetCountString + " bhia milis";
                    this.activeText += " is féidir linn a cheannach gan aon airgead a bheith fágtha againn?";
                } 
                else if (this.FOOD_TYPES.healthy > 0)
                {
                    this.activeText += "Cé na " + healthyCountString + " bhia sláintiúil";
                    this.activeText += " is féidir linn a cheannach gan aon airgead a bheith fágtha againn?";
                } 
                else if (this.FOOD_TYPES.sweet > 0)
                {
                    this.activeText += "Cé na " + sweetCountString + " bhia milis";
                    this.activeText += " is féidir linn a cheannach gan aon airgead a bheith fágtha againn?";
                }
            }
        }

        console.log("Correct Answer: FOOD_COUNT =", this.FOOD_COUNT);
        console.log("Correct Answer: FOOD_SUM =", this.FOOD_SUM);
        console.log("Correct Answer: FOOD_TYPES =", this.FOOD_TYPES);
    }

    drawMathProblem(ctx){
        const SIZE = 60 * this.scale;
        const POS = {x: 1620 * this.scale, y: 650 * this.scale};
        ctx.font = `${SIZE}px ${'PoppinsBold'}`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.mathProblem, POS.x, POS.y);
    }

    getFoodCount(){
        return this.FOOD_COUNT;
    }

    getFoodSum(){
        return this.FOOD_SUM;
    }

    getAnswer(){
        return this.ANSWER;
    }

    getFoodTypes(){
        return this.FOOD_TYPES;
    }
}