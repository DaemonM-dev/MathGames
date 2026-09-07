import { GAME_SIZE, getRandomInt, shuffle } from '../globals.js'
import { Command } from '../enums/commands.js'
import { FoodItem } from '../gameplay/elements/food_item.js'

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

        this.foodItems = [];
        this.copies = [];
        this.duplicates = [];

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
        }
        this.randomiseDynamic();
        console.log(this.foodItems);
    }

    draw(level, ctx){
        for(let i = 0; i < this.foodItems.length; i++){
            if(this.foodItems[i]){this.foodItems[i].draw(ctx);}
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

    randomiseDynamic(){
        shuffle(this.shelfPoints);
        shuffle(this.prices);
        for(let i = 0; i < this.shelfPoints.length; i++){
            const VALUE = this.prices[i];
            const POS = this.shelfPoints[i].pos;
            this.foodItems[i].setDynamic(VALUE, POS);
        }
    }
}