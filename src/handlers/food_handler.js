import { Command } from '../enums/commands.js'
import { FoodItem } from '../gameplay/elements/food_item.js'
import { Pricetag } from '../gameplay/elements/pricetag.js'

const TOTAL_FOOD = 8;
const FOOD_SIZE = { x: 150, y: 150 };

export class FoodHandler{
    constructor(){
        this.foodID = [
            { name: "the slice of Chocolate Cake", asset: 'chocolatecake' },
            { name: "the Cupcakes", asset: 'cupcakes' },
            { name: "the Fruit Bowl", asset: 'fruitbowl' },
            { name: "the slice of Fruit Cake", asset: 'fruitcake' },
            { name: "the slice of Matcha Cake", asset: 'mintcake' },
            { name: "the Rice Cakes", asset: 'onigiri' },
            { name: "the Salad", asset: 'salad' },
            { name: "the Tofu", asset: 'tofu' }
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

        /*
        this.prices = [ 3.50, 4.00, 4.75, 5.25, 5.00, 4.50, 4.25, 3.75, ];
        */
        this.prices = [ 3, 4, 4, 5, 5, 4, 4, 3, ];

        this.dropZonePoints = [
            {pos:{x:1400, y: 300}},
            {pos:{x:1650, y: 300}},
            {pos:{x:1525, y: 450}}
        ];

        this.foodItems = [];
        this.foodCopies = [];
        this.priceTags = [];
        this.scale = {x:1.0, y:1.0};
        this.dropzoneSum = 0;

        this.itemSelected = false;
        this.selectionIndex = 0;
    }

    init(assets){
        const SIZE = { x: 150, y: 150 };
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems.push(new FoodItem());
            const name = this.foodID[i].name;
            const texture = assets.getAsset(this.foodID[i].asset);
            this.foodItems[i].setUnique(name, texture, SIZE);
            this.foodItems[i].init(this.prices[i], this.shelfPoints[i].pos);
            this.priceTags.push(new Pricetag({x:this.shelfPoints[i].pos.x + 25,y:this.shelfPoints[i].pos.y + 150}, this.prices[i]));
        }
        this.assignRandomValues();
        this.autoSelectRandom();
    }

    assignRandomValues(){
        shuffle(this.shelfPoints);
        shuffle(this.prices);

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].init(this.prices[i], {...this.shelfPoints[i].pos});
            this.priceTags[i] = new Pricetag({x:this.shelfPoints[i].pos.x + 25, y:this.shelfPoints[i].pos.y + 150}, this.prices[i]);
            this.priceTags[i].changeScale(this.scale);
            this.foodItems[i].changeScale(this.scale);
        }
    }

    changeScale(scale){
        this.scale = {...scale};
        for(let i = 0; i < this.foodItems.length; i++){
            this.foodItems[i].changeScale(this.scale);
            this.priceTags[i].changeScale(this.scale);
        }
        for(let i = 0; i < this.foodCopies.length; i++){
            this.foodCopies[i].changeScale(this.scale);
        }
    }

    update(command, mousePos, bounds){
        this.handleFoodSelection(command, mousePos, bounds);
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

    reset(){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].resetPosition();
        }
    }

    randomize(){
        this.assignRandomValues();
        this.autoSelectRandom();

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
            this.priceTags[i].draw(ctx);
        }
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
    handleFoodSelection(command, mousePos, bounds){
        switch(command){
            case Command.MOUSE_DOWN:
                if(!this.itemSelected){
                    for(let i = 0; i < this.foodItems.length; i++){
                        if(this.foodItems[i].intersects(mousePos)){
                            this.selectionIndex = i;
                            this.itemSelected = true;
                            console.log("Food Selected: ", this.foodItems[this.selectionIndex].name);
                            break;
                        }
                    }
                } 
                break;
            case Command.MOUSE_UP:
                if(this.itemSelected){
                    if(this.foodItems[this.selectionIndex].isWithinBounds(bounds.size, bounds.pos)){
                        this.dropzoneSum = this.getSumFromDropzone(bounds);
                    } else {
                        this.foodItems[this.selectionIndex].resetPosition();
                    }
                }
                this.foodItems[this.selectionIndex].deselect();
                this.selectionIndex = 0;
                this.itemSelected = false;
                break;
        }
        if(this.itemSelected){
            this.foodItems[this.selectionIndex].drag(mousePos);
        }
    }
    getSumFromDropzone(bounds){
        let SUM = 0;

        for(let i = 0; i < TOTAL_FOOD; i++){
            if(this.foodItems[i].isWithinBounds(bounds.size, bounds.pos)){
                SUM = SUM + this.foodItems[i].value;
            }
        }
        console.log("Sum in Dropzone: ", SUM);
        return SUM;
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