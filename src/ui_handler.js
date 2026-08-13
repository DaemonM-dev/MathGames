import { GAME_WIDTH, GAME_HEIGHT } from './constants.js'
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

        this.characters.forEach(character => {character.draw(ctx)});
        this.foods.forEach(food => {food.draw(ctx)});
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
        }
    }
}