export class Character{
    constructor(texture, pos, size){
        this.texture = texture;
        this.pos = pos;
        this.size = size;
        this.cachedSize = size;
    }

    updateBoy(scale, ctx, deltaTime){
        let newSize = {
            x: this.cachedSize.x,
            y: this.cachedSize.y
        };

        newSize.x = newSize.x * scale.x;
        newSize.y = newSize.y * scale.y;

        this.size = newSize;
        this.pos.y = ctx.canvas.height - this.size.y;

        console.log("new boy pos: ", this.pos);
        console.log("new boy size: ", this.size)
    }

    updateGirl(scale, ctx, deltaTime){
        let newSize = {
            x: this.cachedSize.x,
            y: this.cachedSize.y
        };

        newSize.x = newSize.x * scale.x;
        newSize.y = newSize.y * scale.y;

        this.size = newSize;
        this.pos.x = (ctx.canvas.width / 2) - this.size.x;
        this.pos.y = ctx.canvas.height - this.size.y;

        console.log("new girl pos: ", this.pos);
        console.log("new boy size: ", this.size)
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}