import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js'

export class SpeechBubble{
    constructor(pos, size, color, radius, lineWidth, lineColor){
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;

        this.initial_P = {...pos};
        this.initial_S = {...size};
        this.initial_R = radius;
        this.initial_LW = lineWidth;

        this.scale = { x:1.0, y:1.0 };

        this.font = null;
        this.fontSize = 0;
        this.initial_FS = 0;
        this.padding = 0;
        this.initialPad = 0;

        this.messages = [];
        this.currentMsgIndex = 0;

        this.wrappedLines = [];
        this.needsRewrap = true;
    }

    init(font, fontSize, padding){
        this.font = font;
        this.fontSize = fontSize;
        this.initial_FS = fontSize;
        this.padding = padding;
        this.initialPad = padding;

        this.addMessage("Welcome to Maths Munch Cafe!");
        this.addMessage("We'd like to get lunch, and together we have 15.50 Kuro. What can we get?");
        this.addMessage("Look at us using Maths in the world!");
        this.addMessage("Can you help us figure out what to get for lunch?");
        this.addMessage("There's some discounts available at the Cafe as well, depending on what we get.");
        this.addMessage("Drag and drop the food items, then calculate the total.");
    }

    update(scale, ctx, deltaTime){
        this.scaleBubble(scale);
        if(this.needsRewrap){
            this.wrapMessage(ctx);
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke()

        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = 'black';

        let textY = this.pos.y + this.padding + this.fontSize;
        for(const line of this.wrappedLines){
            ctx.fillText(line, this.pos.x + this.padding, textY);
            textY += this.fontSize + this.lineWidth;
        }
    }

    scaleBubble(scale){
        if(scale.x != this.scale.x || scale.y != this.scale.y){
            this.scale = {...scale};
            this.pos = { x: this.initial_P.x * this.scale.x, y: this.initial_P.y * this.scale.y };
            this.size = { x: this.initial_S.x * this.scale.x, y: this.initial_S.y * this.scale.y };
            this.radius = this.initial_R * Math.min(this.scale.x, this.scale.y);
            this.lineWidth = this.initial_LW * Math.min(this.scale.x, this.scale.y);
            this.fontSize = this.initial_FS * Math.min(this.scale.x, this.scale.y);
            this.padding = this.initialPad * Math.min(this.scale.x, this.scale.y);

            this.needsRewrap = true;
        }
    }

    wrapMessage(ctx){
        const message = this.messages[this.currentMsgIndex];
        const maxWidth = this.size.x - (this.padding * 2);

        ctx.font = `${this.fontSize}px ${this.font}`;

        const words = message.split(' ');
        const lines = [];
        let currentLine = '';

        for(const word of words){
            const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
            const testWidth = ctx.measureText(testLine).width;

            if(testWidth > maxWidth && currentLine.length > 0){
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if(currentLine.length > 0){
            lines.push(currentLine);
        }

        this.wrappedLines = lines;
        this.needsRewrap = false;
    }

    addMessage(message){
        this.messages.push(message);
        this.needsRewrap = true;
    }

    setCurrentMessage(index){
        if(index >= 0 && index < this.messages.length){
            this.currentMsgIndex = index;
            this.needsRewrap = true;
        }
    }

    nextMessage() {
        if (this.messages.length > 1) {
            this.currentMsgIndex = (this.currentMsgIndex + 1) % this.messages.length;
            this.needsRewrap = true;
        }
    }
}