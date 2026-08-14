export class DynamicObject{
    constructor(name, texture, pos, size){
        this.scale = {x:1.0,y:1.0};
        this.name = name;
        this.texture = texture;
        this.pos = {...pos};
        this.size = {...size};
        this.cachedPos = {...pos};
        this.cachedSize = {...size};
        this.initialPos = {...pos};
        this.selected = false;
    }

    update(mousePos, scale, deltaTime){
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

        this.move(mousePos);
    }

    draw(ctx){
        ctx.drawImage(this.texture, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    isSelected(mousePos){
        if(mousePos.x >= this.pos.x &&
           mousePos.x <= this.pos.x + this.size.x && 
           mousePos.y >= this.pos.y &&
           mousePos.y <= this.pos.y + this.size.y){
                return true;
        }
        return false;
    }

    select(){
        this.selected = true;
    }

    deselect(){
        this.selected = false;
    }

    reset(){
    }

    move(mousePos){
        if(this.selected){
            this.pos = {x: mousePos.x - (this.size.x / 2), y: mousePos.y - (this.size.y / 2)};
        }
    }
}