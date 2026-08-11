import { TextBubble } from './text_bubble.js';
import { Character } from './character.js';
import { FoodItem } from './food.js';


export class UiHandler{
    constructor(){
        this.background = null;
        this.textBubble = null;
        this.boy = null;
        this.girl = null;

        this.choc_cake = null;
        this.fruit_cake = null;
        this.fruit = null;
        this.mint_cake = null;
        this.onigiri = null;
        this.salad = null;
        this.tofu = null;
    }
    
    initUI(scale, assets, ctx){
        this.background = assets.getAsset('background');
        this.initCharacters(scale, assets, ctx);
        this.initTextBubble(scale, ctx);
        this.initFoods(scale, assets);
    }

    updateUI(scale, ctx, deltaTime){
        this.textBubble.update(scale, ctx, deltaTime);
        this.boy.updateBoy(scale, ctx, deltaTime);
        this.girl.updateGirl(scale, ctx, deltaTime);
    }

    drawUI(ctx){
        const halfWidth = ctx.canvas.width / 2;
        const halfHeight = ctx.canvas.height / 2;

        ctx.drawImage(this.background, 0, 0, halfWidth, halfHeight);

        ctx.fillStyle = "#9bd7b5";
        ctx.fillRect(0, halfHeight, halfWidth, halfHeight)

        ctx.strokeRect(0, 0, halfWidth, halfHeight);
        ctx.strokeRect(0, halfHeight, halfWidth, halfHeight);


        if(this.boy){this.boy.draw(ctx)};
        if(this.girl){this.girl.draw(ctx)};
        if(this.textBubble){this.textBubble.draw(ctx);}
        this.drawFoods(ctx);
    }

    resizeUI(scale){
        if(this.scale.x !== scale.x || this.scale.y !== scale.y){
            console.log("Old Scale for UI: ", this.scale);
            this.scale = scale;
            console.log("New Scale for UI: ", this.scale);
        }
    }

    initTextBubble(newScale, ctx){
        const size = {x:500 / 3 , y:225 / 4};
        const lineWidth = 3 * Math.min(newScale.x, newScale.y);
        const pos = {x: (ctx.canvas.width / 4) - ((size.x * newScale.x) / 2),
                     y: ctx.canvas.height - size.y - (lineWidth / 2)};
        const radius = 15;
        const fontSize = 24;
        const color = '#f0b155';
        const scale = {x: newScale.x, y: newScale.y};

        this.textBubble = new TextBubble(pos, size, radius, lineWidth,
                                         fontSize, color, scale);
    }

    initCharacters(newScale, assets, ctx){
        let size = {x:(417 / 2) * 0.7 , y:(567.25 / 2) * 0.7};
        let position = {x: 0,y: ctx.canvas.height - size.y};
        this.boy = new Character(assets.getAsset('boy'), position, size);

        size = {x:(588 / 2) * 0.5, y:(743 / 2) * 0.5};
        position = {x: (ctx.canvas.width / 2) - size.x, y: ctx.canvas.height - size.y};
        this.girl = new Character(assets.getAsset('girl_left'), position, size);
    }

    initFoods(scale, assets){

        const imgSize = {x: 1772 * 0.05, y: 1801 * 0.05};

        this.choc_cake = new FoodItem(assets.getAsset('choc_cake'),
        'choc_cake', // Name
        imgSize, // Size
        {x: 175 , y: 100}, // Position
        scale,15);

        this.fruit_cake = new FoodItem(assets.getAsset('fruit_cake'),
        'fruit_cake',
        imgSize,
        {x: 290 , y: 95},
        scale,15);

        this.fruit = new FoodItem(assets.getAsset('fruit'),
        'fruit',
        imgSize,
        {x: 407 , y: 95},
        scale,15);

        this.mint_cake = new FoodItem(assets.getAsset('mint_cake'),
        'mint_cake',
        imgSize,
        {x: 528 , y: 95},
        scale,15);

        this.onigiri = new FoodItem(assets.getAsset('onigiri'),
        'onigiri',
        imgSize,
        {x: 175 , y: 230},
        scale,15);

        this.salad = new FoodItem(assets.getAsset('salad'),
        'salad',
        imgSize,
        {x: 290 , y: 225},
        scale,15);

        this.tofu = new FoodItem(assets.getAsset('tofu'),
        'tofu',
        imgSize,
        {x: 410 , y: 235},
        scale,15);
    }

    drawFoods(ctx){
        this.choc_cake.draw(ctx);
        this.fruit_cake.draw(ctx);
        this.fruit.draw(ctx);
        this.mint_cake.draw(ctx);
        this.onigiri.draw(ctx);
        this.salad.draw(ctx);
        this.tofu.draw(ctx);
    }
}