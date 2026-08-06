import { Vector2i } from '../constants.js';

export class SpeechBubble
{
    constructor(){
        this.pos = null;
        this.size = null;
        this.radius = 0;
        this.messages = [];
        this.currentMessageIndex = 0;
    }

    init(pos, size, radius){
        this.pos = pos;
        this.size = size;
        this.radius = radius;
    }

    update(deltaTime, scale){
        const newSize = new Vector2i(this.size.x * scale.x, this.size.y * scale.y);
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
        
        this.drawBubble(ctx, scaled, scaleX, scaleY);
        this.drawText(ctx, scaled, scaleX, scaleY);
    }

    drawBubble(ctx, scaled, scaleX, scaleY)
    {
        ctx.fillStyle = '#f0b155';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 7 * Math.min(scaleX, scaleY);

        const x = (ctx.canvas.width - scaled.x) / 2;
        const y = ctx.canvas.height - scaled.y - ctx.lineWidth;

        ctx.beginPath();
        ctx.roundRect(x, y, scaled.x, scaled.y, this.radius * Math.min(scaleX, scaleY));
        ctx.fill();
        ctx.stroke();
    }

    drawText(ctx, scaled, scaleX, scaleY)
    {
        const message = this.messages[this.currentMessageIndex];
        const scaledFontSize = 24 * Math.min(scaleX, scaleY);
        ctx.font = `${scaledFontSize}px Arial`;

        // Cache calculations that don't change per call
        const maxWidth = scaled.x - 80 * scaleX;
        const lineHeight = scaledFontSize * 1.2;
        const startX = (ctx.canvas.width - scaled.x) / 2 + 40 * scaleX;
        const startY = ctx.canvas.height - scaled.y - ctx.lineWidth + 40 * scaleY;
        
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