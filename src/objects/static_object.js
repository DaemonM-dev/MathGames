export class StaticObject{
    constructor(name, texture, pos, size){
        this.name = name;
        this.texture = texture;
        this.pos = {...pos};
        this.size = {...size};

        this.cachedPos = {...pos};
        this.cachedSize = {...size};

        this.scale = {x:1.0,y:1.0};
    }

    update(scale, deltaTime){
        if(this.scale !== scale){
            this.scale = {...scale};
            this.size = {
                x: this.cachedSize.x * this.scale.x,
                y: this.cachedSize.y * this.scale.y
            };
            this.pos = {
                x: this.cachedPos.x * this.scale.x,
                y: this.cachedPos.y * this.scale.y
            };
        }
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}