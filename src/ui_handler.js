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

        let imgSize = {x: (300 / 1.75) * this.scale.x, y: (300 / 1.75) * this.scale.y};
        this.foods.push(
            new FoodItem(assets.getAsset('chocolatecake'), imgSize, { x: 255, y: 155 }, 15),
            new FoodItem(assets.getAsset('cupcakes'), imgSize, { x: 470, y: 165 }, 15),
            new FoodItem(assets.getAsset('fruitbowl'), imgSize, { x: 700, y: 160 }, 15),
            new FoodItem(assets.getAsset('fruitcake'), imgSize, { x: 925, y: 155 }, 15),
            new FoodItem(assets.getAsset('mintcake'), imgSize, { x: 255, y: 380 }, 15),
            new FoodItem(assets.getAsset('onigiri'), imgSize, { x: 475, y: 395 }, 15),
            new FoodItem(assets.getAsset('salad'), imgSize, { x: 700, y: 390 }, 15),
            new FoodItem(assets.getAsset('tofu'), imgSize, { x: 930, y: 410 }, 15)
        );

        imgSize = {x: 450 * this.scale.x, y: 600 * this.scale.y };

        const boyPos = { x: 0.0, y: ctx.canvas.height - 205};
        const girlPos = { x: this.background.width - imgSize.x, y:ctx.canvas.height - 205};

        this.characters.push(
            new Character(assets.getAsset('boy'), imgSize, boyPos),
            new Character(assets.getAsset('girl'), imgSize, girlPos)
        );
    }

    updateUI(scale, deltaTime){
        this.updateUIScale(scale);
    }

    drawUI(ctx){

        ctx.fillStyle = "purple";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "white";
        ctx.fillRect(this.background.width * this.scale.x, 0, ctx.canvas.width - (this.background.width * this.scale.x),
            ctx.canvas.height
        )

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

    updateUIScale(scale){
        if(scale.x !== this.scale.x || scale.y != this.scale.y){this.scale = {...scale};}
    }
}