import { Vector2 } from '../constants.js';

export class SpeechBubble
{
    constructor(x = 0, y = 0, width = 0, height = 0, radius = 0)
    {
        this.pos = new Vector2(x, y);
        this.size = new Vector2(width, height);
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

    Draw(ctx, scaleX, scaleY)
    {
        const scaledWidth = this.size.x * scaleX;
        const scaledHeight = this.size.y * scaleY;
        
        ctx.fillStyle = '#f0b155';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 7;
        ctx.font = '24px Arial';

        const x = (ctx.canvas.width - scaledWidth) / 2;
        const y = ctx.canvas.height - scaledHeight - ctx.lineWidth;

        ctx.beginPath();
        ctx.roundRect(x, y, scaledWidth, scaledHeight, this.radius);
        ctx.fill();
        ctx.stroke();

        const message = this.messages[this.currentMessageIndex];
        const textX = x + 40; // Padding from left
        const textY = y + 40; // Padding from top
        
        ctx.fillStyle = 'black';
        ctx.fillText(message, textX, textY);
    }
}