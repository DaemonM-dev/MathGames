export class Character{
    constructor(texture, size, pos){
        this.texture = texture;
        this.size = {...size};
        this.pos = {...pos};

        this.cachedSize = {...size};
        this.cachedPos = {...pos};
    }

    updateScale(scale){
        this.size = {
            x: this.cachedSize.x * scale.x,
            y: this.cachedSize.y * scale.y
        };
        this.pos = {
            x: this.cachedPos.x * scale.x,
            y: this.cachedPos.y * scale.y
        };
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}