export class FoodItem{
    constructor(texture, name, size, pos, scale, cost){
        this.texture = texture;
        this.name = name;

        this.size = size;
        this.cachedSize = size;

        this.pos = pos;
        this.cachedPos = pos;

        this.scale = scale;
        this.cachedScale = scale;

        this.selected = false;
        this.cost = cost;
    }

    update(scale, ctx, deltaTime){
        this.size = { x: this.cachedSize.x * scale.x, y: this.cachedSize.y * scale.y };
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}