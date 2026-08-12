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

    checkForSelected(){
        if(this.selected){return true;}
        return false;
    }
    checkForCollision(mousePos){
        if(mousePos.x >= this.pos.x && 
        mousePos.x <= this.pos.x + this.size.x &&
        mousePos.y >= this.pos.y &&
        mousePos.y <= this.pos.y + this.size.y){
            if(this.selected){this.selected = false;}
            else{this.selected = true;
            console.log("Food Selected: ", this.name);}
        }
    }

    move(mousePos){
        if(this.selected){this.pos = {
            x:mousePos.x - (this.size.x / 2),
            y:mousePos.y - (this.size.y / 2)}
        };
    }
}