import { GAME_WIDTH, GAME_HEIGHT, Levels } from '../constants.js'
import { StaticObject, Rect } from '../objects/static_object.js'

export class Level{
    constructor(){
        this.level = null;
        this.name = null;

        this.rectangles = [];
        this.staticObjects = [];

        this.dropZone = null;

        this.startingKuro = 0;
        this.foodValues = new Map();
    }

    init(assets){
        this.staticObjects.push(new StaticObject("background", assets.getAsset('background'), {x:0.0, y:0.0}, {x:1280, y:720}));
        let objScale = 0.35;
        let objSize = {x: 300 * objScale, y: 200 * objScale};
        this.staticObjects.push(new StaticObject("money", assets.getAsset('money'), {x:1500,y:150}, objSize));
        objScale = 0.75;
        objSize = {x: 450 * objScale, y: 600 * objScale};
        this.staticObjects.push(new StaticObject("boy", assets.getAsset('boy'), {x:0, y:GAME_HEIGHT - objSize.y}, objSize));
        this.staticObjects.push(new StaticObject("girl", assets.getAsset('girl'), {x:1280 - objSize.x, y:GAME_HEIGHT - objSize.y}, objSize));
    
        // Initialize comic strip borders and drop zones
        const barWidth = 20.0;
        const vertSize = {x: barWidth, y: GAME_HEIGHT};
        const vertPos = {x: this.staticObjects[0].texture.width - (vertSize.x / 2.0), y: 0.0};
        const horizSize = {x: this.staticObjects[0].texture.width, y: barWidth};
        const horizPos = {x: 0.0, y: this.staticObjects[0].texture.height - (horizSize.y / 2.0)};

        this.rectangles.push(new Rect(this.staticObjects[0].texture.width, 0.0, GAME_WIDTH - this.staticObjects[0].texture.width, GAME_HEIGHT, 'white'));
        this.rectangles.push(new Rect(vertPos.x, vertPos.y, vertSize.x, vertSize.y, 'black'));
        this.rectangles.push(new Rect(horizPos.x, horizPos.y, horizSize.x, horizSize.y, 'black'));

        const blackRect = new Rect(this.rectangles[0].pos.x + (this.rectangles[0].size.x / 2) - 300 + barWidth / 4, (GAME_HEIGHT / 2) - 250, 600, 500, 'black');
        
        const size = { x: blackRect.size.x * 0.96 , y: blackRect.size.y * 0.95 };
        const pos = { x: blackRect.pos.x + ((blackRect.size.x - size.x) / 2), y: blackRect.pos.y + ((blackRect.size.y - size.y) / 2)};

        const whiteRect = new Rect(pos.x, pos.y, size.x, size.y, 'white');

        this.rectangles.push(blackRect);
        this.rectangles.push(whiteRect);
        this.dropZone = blackRect;

        this.generateLevelCurrency();
        this.generateFoodValues();
    }

    update(scale, deltaTime){
        for(let i = 0; i < this.staticObjects.length; i++){
            this.staticObjects[i].update(scale, deltaTime);
        }
        for(let i = 0; i < this.rectangles.length; i++){
            this.rectangles[i].update(scale, deltaTime);
        }
    }

    draw(ctx){
        ctx.fillStyle = "purple";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        this.staticObjects[0].draw(ctx); // Shelf Texture
        for(let i = 0; i < this.rectangles.length; i++){ this.rectangles[i].draw(ctx); }
        for(let i = 1; i < this.staticObjects.length; i++){ this.staticObjects[i].draw(ctx); }
    }

    generateLevelCurrency(){
        this.startingKuro = Math.floor(Math.random() * 21) + 20; // Assigns value between 20 - 40
    }

    generateFoodValues(){
        const foodItems = [
            "chocolateCake", "cupcake", "fruitBowl", "fruitCake",
            "mintCake", "onigiri", "salad", "tofu"
        ];

        foodItems.forEach(foodName => {
            this.foodValues.set(foodName, Math.floor(Math.random() * 5) + 3); // Assigns value between 3-7
        });
    }

    getDropzone(){
        return this.dropZone;
    }

    getStartingKuro(){
        return this.startingKuro;
    }

    getFoodValue(foodName){
        return this.foodValues.get(foodName) || 0;
    }
}