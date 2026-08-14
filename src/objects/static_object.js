export class StaticObject{
    constructor(name, texture, pos, size){
        this.scale = {x:1.0,y:1.0};
        this.name = name;
        this.texture = texture;
        this.pos = {...pos};
        this.size = {...size};
        this.cachedPos = {...pos};
        this.cachedSize = {...size};
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

export class Rect{
    constructor(x, y, width, height, color){
        this.scale = {x:1.0,y:1.0},

        this.pos = {x: x, y: y};
        this.size = {x: width, y: height};

        this.initialPos = {x: x, y: y};
        this.initialSize = {x: width, y: height};

        this.color = color;
    }

    update(scale, deltaTime){
        if(this.scale !== scale){
            this.scale = {...scale};
            this.pos = {x:this.initialPos.x * this.scale.x, y:this.initialPos.y * this.scale.y};
            this.size = {x: this.initialSize.x * this.scale.x, y: this.initialSize.y * this.scale.y};
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    intersects(point){
        if(point.x >= this.pos.x &&
            point.x <= this.pos.x + this.size.x &&
            point.y >= this.pos.y &&
            point.y <= this.pos.y + this.size.y){
                return true;
            }
            return false;
    }
}