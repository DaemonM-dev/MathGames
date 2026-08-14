import { GAME_WIDTH, GAME_HEIGHT, Commands } from '../../src/constants.js'
import { StaticObject, Rect } from '../objects/static_object.js'
import { DynamicObject } from '../objects/dynamic_object.js'

export class UiHandler{
    constructor(){
        this.rectangles = [];
        this.staticObjects = [];
        this.dynamicObjects = [];

        this.selectedObject = false;
        this.dropZone = null;

        this.slotPositions = [
            { x: 250, y: 140 },
            { x: 468, y: 155 },
            { x: 695, y: 145 },
            { x: 920, y: 142 },
            { x: 253, y: 370 },
            { x: 472, y: 380 },
            { x: 698, y: 378 },
            { x: 925, y: 400 }
        ];
    }
    
    init(assets){
        this.initStaticObjects(assets);
        this.initDynamicObjects(assets);
        this.initRectangles();
    }

    update(command, mousePos, scale, deltaTime){
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
                        if(!this.dynamicObjects[i].isWithinRect(this.dropZone)){
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
        for(let i = 0; i < this.rectangles.length; i++){ this.rectangles[i].draw(ctx); } // Comic Strip border
        for(let i = 1; i < this.staticObjects.length; i++){ this.staticObjects[i].draw(ctx); }
        for(let i = 0; i < this.dynamicObjects.length; i++){ this.dynamicObjects[i].draw(ctx); }
    }

    initStaticObjects(assets){
        this.staticObjects.push(new StaticObject("background", assets.getAsset('background'), {x:0.0, y:0.0}, {x:1280, y:720}));

        let objScale = 0.35;
        let objSize = {x: 300 * objScale, y: 200 * objScale};
        this.staticObjects.push(new StaticObject("money", assets.getAsset('money'), {x:1500,y:150}, objSize));

        objScale = 0.75;
        objSize = {x: 450 * objScale, y: 600 * objScale};
        this.staticObjects.push(new StaticObject("boy", assets.getAsset('boy'), {x:0, y:GAME_HEIGHT - objSize.y}, objSize));
        this.staticObjects.push(new StaticObject("girl", assets.getAsset('girl'), {x:1280 - objSize.x, y:GAME_HEIGHT - objSize.y}, objSize));
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
    initRectangles(){
        const barWidth = 20.0;
        const vertSize = {x: barWidth, y: GAME_HEIGHT};
        const vertPos = {x: this.staticObjects[0].texture.width - (vertSize.x / 2.0), y: 0.0};
        const horizSize = {x: this.staticObjects[0].texture.width, y: barWidth};
        const horizPos = {x: 0.0, y: this.staticObjects[0].texture.height - (horizSize.y / 2.0)};

        const whiteRect = new Rect(this.staticObjects[0].texture.width, 0.0, GAME_WIDTH - this.staticObjects[0].texture.width, GAME_HEIGHT, 'white');
        this.rectangles.push(whiteRect);
        this.rectangles.push(new Rect(vertPos.x, vertPos.y, vertSize.x, vertSize.y, 'black'));
        this.rectangles.push(new Rect(horizPos.x, horizPos.y, horizSize.x, horizSize.y, 'black'));

        this.dropZone = whiteRect;
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