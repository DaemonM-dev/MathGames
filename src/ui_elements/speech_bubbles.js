import { Game } from '../game.js'
import { Vector2i, Vector2f } from '../constants.js';

export class SpeechBubble
{
    constructor(){
        this.pos = null;
        this.initialSize = null;
        this.size = null;
        this.scale = null;
        this.initialRadius = 0;
        this.radius = 0;
        this.messages = [];
        this.currentMessageIndex = 0;
        this.initialLineWidth = 0;
        this.lineWidth = 0;
    }

    init(pos, size, radius, scale, lineWidth){
        this.pos = pos;
        this.initialSize = size; // Store original size once
        this.size = size; // Copy the size
        this.initialRadius = radius;
        this.radius = radius;
        this.scale = scale; // Store current scale
        this.initialLineWidth = lineWidth;
        this.lineWidth = lineWidth;
    }

    update(deltaTime, scale){
        this.scaleBubble(scale);
    }

    scaleBubble(scale){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = scale;

            this.size = { x: this.initialSize.x * this.scale.x, y: this.initialSize.y * this.scale.y };
            this.pos = { x: (Game.canvas.width - this.size.x) / 2, y: Game.canvas.height - this.size.y};

            this.radius = this.initialRadius * Math.min(this.scale.x, this.scale.y);
            this.lineWidth = this.initialLineWidth * Math.min(this.scale.x, this.scale.y);

            console.log("SpeechBox Updated");
            console.log("New Scale: ", this.scale);
            console.log("New Size: ", this.size);
            console.log("New Position: ", this.pos);
            console.log("New Radius: ", this.radius);
        }
    }

    draw(ctx){
        this.drawBubble(ctx);
        this.drawText(ctx);
    }

    addMessage(message){
        this.messages.push(message);
    }

    setCurrentMessage(index){
        if(index >= 0 && index < this.messages.length){
            this.currentMessageIndex = index;
        }
    }

    nextMessage() {
        if (this.messages.length > 1) {
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
        }
    }

    drawBubble(ctx){
        ctx.fillStyle = '#f0b155';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.radius);
        ctx.fill();
        ctx.stroke();
    }

    drawText(ctx)
    {
        const message = this.messages[this.currentMessageIndex];
        const scaledFontSize = 24 * Math.min(this.scale.x, this.scale.y);
        ctx.font = `${scaledFontSize}px Arial`;

        // Cache calculations that don't change per call
        const maxWidth = this.size.x - 80 * this.scale.x;
        const lineHeight = scaledFontSize * 1.2;
        const startX = (ctx.canvas.width - this.size.x) / 2 + 40 * this.scale.x;
        const startY = ctx.canvas.height - this.size.y - ctx.lineWidth + 40 * this.scale.y;
        
        // Text wrapping logic
        const words = message.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + ' ' + word;
            const testWidth = ctx.measureText(testLine).width;
            
            if (testWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);

        // Draw text line by line
        for (let i = 0; i < lines.length; i++) {
            const textY = startY + (i * lineHeight);
            ctx.fillStyle = 'black';
            ctx.fillText(lines[i], startX, textY);
        }
    }
}