import { TextBubble } from './text_bubble.js'
import { Character } from './character.js'


export class UiHandler{
    constructor(){
        this.background = null;
        this.textBubble = null;
        this.boy = null;
        this.girl = null;
    }
    
    initUI(scale, assets, ctx){
        this.background = assets.getAsset('background');
        this.initCharacters(scale, assets, ctx);
        this.initTextBubble(scale, ctx);
    }

    updateUI(scale, ctx, deltaTime){
        this.textBubble.update(scale, ctx, deltaTime);
        this.boy.updateBoy(scale, ctx, deltaTime);
        this.girl.updateGirl(scale, ctx, deltaTime);
    }

    drawUI(ctx){
        ctx.drawImage(this.background, 0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
        if(this.boy){this.boy.draw(ctx)};
        if(this.girl){this.girl.draw(ctx)};
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
        const size = {x:500 / 3 , y:225 / 4};
        const lineWidth = 3 * Math.min(newScale.x, newScale.y);
        const pos = {x: (ctx.canvas.width / 4) - ((size.x * newScale.x) / 2),
                     y: ctx.canvas.height - size.y - (lineWidth / 2)};
        const radius = 15;
        const fontSize = 24;
        const color = '#f0b155';
        const scale = {x: newScale.x, y: newScale.y};

        this.textBubble = new TextBubble(pos, size, radius, lineWidth,
                                         fontSize, color, scale);
    }

    initCharacters(newScale, assets, ctx){
        let size = {x:(417 / 2) * 0.7 , y:(567.25 / 2) * 0.7};
        let position = {x: 0,y: ctx.canvas.height - size.y};
        this.boy = new Character(assets.getAsset('boy'), position, size);

        size = {x:(588 / 2) * 0.5, y:(743 / 2) * 0.5};
        position = {x: (ctx.canvas.width / 2) - size.x, y: ctx.canvas.height - size.y};
        this.girl = new Character(assets.getAsset('girl_left'), position, size);
    }
}