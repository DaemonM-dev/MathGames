import { Command } from "../constants.js";
import { FoodItem } from "../gameplay/fooditem.js";
import { Pricetag } from "../gameplay/pricetags.js"

const TOTAL_FOOD = 8;
const FOOD_SIZE = { x: 150, y: 150 };

export class FoodHandler{
    constructor(assets){

        const foodID = [
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

        this.dropZonePoints = [
            {pos:{x:1400, y: 300}},
            {pos:{x:1650, y: 300}},
            {pos:{x:1525, y: 450}}
        ];

        this.prices = [ 3.50, 4.00, 4.75, 5.25, 5.00, 4.50, 4.25, 3.75, ];

        this.foodItems = [];
        this.foodCopies = [null, null, null];

        this.priceTags = [];

        this.scale = { x: 1.0, y: 1.0 };

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems.push(new FoodItem(foodID[i].name,
                                this.prices[i],
                                assets.getAsset(foodID[i].asset),
                                FOOD_SIZE,
                                this.shelfPoints[i].pos));
                                this.priceTags.push(new Pricetag({x:this.shelfPoints[i].pos.x + 25,y:this.shelfPoints[i].pos.y + 150}, this.prices[i]));
                            }

        this.assignRandomValues();
        this.autoSelectRandom();
    }

    assignRandomValues(){
        shuffle(this.shelfPoints);
        shuffle(this.prices);

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].setPosition(this.shelfPoints[i].pos);
            this.foodItems[i].setValue(this.prices[i]);
            this.priceTags[i] = new Pricetag({x:this.shelfPoints[i].pos.x + 25, y:this.shelfPoints[i].pos.y + 150}, this.prices[i]);
        }
    }

    changeScale(scale){
        this.scale = scale;

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].changeScale(scale);
            this.priceTags[i].changeScale(scale);
        }

        for(let i = 0; i < this.foodCopies.length; i++){
            if(this.foodCopies[i] !== null){
                this.foodCopies[i].changeScale(scale);
            }
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
        let firstIndex = Math.floor(Math.random() * 8);
        let secIndex = Math.floor(Math.random() * 8);
        let thirdIndex = Math.floor(Math.random() * 8);

        while(secIndex === firstIndex){
            secIndex = Math.floor(Math.random() * 8)
        }

        this.foodCopies[0] = new FoodItem(
        this.foodItems[firstIndex].name,
        this.foodItems[firstIndex].value,
        this.foodItems[firstIndex].texture,
        FOOD_SIZE,
        this.dropZonePoints[0].pos
        );

        this.foodCopies[1] = new FoodItem(
        this.foodItems[secIndex].name,
        this.foodItems[secIndex].value,
        this.foodItems[secIndex].texture,
        FOOD_SIZE,
        this.dropZonePoints[1].pos
        );

        this.foodCopies[0].setPosition(this.dropZonePoints[0].pos);
        this.foodCopies[1].setPosition(this.dropZonePoints[1].pos);

        let spawnThree = Math.floor(Math.random() * 2);
        if(spawnThree === 1){
            while(thirdIndex === firstIndex || thirdIndex === secIndex){
                thirdIndex = Math.floor(Math.random() * 8);
            }
           
            this.foodCopies[2] = new FoodItem(
            this.foodItems[thirdIndex].name,
            this.foodItems[thirdIndex].value,
            this.foodItems[thirdIndex].texture,
            FOOD_SIZE,
            this.dropZonePoints[2].pos
            );

            this.foodCopies[2].setPosition(this.dropZonePoints[2].pos);
        }
    }

    // Re-randomizes the 8 shelf items (position + value) and picks 3 new
    // copies for the drop zone. Called at the start of a new question.
    reset(){
        this.assignRandomValues();
        this.autoSelectRandom();

        // Only the priceTags and foodCopies are freshly constructed here
        // (assignRandomValues repositions the existing foodItems rather
        // than recreating them, so they're already correctly scaled and
        // must NOT be scaled again — doing so would compound their size
        // smaller and smaller on every reset). Scale just the new objects.
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.priceTags[i].changeScale(this.scale);
        }
        for(let i = 0; i < this.foodCopies.length; i++){
            if(this.foodCopies[i] !== null){
                this.foodCopies[i].changeScale(this.scale);
            }
        }
    }

    draw(ctx){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].draw(ctx);
            this.priceTags[i].draw(ctx);
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
    console.log("Shuffling array");
    let currentIndex = array.length;
    while(currentIndex !== 0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}