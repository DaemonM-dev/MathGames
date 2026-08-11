import { TextBubble } from './text_bubble.js'



export class UiHandler{
    constructor(){
        this.background = null;
        this.textBubble = null;
    }
    
    initUI(scale, assets, ctx){
        this.background = assets.getAsset('background');
        this.initTextBubble(scale, ctx);
    }

    updateUI(scale, ctx, deltaTime){
        this.textBubble.update(scale, ctx, deltaTime);
    }

    drawUI(ctx){
        ctx.drawImage(this.background, 0, 0, ctx.canvas.width, ctx.canvas.height);
        if(this.textBubble){this.textBubble.draw(ctx);}
    }

    resizeUI(scale){
        if(this.scale.x !== scale.x || this.scale.y !== scale.y){
            console.log("Old Scale for UI: ", this.scale);
            this.scale = scale;
            console.log("New Scale for UI: ", this.scale);
        }
    }

    initTextBubble(newScale, ctx){
        const size = {x:400 , y:125};
        const lineWidth = 7 * Math.max(newScale.x, newScale.y);
        const pos = {x: (ctx.canvas.width / 2) - ((size.x * newScale.x) / 2),
                     y: lineWidth / 2};
        const radius = 15;
        const fontSize = 24;
        const color = '#f0b155';
        const scale = {x: newScale.x, y: newScale.y};

        this.textBubble = new TextBubble(pos, size, radius, lineWidth,
                                         fontSize, color, scale);
    }
}