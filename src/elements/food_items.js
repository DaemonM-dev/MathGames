import { DynamicObject } from '../objects/dynamic_object.js';
import { Commands } from '../constants.js'

export class FoodItems{
    constructor(){
        this.startPositions = [];
        this.foodArray = [];
    }

    init(assets){
        this.startPositions.push({ x: 245, y: 140 });
        this.startPositions.push({ x: 468, y: 140 });
        this.startPositions.push({ x: 695, y: 145 });
        this.startPositions.push({ x: 920, y: 142 });
        this.startPositions.push({ x: 240, y: 375 });
        this.startPositions.push({ x: 472, y: 380 });
        this.startPositions.push({ x: 698, y: 378 });
        this.startPositions.push({ x: 925, y: 380 });

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

        const imgScale = 0.5;
        const imgSize = { x: 300 * imgScale, y: 300 * imgScale};

        for(let i = 0; i < foodID.length; i++){
            this.foodArray.push( new DynamicObject(foodID[i].name, assets.getAsset(foodID[i].asset), this.startPositions[i], imgSize));
        }
    }

    update(command, mousePos, scale, dropZone, deltaTime){
        switch(command){
            case Commands.MOUSE_DOWN:
                    for(let i = 0; i < this.foodArray.length; i++){
                        if(this.foodArray[i].isSelected(mousePos)){
                            this.foodArray[i].select();
                            const [obj] = this.foodArray.splice(i, 1);
                            this.foodArray.push(obj);
                            break;
                        }
                    }
            break;
            case Commands.MOUSE_UP:
                for(let i = 0; i < this.foodArray.length; i++){
                    if(this.foodArray[i].selected){
                        if(!this.foodArray[i].isWithinRect(dropZone)){
                            this.foodArray[i].reset();
                        }
                        this.foodArray[i].deselect();
                    }
                }
            break;
            case Commands.SPACEBAR_DOWN:
                this.resetToRandomPositions();
            break;
        }

        for(let i = 0; i < this.foodArray.length; i++){
            this.foodArray[i].update(mousePos, scale, deltaTime);
        }
    }

    draw(ctx){
        for(let i = 0; i < this.foodArray.length; i++){ this.foodArray[i].draw(ctx); }
    }

    resetToRandomPositions(){
        const positions = this.shuffledPositions(this.startPositions);

        for(let i = 0; i < this.foodArray.length; i++){
            const obj = this.foodArray[i];
            const newPos = positions[i];

            obj.cachedPos = {...newPos};
            obj.pos = {
                x: newPos.x * obj.scale.x,
                y: newPos.y * obj.scale.y
            };
        }
    }

    shuffledPositions(positions){
        const shuffled = [...positions];

        for(let i = shuffled.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }
}