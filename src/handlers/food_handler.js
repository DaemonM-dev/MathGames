import { getRandomInt } from '../globals.js'
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

        this.prices = [ 2, 3, 4, 5, 6, 7, 8, 9 ];
        this.pricesDec = [ 2.75, 3.50, 4.25, 5.75, 6.50, 7.25, 8.75, 9.50 ];

        this.dropZonePoints = [
            {pos:{x:1375, y: 300}},
            {pos:{x:1525, y: 300}},
            {pos:{x:1675, y: 300}},
            {pos:{x:1375, y: 450}},
            {pos:{x:1525, y: 450}},
            {pos:{x:1675, y: 450}}
        ];

        this.foodItems = []; // original 8 food items
        this.copies = [];
        this.duplicates = []; // 1 food item duplicated 2 - 6 times

        this.priceTags = [];
        this.scale = {x:1.0, y:1.0};

        this.dropzoneSum = 0;
        this.foodInDropzone = 0;

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
    }

    assignRandomValues(level){
        shuffle(this.shelfPoints);
        shuffle(this.prices);
        shuffle(this.pricesDec);

        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].init(this.prices[i], {...this.shelfPoints[i].pos});
            this.priceTags[i] = new Pricetag({x:this.shelfPoints[i].pos.x + 25, y:this.shelfPoints[i].pos.y + 150}, this.prices[i]);
            this.priceTags[i].changeScale(this.scale);
            this.foodItems[i].changeScale(this.scale);
        };
    }

    changeScale(scale){
        this.scale = {...scale};
        for(let i = 0; i < this.foodItems.length; i++){
            this.foodItems[i].changeScale(this.scale);
            this.priceTags[i].changeScale(this.scale);
            if(this.copies[i]){this.copies[i].changeScale(this.scale);}
            if(this.duplicates[i]){this.duplicates[i].changeScale(this.scale);}
        }
    }

    update(command, mousePos, bounds){
        this.handleFoodSelection(command, mousePos, bounds);
    }


    duplicateRandom(){
        console.log("Duplicating...");
        this.duplicates = [];
        const COUNT = getRandomInt(2, 6);
        const INDEX = getRandomInt(0, TOTAL_FOOD - 1);
        const ORIGINAL = this.foodItems[INDEX];
        let sum = 0;
        for(let i = 0; i < COUNT; i++){
            const COPY = new FoodItem();
            COPY.setUnique(ORIGINAL.name, ORIGINAL.texture, {...ORIGINAL.initial.size});
            COPY.init(ORIGINAL.value, {...this.dropZonePoints[i].pos});
            COPY.changeScale(this.scale);
            this.duplicates.push(COPY);
            sum = sum + ORIGINAL.value;
        }
        /*
        console.log("Food: ", ORIGINAL.name, " Count: ", COUNT, " Sum: ", sum);
        console.log("Duplication complete.");
        */
    }

    copyRandom(){
        console.log("Copying...");
        this.copies = [];
        const COUNT = getRandomInt(2, 3);
        const INDICES = [];
        let sum = 0;
        while(INDICES.length < COUNT){
            const INDEX = getRandomInt(0, TOTAL_FOOD - 1);
            if(!INDICES.includes(INDEX)){INDICES.push(INDEX);}
        }
        for(let i = 0; i < COUNT; i++){
            const ORIGINAL = this.foodItems[INDICES[i]];
            const COPY = new FoodItem();
            COPY.setUnique(ORIGINAL.name, ORIGINAL.texture, {...ORIGINAL.initial.size});
            switch(i){
                case 0: COPY.init(ORIGINAL.value, {...this.dropZonePoints[0].pos}); break;
                case 1: COPY.init(ORIGINAL.value, {...this.dropZonePoints[2].pos}); break;
                case 2: COPY.init(ORIGINAL.value, {...this.dropZonePoints[4].pos}); break;
            }
            COPY.changeScale(this.scale);
            this.copies.push(COPY);
            sum = sum + ORIGINAL.value;
        }
        /*
        if(COUNT === 2){console.log("Food: ", this.copies[0].name, ", ", this.copies[1].name, " Sum: ", sum);}
        else if(COUNT === 3){console.log("Food: ", this.copies[0].name, ", ", this.copies[1].name, ", ", this.copies[2].name, " Sum: ", sum);}
        console.log("Copying complete.")
        */
    }

    reset(){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.foodItems[i].resetPosition();
        }
        this.dropzoneSum = 0;
        this.foodInDropzone = 0;
    }

    draw(level, ctx){
        for(let i = 0; i < TOTAL_FOOD; i++){
            this.priceTags[i].draw(ctx);
            this.foodItems[i].draw(ctx);
        }
        if(level === 1 || level === 3){
            for(let i = 0; i < this.copies.length; i++){
                if(this.copies[i]){this.copies[i].draw(ctx);}
            }
        } else if (level === 4){
            for(let i = 0; i < this.duplicates.length; i++){
                if(this.duplicates[i]){this.duplicates[i].draw(ctx);}
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
        let count = 0;

        for(let i = 0; i < TOTAL_FOOD; i++){
            if(this.foodItems[i].isWithinBounds(bounds.size, bounds.pos)){
                SUM = SUM + this.foodItems[i].value;
                count++;
            }
        }

        this.dropzoneSum = SUM;
        this.foodInDropzone = count;
        
        console.log("Sum in Dropzone: ", SUM);
        console.log("Food Count in Dropzone: ", count);
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