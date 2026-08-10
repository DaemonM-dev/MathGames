export class UiHandler{
    constructor(){
        this.scale = {x: 1.0, y: 1.0};
        this.background = null;
    }
    
    initUI(assets){
        this.background = assets.getAsset('background');
        this.bgSize = {x: this.background.width, y: this.background.height};
    }

    updateUI(ctx, scale, deltaTime){
        if (this.scale.x !== scale.x || this.scale.y !== scale.y) {
            this.scale = scale;
        }
    }

    drawUI(ctx){
        ctx.drawImage(this.background, 
            0, 0, 
            ctx.canvas.width, 
            ctx.canvas.height);
    }
}