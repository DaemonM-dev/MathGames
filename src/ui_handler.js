import { TextBubble } from './text_bubble.js'



export class UiHandler{
    constructor(){
        this.scale = {x: 1.0, y: 1.0};
        this.background = null;
        this.textBubble = null;
    }
    
    initUI(ctx, assets, scale){
        this.scale = scale;
        this.background = assets.getAsset('background');
        this.initTextBubble(ctx);
    }

    updateUI(ctx, scale, deltaTime){
        if (this.scale.x !== scale.x || this.scale.y !== scale.y) {
            this.scale = scale;
        }
    }

    drawUI(ctx){
        ctx.drawImage(this.background, 0, 0, ctx.canvas.width, ctx.canvas.height);
        this.textBubble.draw(ctx);
    }

    initTextBubble(ctx){
        const size = {x:400 * this.scale.x , y:125 * this.scale.y};
        const pos = {x: (ctx.canvas.width / 2) - (size.x / 2),
                          y: ctx.canvas.height - size.y};
        const radius = 15;
        const lineWidth = 7 * Math.max(this.scale.x, this.scale.y);
        const fontSize = 24;
        const color = '#f0b155';

        this.textBubble = new TextBubble(size, pos, radius, lineWidth, fontSize, color);
    }
}