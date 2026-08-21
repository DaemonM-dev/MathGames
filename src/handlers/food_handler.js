import { Command } from "../constants.js";
import { FoodItem } from "../gameplay/fooditem.js";

const TOTAL_FOOD = 8;
const FOOD_SIZE = { x: 150, y: 150 };

export class FoodHandler{
    constructor(assets){

        const foodID = [
            { name: "chocolateCake", asset: 'chocolatecake' },
            { name: "cupcake", asset: 'cupcakes' },
            { name: "fruitBowl", asset: 'fruitbowl' },
            { name: "fruitCake", asset: 'fruitcake' },
            { name: "mintCake", asset: 'mintcake' },
            { name: "onigiri", asset: 'onigiri' },
            { name: "salad", asset: 'salad' },
            { name: "tofu", asset: 'tofu' }
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

        this.prices = [
            {value: 3.50},
            {value: 4.00},
            {value: 4.75},
            {value: 5.25},
            {value: 5.00},
            {value: 4.50},
            {value: 4.25},
            {value: 3.75},
        ];

        this.foodItems = [];

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems.push(new FoodItem(foodID[i].name,
                                this.prices[i].value,
                                assets.getAsset(foodID[i].asset),
                                FOOD_SIZE,
                                this.shelfPoints[i].pos));
        }
        console.log(this.foodItems);

        this.assignRandomValues();
    }

    assignRandomValues(){
        shuffle(this.shelfPoints);
        shuffle(this.prices);

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].setPosition(this.shelfPoints[i].pos);
            this.foodItems[i].setValue(this.prices[i].value);
        }
    }

    changeScale(scale){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].changeScale(scale);
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
    draw(ctx){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].draw(ctx);
        }
    }
}

function shuffle(array){
    console.log("Shuffling array: ", [...array]);
    let currentIndex = array.length;
    while(currentIndex !== 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    console.log("New array order: ", [...array]);
}