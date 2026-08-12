export class Character{
    constructor(texture, size, pos){
        this.texture = texture;
        this.size = {...size};
        this.pos = {...pos};
    }

    draw(scale, ctx){
        ctx.drawImage(this.texture, this.pos.x * scale.x, this.pos.y * scale.y, this.size.x * scale.x, this.size.y * scale.y);
    }
}