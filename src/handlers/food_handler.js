import { GAME_SIZE, getRandomInt, shuffle, pointIntersects } from '../globals.js'
import { Command } from '../enums/commands.js'
import { FoodItem } from '../gameplay/elements/food_item.js'
import { Pricetag } from '../gameplay/elements/pricetag.js';

const MAX_FOOD = 8;

export class FoodHandler{
    constructor(){
        this.scale = 1.0;

        this.foodID = [
            { name: "the slice of Chocolate Cake", asset: 'chocolatecake', type: 'Sweet' },
            { name: "the Cupcakes", asset: 'cupcakes', type: 'Sweet' },
            { name: "the Fruit Bowl", asset: 'fruitbowl', type: 'Healthy' },
            { name: "the slice of Fruit Cake", asset: 'fruitcake', type: 'Sweet' },
            { name: "the slice of Matcha Cake", asset: 'mintcake', type: 'Sweet' },
            { name: "the Rice Cakes", asset: 'onigiri', type: 'Healthy' },
            { name: "the Salad", asset: 'salad', type: 'Healthy' },
            { name: "the Tofu", asset: 'tofu', type: 'Healthy' }
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

        this.dropzonePoints = [
            {pos:{x:1375, y: 300}},
            {pos:{x:1525, y: 300}},
            {pos:{x:1675, y: 300}},
            {pos:{x:1375, y: 450}},
            {pos:{x:1525, y: 450}},
            {pos:{x:1675, y: 450}}
        ];

        this.prices = [ 2, 3, 4, 5, 6, 7, 8, 9 ];
        this.priceTags = [];

        this.foodItems = [];
        this.copies = [];
        this.duplicates = [];
        this.foodInDropzone = [];
        this.dropzoneCount = 0;

        this.itemSelected = false;
        this.selectionIndex = 0;
    }

    changeScale(scale){
        this.scale = scale;
        for(let i = 0; i < this.foodItems.length;i++){
            if(this.foodItems[i]){this.foodItems[i].changeScale(this.scale);}
        }
        for(let i = 0; i < this.copies.length;i++){
            if(this.copies[i]){this.copies[i].changeScale(this.scale);}
        }
        for(let i = 0; i < this.duplicates.length;i++){
            if(this.duplicates[i]){this.duplicates[i].changeScale(this.scale);}
        }
        for(let i = 0; i < this.priceTags.length;i++){
            if(this.priceTags[i]){this.priceTags[i].changeScale(this.scale);}
        }
    }

    init(assets){
        const SIZE = {x:150, y:150};
        for(let i = 0; i < MAX_FOOD; i++){
            this.foodItems.push(new FoodItem());
            const TEXTURE = assets.getAsset(this.foodID[i].asset);
            const NAME = this.foodID[i].name;
            const TYPE = this.foodID[i].type;
            const VALUE = this.prices[i];
            const POS = this.shelfPoints[i].pos;
            this.foodItems[i].setUnique(TEXTURE, NAME, TYPE, SIZE);
            this.foodItems[i].setDynamic(VALUE, POS);
            this.priceTags.push(new Pricetag({x: POS.x + 25, y: POS.y + 150}, VALUE));
        }
        this.randomiseDynamic();
    }

    update(level, command, mousePos, dropzone){
        if(level === 2 || level === 5){
            switch(command){
                case Command.MOUSE_DOWN:
                    if(!this.itemSelected){
                        for(let i = 0; i < this.foodItems.length; i++){
                            if(pointIntersects(mousePos, this.foodItems[i])){
                                this.foodItems[i].select();
                                this.selectionIndex = i;
                                this.itemSelected = true;
                            }
                        }
                    }
                break;
                case Command.MOUSE_UP:
                    if(this.itemSelected){
                        if(pointIntersects(this.foodItems[this.selectionIndex], dropzone)){
                            this.foodInDropzone.push(this.foodItems[this.selectionIndex]);
                            this.dropzoneCount++;
                        } else {
                            for(let i = 0; i < this.foodInDropzone.length; i++){
                                if(this.foodItems[this.selectionIndex] === this.foodInDropzone[i]){
                                    this.foodInDropzone.splice(i, 1);
                                    this.dropzoneCount--;
                                    break;
                                }
                            }
                            this.foodItems[this.selectionIndex].reset();
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
    }

    draw(level, ctx){
        for(let i = 0; i < this.foodItems.length; i++){
            if(this.priceTags[i]){this.priceTags[i].draw(ctx);}
            if(this.foodItems[i]){this.foodItems[i].draw(ctx);}
        }
        switch(level){
            case 1: case 3:
                for(let i = 0; i < this.copies.length; i++){
                if(this.copies[i]){this.copies[i].draw(ctx);}
            }
            break;
            case 4:
                for(let i = 0; i < this.duplicates.length; i++){
                if(this.duplicates[i]){this.duplicates[i].draw(ctx);}
            }
            break;
        }
    }

    randomiseDynamic(){
        shuffle(this.shelfPoints);
        shuffle(this.prices);
        for(let i = 0; i < this.shelfPoints.length; i++){
            const VALUE = this.prices[i];
            const POS = this.shelfPoints[i].pos;
            this.foodItems[i].setDynamic(VALUE, POS);
            this.priceTags[i] = new Pricetag({x:POS.x + 25, y:POS.y + 150}, VALUE);
            this.foodItems[i].changeScale(this.scale);
            this.priceTags[i].changeScale(this.scale);
        }
    }

    duplicateRandom(){
        this.duplicates = [];
        const COUNT = getRandomInt(2, 6);
        const INDEX = getRandomInt(0, this.foodItems.length - 1);
        const ORIGINAL = this.foodItems[INDEX];

        for(let i = 0; i < COUNT; i++){
            const ORIGINAL = this.foodItems[INDEX];
            const DUP = new FoodItem();
            DUP.setUnique(ORIGINAL.texture, ORIGINAL.name, ORIGINAL.type, {...ORIGINAL.initial.size});
            DUP.setDynamic(ORIGINAL.value, {...this.dropzonePoints[i].pos});
            DUP.changeScale(this.scale);
            this.duplicates.push(DUP);
        }
    }

    copyRandom(){
        this.copies = [];
        const COUNT = getRandomInt(2, 3);
        const INDICES = [];
        while(INDICES.length < COUNT){
            const INDEX = getRandomInt(0, this.foodItems.length - 1);
            if(!INDICES.includes(INDEX)){INDICES.push(INDEX);}
        }
        for(let i = 0; i < COUNT; i++){
            const ORIGINAL = this.foodItems[INDICES[i]];
            const COPY = new FoodItem();
            COPY.setUnique(ORIGINAL.texture, ORIGINAL.name, ORIGINAL.type, {...ORIGINAL.initial.size});
            switch(i){
                case 0: COPY.setDynamic(ORIGINAL.value, {...this.dropzonePoints[0].pos}); break;
                case 1: COPY.setDynamic(ORIGINAL.value, {...this.dropzonePoints[2].pos}); break;
                case 2: COPY.setDynamic(ORIGINAL.value, {...this.dropzonePoints[4].pos}); break;
            }
            COPY.changeScale(this.scale);
            this.copies.push(COPY);
        }
    }

    getSumFromDropzone(){
        if(!this.foodInDropzone || this.foodInDropzone.length === 0){return 0;}
        let SUM = 0;
        for(let i = 0; i < this.foodInDropzone.length; i++){
            SUM = SUM + this.foodInDropzone[i].value;
        }
        return SUM;
    }

    getCountFromDropzone(){
        return this.foodInDropzone.length;
    }
    getFoodTypesFromDropzone(){
        let foodTypes = {healthy: 0, sweet: 0};

        for(let i = 0; i < this.foodInDropzone.length; i++){
            switch(this.foodInDropzone[i].type){
                case 'Healthy': foodTypes.healthy++; break;
                case 'Sweet': foodTypes.sweet++; break;
            }
        }

        return foodTypes;

    }

    restorePositions(){
        this.foodInDropzone = [];
        for(let i = 0; i < this.foodItems.length; i++){
            this.foodItems[i].reset();
        }
    }
}