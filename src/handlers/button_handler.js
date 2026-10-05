import { GAME_SIZE } from '../globals.js'
import { Button } from '../gameplay/elements/button.js'
import {Language } from '../enums/language.js'

export class ButtonHandler{
    constructor(language, assets){
        this.language = language;
        this.scale = 1.0;

        this.submit     = new Button(assets);
        this.next       = new Button(assets);
        this.prev       = new Button(assets);
        this.menu       = new Button(assets);
        this.menuReturn = new Button(assets);
        this.restart    = new Button(assets);

        this.buttonArray = [
            this.submit,
            this.next,
            this.prev,
            this.menu,
            this.menuReturn
        ];

        this.viewingMenu    = false;
        this.viewingOptions = false;
        this.pressedButton  = null;

        this.init();
    }

    changeScale(scale){
        this.scale = scale;
        for(let i = 0; i < this.buttonArray.length; i++){
            if(this.buttonArray[i]){this.buttonArray[i].changeScale(this.scale);}
        }
        if(this.restart)
        {
            this.restart.changeScale(this.scale);
        }
    }

    init(){
        let SIZE        = {x:250, y: 100};
        let POS         = {x:1475 ,y: 875};
        let RADIUS      = 35;
        let LINEWIDTH   = 8;
        let FONTSIZE    = 50;
        let TEXT        = "Submit";
        let DEFCOLOR    = {infill: '#f3b15576', outline: '#f3b255'};
        let HOVERCOLOR  = {infill: '#f3b155bb', outline: '#f3b255'};
        let PRESSCOLOR  = {infill: '#f3b15576', outline: '#f3b15500'};
        let FONTCOLOR   = 'black';

        if(this.language === Language.IRISH)
        {
            TEXT = "Cuir isteach";
            FONTSIZE = 35;
        }
        this.submit.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.submit.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        // SIZE        = {x:50, y: 50};
        SIZE        = {x:60, y: 60};
        POS         = {x:900 ,y: 775};
        RADIUS      = 22;
        LINEWIDTH   = 5;
        FONTSIZE    = 50;
        TEXT        = "?";
        DEFCOLOR    = {infill: '#88a8d877', outline: '#88a8d8'};
        HOVERCOLOR  = {infill: '#88a8d8ce', outline: '#88a8d8'};
        PRESSCOLOR  = {infill: '#88a8d877', outline: '#88a8d800'};
        FONTCOLOR   = '#9bd7b5';
        this.next.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.next.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE        = {x:50, y: 50};
        POS         = {x:325 ,y: 800};
        RADIUS      = 22;
        LINEWIDTH   = 5;
        FONTSIZE    = 50;
        TEXT        = "<";
        DEFCOLOR    = {infill: '#88a8d877', outline: '#88a8d8'};
        HOVERCOLOR  = {infill: '#88a8d8ce', outline: '#88a8d8'};
        PRESSCOLOR  = {infill: '#88a8d877', outline: '#88a8d800'};
        FONTCOLOR   = '#9bd7b5';
        this.prev.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.prev.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE        = {x:325, y: 40};
        POS         = {x:500 ,y: 85};
        RADIUS      = 10;
        LINEWIDTH   = 5;
        FONTSIZE    = 20;
        TEXT        = "Click here to see the menu!";
        DEFCOLOR    = {infill: '#75747400', outline: 'white'};
        HOVERCOLOR  = {infill: '#bebdbd9d', outline: 'white'};
        PRESSCOLOR  = {infill: '#bebdbd9d', outline: '#88a8d800'};
        FONTCOLOR   = 'white';
        if(this.language === Language.IRISH)
        {
            TEXT = "Cliceáil anseo chun an biachlár a fheiceáil";
            FONTSIZE = 14;
        }
        this.menu.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.menu.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE        = {x:100, y: 100};
        POS         = {x:1350 ,y: 55};
        RADIUS      = 10;
        LINEWIDTH   = 5;
        FONTSIZE    = 50;
        TEXT        = "X";
        DEFCOLOR    = {infill: '#ed2626', outline: '#ffffff'};
        HOVERCOLOR  = {infill: '#ed26269c', outline: '#ffffff'};
        PRESSCOLOR  = {infill: '#ed26269c', outline: '#88a8d800'};
        FONTCOLOR   = '#ffffff';
        this.menuReturn.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.menuReturn.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);


        // Shape
        SIZE = {x:435, y: 120};
        POS = {x:1220, y:480};
        RADIUS = 15;
        LINEWIDTH = 2;
        FONTSIZE = 40;
        TEXT = "Restart";

        // Colors
        DEFCOLOR = {infill: '#f3b255', outline: '#f3b255'};
        HOVERCOLOR = {infill: '#d3a25e', outline: '#d3a25e'};
        PRESSCOLOR = {infill: '#f3b255', outline: '#f3b255'};
        FONTCOLOR = 'black';
        this.restart.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.restart.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

    }

    update(command, mousePos){
        if(!this.viewingMenu){
            if(this.pressedButton){this.pressedButton = null;}

            this.submit.update(command, mousePos);
            this.next.update(command, mousePos);
            // this.prev.update(command, mousePos);
            this.menu.update(command, mousePos);

            if(this.submit.isPressed()){this.pressedButton = this.submit;}
            else if (this.next.isPressed()){this.pressedButton = this.next;}
            else if (this.prev.isPressed()){this.pressedButton = this.prev;}
            else if(this.menu.isPressed()){this.viewingMenu = true;}

        } else {
            this.menuReturn.update(command, mousePos);
            if(this.menuReturn.isPressed()){this.viewingMenu = false;}
        }
    }

    draw(ctx){
        this.submit.draw(ctx);
        this.next.draw(ctx);
        // this.prev.draw(ctx);
        this.menu.draw(ctx);
    }

    drawOptions(ctx){
        for(let i = 0; i < this.options.length; i++){
            if(this.options[i]){
                this.options[i].draw(ctx);
            }
        }
    }

    drawMenuReturn(ctx){
        this.menuReturn.draw(ctx);
    }
}