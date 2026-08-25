import { Command } from '../enums/commands.js'
import { FoodItem } from '../gameplay/elements/food_item.js'
import { Pricetag } from '../gameplay/elements/pricetag.js'

const TOTAL_FOOD = 8;
const FOOD_SIZE = { x: 150, y: 150 };

export class FoodHandler{
    constructor(){
        this.foodID = [
            { name: "Chocolate Cake", asset: 'chocolatecake' },
            { name: "Cupcake", asset: 'cupcakes' },
            { name: "Fruit Bowl", asset: 'fruitbowl' },
            { name: "Fruit Cake", asset: 'fruitcake' },
            { name: "Macha Cake", asset: 'mintcake' },
            { name: "Rice Cake", asset: 'onigiri' },
            { name: "Salad", asset: 'salad' },
            { name: "Tofu", asset: 'tofu' }
        ];

        this.shelfPoints = [
            {pos: {x:245,y:143}},
            {pos: {x:468,y:143}},
            {pos: {x:695,y:143}},
            {pos: {x:920,y:143}},
            {pos: {x:240,y:378}},
            {pos: {x:472,y:378}},
            {pos: {x:698,y:378}},
            {pos: {x:925,y:378}},
        ];

        this.prices = [ 3.50, 4.00, 4.75, 5.25, 5.00, 4.50, 4.25, 3.75, ];

        this.dropZonePoints = [
            {pos:{x:1400, y: 300}},
            {pos:{x:1650, y: 300}},
            {pos:{x:1525, y: 450}}
        ];

        this.foodItems = [];
        this.foodCopies = [];
        this.priceTags = [];
        this.scale = {x:1.0, y:1.0};
    }

    init(assets){
        const SIZE = { x: 150, y: 150 };
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems.push(new FoodItem());
            const name = this.foodID[i].name;
            const texture = assets.getAsset(this.foodID[i].asset);
            this.foodItems[i].setUnique(name, texture, SIZE);
            this.foodItems[i].init(this.prices[i], this.shelfPoints[i].pos);
        }
        this.assignRandomValues();
        this.autoSelectRandom();
    }

    update(command, mousePos){
        for(let i = 0; i < this.foodItems.length; i++){
            this.foodItems[i].update(command, mousePos);
        }
    }

    assignRandomValues(){
        shuffle(this.shelfPoints);
        shuffle(this.prices);

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].init(this.prices[i], {...this.shelfPoints[i].pos});
            this.foodItems[i].changeScale(this.scale);
        }
    }

    changeScale(scale){
        this.scale = {...scale};
        for(let i = 0; i < this.foodItems.length; i++){
            this.foodItems[i].changeScale(this.scale);
        }
        for(let i = 0; i < this.foodCopies.length; i++){
            this.foodCopies[i].changeScale(this.scale);
        }
    }

    dragFood(command, mousePos, boundarySize, boundaryPos){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].update(command, mousePos);
            if(command == Command.MOUSE_UP){
                if(!this.foodItems[i].isWithinBounds(boundarySize, boundaryPos)){
                    this.foodItems[i].resetPosition();
                }
            }
        }
    }

    autoSelectRandom(){
        this.foodCopies = [];
        const spawnCount = 2 + Math.floor(Math.random() * 2); // 2 or 3
        const indices = [];
        while(indices.length < spawnCount){
            const idx = Math.floor(Math.random() * TOTAL_FOOD);
            if(!indices.includes(idx)){
                indices.push(idx);
            }
        }

        for(let i = 0; i < indices.length; i++){
            const source = this.foodItems[indices[i]];
            const copy = new FoodItem();
            copy.setUnique(source.name, source.texture, {...source.initial.size});
            copy.init(source.value, {...this.dropZonePoints[i].pos});
            copy.changeScale(this.scale);
            this.foodCopies.push(copy);
        }

        let total = 0;
        for(let i = 0; i < this.foodCopies.length; i++){
            total = total + this.foodCopies[i].value;
        }
    }

    draw(ctx){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].draw(ctx);
        }
    }

    drawCopies(ctx){
        for(let i = 0; i < this.foodCopies.length; i++){
            if(this.foodCopies[i] !== null){
                this.foodCopies[i].draw(ctx);
            }
        }
    }
}

function shuffle(array){
    let currentIndex = array.length;
    while(currentIndex !== 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}