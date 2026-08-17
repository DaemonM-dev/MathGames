import { GAME_WIDTH, GAME_HEIGHT, Commands } from '../../src/constants.js'
import { StaticObject, Rect } from '../objects/static_object.js'
import { DynamicObject } from '../objects/dynamic_object.js'
import { Level } from '../objects/levels.js'

export class UiHandler{
    constructor(){
        this.dynamicObjects = [];
        this.selectedObject = false;
        this.slotPositions = [
            { x: 245, y: 140 },
            { x: 468, y: 140 },
            { x: 695, y: 145 },
            { x: 920, y: 142 },
            { x: 240, y: 375 },
            { x: 472, y: 380 },
            { x: 698, y: 378 },
            { x: 925, y: 380 }
        ];
    }
    
    init(assets){
        this.initDynamicObjects(assets);
    }

    update(command, mousePos, dropZone, scale, deltaTime){
        switch(command) {
            case Commands.MOUSE_DOWN:
                if(!this.selectedObject){
                    for(let i = 0; i < this.dynamicObjects.length; i++){
                        if(this.dynamicObjects[i].isSelected(mousePos)){
                            this.dynamicObjects[i].select();
                            this.selectedObject = true;

                            const [obj] = this.dynamicObjects.splice(i, 1);
                            this.dynamicObjects.push(obj);
                            break;
                        }
                    }
                }
            break;
            case Commands.MOUSE_UP:
                for(let i = 0; i < this.dynamicObjects.length; i++){
                    if(this.dynamicObjects[i].selected){
                        if(!this.dynamicObjects[i].isWithinRect(dropZone)){
                            this.dynamicObjects[i].reset();
                        }
                        this.dynamicObjects[i].deselect();
                        this.selectedObject = false;
                    }
                }    
            break;
            case Commands.SPACEBAR_DOWN:
                this.randomizeDynamicObjects();
            break;
        }

        for(let i = 0; i < this.dynamicObjects.length; i++){
            this.dynamicObjects[i].update(mousePos, scale, deltaTime);
        }
    }

    draw(ctx){
        for(let i = 0; i < this.dynamicObjects.length; i++){ this.dynamicObjects[i].draw(ctx); }
    }

    initDynamicObjects(assets){
        const objScale = 0.5;
        const objSize = {x: 300 * objScale, y: 300 * objScale};

        const foods = [
            { name: "chocolateCake", asset: 'chocolatecake' },
            { name: "cupcake", asset: 'cupcakes' },
            { name: "fruitBowl", asset: 'fruitbowl' },
            { name: "fruitCake", asset: 'fruitcake' },
            { name: "mintCake", asset: 'mintcake' },
            { name: "onigiri", asset: 'onigiri' },
            { name: "salad", asset: 'salad' },
            { name: "tofu", asset: 'tofu' }
        ];

        const positions = this.shuffledPositions();

        for(let i = 0; i < foods.length; i++){
            this.dynamicObjects.push(
                new DynamicObject(foods[i].name, assets.getAsset(foods[i].asset), positions[i], objSize)
            );
        }
    }
    randomizeDynamicObjects(){
        const positions = this.shuffledPositions();

        for(let i = 0; i < this.dynamicObjects.length; i++){
            const obj = this.dynamicObjects[i];
            const newPos = positions[i];

            obj.initialPos = {...newPos};
            obj.cachedPos = {...newPos};
            obj.pos = {
                x: newPos.x * obj.scale.x,
                y: newPos.y * obj.scale.y
            };
        }
    }
    shuffledPositions(){
        const positions = [...this.slotPositions];
        for(let i = positions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }
        return positions;
    }
}