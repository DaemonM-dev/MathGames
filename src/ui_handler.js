import { Command } from './input_handler.js'
import { FoodItem } from './food_item.js'
import { Character } from './character.js'

export class UiHandler{
    constructor(scale){
        this.scale = {...scale};
        this.background = null;

        this.foods = [];
        this.characters = [];
    }
    
    initUI(assets, ctx){
        this.background = assets.getAsset('background');

        let imgSize = {x: 300 / 2, y: 300 / 2};

        this.foods.push(
            new FoodItem(assets.getAsset('chocolatecake'), imgSize, { x: 235, y: 130 }, 15),
            new FoodItem(assets.getAsset('cupcakes'), imgSize, { x: 465, y: 145 }, 15),
            new FoodItem(assets.getAsset('fruitbowl'), imgSize, { x: 695, y: 140 }, 15),
            new FoodItem(assets.getAsset('fruitcake'), imgSize, { x: 915, y: 135 }, 15),
            new FoodItem(assets.getAsset('mintcake'), imgSize, { x: 235, y: 360 }, 15),
            new FoodItem(assets.getAsset('onigiri'), imgSize, { x: 465, y: 375 }, 15),
            new FoodItem(assets.getAsset('salad'), imgSize, { x: 695, y: 375 }, 15),
            new FoodItem(assets.getAsset('tofu'), imgSize, { x: 920, y: 385 }, 15)
        );

        imgSize = {x: 450 / 1.5, y: 600 / 1.5 };

        const boyPos = { x: 0.0, y: ctx.canvas.height - imgSize.y};
        const girlPos = { x: this.background.width - imgSize.x - 10, y:ctx.canvas.height };

        this.characters.push(
            new Character(assets.getAsset('boy'), imgSize, boyPos),
            new Character(assets.getAsset('girl'), imgSize, girlPos)
        );
    }

    updateUI(scale, deltaTime){
        if(scale.x !== this.scale.x || scale.y != this.scale.y){this.scale = {...scale};}
    }

    drawUI(ctx){
        ctx.drawImage(this.background,0,0, this.background.width * this.scale.x, this.background.height * this.scale.y);

        this.drawBorders(ctx);

        this.characters.forEach(character => {character.draw(this.scale, ctx)});
        this.foods.forEach(food => {food.draw(this.scale, ctx)});
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
}