import { GAME_WIDTH, GAME_HEIGHT } from './constants.js'
import { Command } from './input_handler.js'
import { FoodItem } from './food_item.js'
import { Character } from './character.js'
import { TextHandler } from './text_handler.js'

export class UiHandler{
    constructor(scale){
        this.scale = scale;
        this.background = null;

        this.money = null;
        this.sign = null;

        this.foods = [];
        this.characters = [];

        this.cachedCommand = Command.NONE;
        this.selectedFood = false;

        this.text = null;
    }
    
    initUI(assets, ctx){
        this.background = assets.getAsset('background');

        this.money = new FoodItem(assets.getAsset('money'), {x:375 / 6,y:200 / 4}, {x:1500,y:150}, 0);
        this.sign = new FoodItem(assets.getAsset('sign'), {x:600 / 2,y:600 / 2}, {x:1260,y:780}, 0);

        let imgSize = {x: 300 / 2, y: 300 / 2};
        this.foods.push(
            new FoodItem(assets.getAsset('chocolatecake'), imgSize, { x: 250, y: 140 }, 15),
            new FoodItem(assets.getAsset('cupcakes'), imgSize, { x: 468, y: 155 }, 15),
            new FoodItem(assets.getAsset('fruitbowl'), imgSize, { x: 695, y: 145 }, 15),
            new FoodItem(assets.getAsset('fruitcake'), imgSize, { x: 920, y: 142 }, 15),
            new FoodItem(assets.getAsset('mintcake'), imgSize, { x: 253, y: 370 }, 15),
            new FoodItem(assets.getAsset('onigiri'), imgSize, { x: 472, y: 380 }, 15),
            new FoodItem(assets.getAsset('salad'), imgSize, { x: 698, y: 378 }, 15),
            new FoodItem(assets.getAsset('tofu'), imgSize, { x: 925, y: 400 }, 15)
        );

        imgSize = {x: 450 / 1.25, y: 600 / 1.25};

        const boyPos = { x: 0.0, y: GAME_HEIGHT - imgSize.y};
        const girlPos = { x: this.background.width - imgSize.x, y:GAME_HEIGHT - imgSize.y};

        this.characters.push(
            new Character(assets.getAsset('boy'), imgSize, boyPos),
            new Character(assets.getAsset('girl'), imgSize, girlPos)
        );

        this.text = new TextHandler(this.scale);
    }

    updateUI(command, mousePos, scale, deltaTime){
        this.updateUIScale(scale);
        this.interact(command, mousePos);
    }

    drawUI(ctx){

        ctx.fillStyle = "purple";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "white";
        ctx.fillRect(this.background.width * this.scale.x, 0, ctx.canvas.width - (this.background.width * this.scale.x),
            ctx.canvas.height
        )

        this.money.draw(ctx);
        this.sign.draw(ctx);

        ctx.drawImage(this.background,0,0, this.background.width * this.scale.x, this.background.height * this.scale.y);
        this.drawBorders(ctx);

        this.characters.forEach(character => {character.draw(ctx)});

        this.text.drawAllMessages(ctx);

        this.foods.filter(food => !food.getSelected()).forEach(food => {food.draw(ctx)});
        const selectedFood = this.foods.find(food => food.getSelected());
        if (selectedFood) {selectedFood.draw(ctx);}
    }

    drawBorders(ctx){
        const barWidth = 20.0;

        const vertSize = {x: barWidth, y: ctx.canvas.height};
        const vertPos = {x: this.background.width - (vertSize.x / 2.0), y: 0.0};
        const horizSize = {x:this.background.width, y: barWidth};
        const horizPos = {x: 0.0, y: this.background.height - (horizSize.y / 2.0)};

        ctx.fillStyle = "black";

        ctx.fillRect(vertPos.x * this.scale.x, vertPos.y * this.scale.y, vertSize.x * this.scale.x, vertSize.y);
        ctx.fillRect(horizPos.x * this.scale.x, horizPos.y * this.scale.y, horizSize.x * this.scale.x, horizSize.y * this.scale.y);
    }

    updateUIScale(scale){
        if(scale.x !== this.scale.x || scale.y != this.scale.y){
            this.scale = {...scale};
            this.characters.forEach(character => {character.updateScale(this.scale)});
            this.foods.forEach(food => {food.updateScale(this.scale)});
            this.money.updateScale(this.scale);
            this.sign.updateScale(this.scale);
            this.text.updateMessageScale(this.scale);
        }
    }

    interact(command, mousePos){
        if(command === Command.MOUSE_DOWN){
            if(!this.selectedFood){
                for(let i = 0; i < this.foods.length; i++){
                    if(this.foods[i].select(mousePos)){
                    this.selectedFood = true;
                    break;
                    }
                }
            }
            else{
            this.foods.forEach(food => {food.move(mousePos)});
            }
        } else if(command === Command.MOUSE_UP){
            for(let i = 0; i < this.foods.length; i++){
                if(this.foods[i].getSelected()){

                    const whiteRectX = this.background.width * this.scale.x;
                    const whiteRectWidth = GAME_WIDTH * this.scale.x - (this.background.width * this.scale.x);

                    if(!this.isCollidingWithWhiteRect(this.foods[i], whiteRectX, whiteRectWidth)) {
                        this.foods[i].resetToStart();
                    }

                    this.foods[i].deselect();
                    this.selectedFood = false;
                    break;
                }
            }
        }
    }
    isCollidingWithWhiteRect(foodItem, whiteRectX, whiteRectWidth) {
        const foodLeft = foodItem.pos.x;
        const foodRight = foodItem.pos.x + (foodItem.size.x / 2);
        const foodTop = foodItem.pos.y;
        const foodBottom = foodItem.pos.y + (foodItem.size.y / 2);
        
        const rectLeft = whiteRectX;
        const rectRight = whiteRectX + whiteRectWidth;
        
        return !(foodRight < rectLeft || foodLeft > rectRight);
    }
}