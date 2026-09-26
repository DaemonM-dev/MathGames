import {GAME_SIZE} from '../../globals.js'
import { Command } from '../../enums/commands.js';
import { Button } from './button.js'

export class MainMenu{
    constructor(){
        this.scale = 1.0;
        this.bg = null;

        this.easyButton = null;
        this.hardButton = null;
    }

    changeScale(scale){
        this.scale = scale;

        if(this.easyButton){this.easyButton.changeScale(this.scale);}
        if(this.hardButton){this.hardButton.changeScale(this.scale);}
    }

    init(assets){
        this.bg = assets.getAsset('startMenu');

        this.easyButton = new Button();
        this.hardButton = new Button();

        // Shape
        let SIZE = {x:435, y: 120};
        let POS = {x:1220, y:380};
        let RADIUS = 15;
        let LINEWIDTH = 2;
        let FONTSIZE = 40;
        let TEXT = "Regular Mode";

        // Colors
        let DEF = {infill: '#f3b255', outline: '#f3b255'};
        let HOVER = {infill: '#d3a25e', outline: '#d3a25e'};
        let PRESS = {infill: '#f3b255', outline: '#f3b255'};
        let FONT = 'black';

        this.easyButton.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.easyButton.setColors(DEF, HOVER, PRESS, FONT);


        POS = {x:1220, y:530};
        TEXT = "Challenge Mode";

        this.hardButton.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.hardButton.setColors(DEF, HOVER, PRESS, FONT);

    }

    update(command, mousePos){
        this.easyButton.update(command, mousePos);
        this.hardButton.update(command, mousePos);
    }

    draw(ctx){
        ctx.drawImage(this.bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
        this.easyButton.draw(ctx);
        this.hardButton.draw(ctx);
    }
}