import { Vector2i } from '../constants.js';

export class SpeechBubble
{
    constructor(x = 0, y = 0, width = 0, height = 0, radius = 0)
    {
        this.pos = new Vector2i(x, y);
        this.size = new Vector2i(width, height);
        this.radius = radius;
        this.messages = [];
        this.currentMessageIndex = 0;
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

    draw(ctx, scaleX, scaleY)
    {

        const scaled = new Vector2i(this.size.x * scaleX, this.size.y * scaleY);
    
        ctx.fillStyle = '#f0b155';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 7 * Math.min(scaleX, scaleY);
        ctx.font = '24px Arial';

        const x = (ctx.canvas.width - scaled.x) / 2;
        const y = ctx.canvas.height - scaled.y - ctx.lineWidth;

        ctx.beginPath();
        ctx.roundRect(x, y, scaled.x, scaled.y, this.radius * Math.min(scaleX, scaleY));
        ctx.fill();
        ctx.stroke();

        const message = this.messages[this.currentMessageIndex];

        // Scale the font to the canvas size
        const scaledFontSize = 24 * Math.min(scaleX, scaleY);
        ctx.font = `${scaledFontSize}px Arial`;

        const textX = x + 40 * scaleX;
        const textY = y + 40 * scaleY;
        
        ctx.fillStyle = 'black';
        ctx.fillText(message, textX, textY);
    }
}