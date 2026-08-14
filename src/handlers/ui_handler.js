import { GAME_WIDTH, GAME_HEIGHT, Commands } from '../../src/constants.js'
import { FoodItem } from '../objects/food_item.js'
import { StaticObject } from '../objects/static_object.js'

export class UiHandler{
    constructor(){
        this.staticObjects = [];
        this.foods = [];
        this.selectedFood = false;
    }
    
    init(assets){
        this.staticObjects.push(new StaticObject("background", assets.getAsset('background'), {x:0.0, y:0.0}, {x:1280, y:720}));

        let objScale = 0.35;
        let objSize = {x: 300 * objScale, y: 200 * objScale};
        this.staticObjects.push(new StaticObject("money", assets.getAsset('money'), {x:1500,y:150}, objSize));

        objScale = 0.5;
        objSize = {x: 600 * objScale, y: 600 * objScale};
        this.staticObjects.push(new StaticObject("sign", assets.getAsset('sign'), {x:1280,y:780},objSize));

        objScale = 0.75;
        objSize = {x: 450 * objScale, y: 600 * objScale};
        this.staticObjects.push(new StaticObject("boy", assets.getAsset('boy'), {x:0, y:GAME_HEIGHT - objSize.y}, objSize));
        this.staticObjects.push(new StaticObject("girl", assets.getAsset('girl'), {x:1280 - objSize.x, y:GAME_HEIGHT - objSize.y}, objSize));


        objScale = 0.5;
        objSize = {x: 300 * objScale, y: 300 * objScale};
        this.foods.push(
            new FoodItem(assets.getAsset('chocolatecake'), objSize, { x: 250, y: 140 }, 15),
            new FoodItem(assets.getAsset('cupcakes'), objSize, { x: 468, y: 155 }, 15),
            new FoodItem(assets.getAsset('fruitbowl'), objSize, { x: 695, y: 145 }, 15),
            new FoodItem(assets.getAsset('fruitcake'), objSize, { x: 920, y: 142 }, 15),
            new FoodItem(assets.getAsset('mintcake'), objSize, { x: 253, y: 370 }, 15),
            new FoodItem(assets.getAsset('onigiri'), objSize, { x: 472, y: 380 }, 15),
            new FoodItem(assets.getAsset('salad'), objSize, { x: 698, y: 378 }, 15),
            new FoodItem(assets.getAsset('tofu'), objSize, { x: 925, y: 400 }, 15)
        );
    }

    update(scale, deltaTime){
        for(let i = 0; i < this.staticObjects.length; i++){
            this.staticObjects[i].update(scale, deltaTime);
        }
    }

    draw(ctx){
        ctx.fillStyle = "purple";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        for(let i = 0; i < this.staticObjects.length; i++){
            this.staticObjects[i].draw(ctx);
        }
    }
}