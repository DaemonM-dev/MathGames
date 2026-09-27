import { GAME_SIZE } from '../globals.js'
import { Button } from '../gameplay/elements/button.js'
import { GameState } from '../enums/game_states.js'
import { Game } from '../game.js'

export class ButtonHandler{
    constructor(){
        this.scale = 1.0;

        this.submit     = new Button();
        this.next       = new Button();
        this.prev       = new Button();
        this.menu       = new Button();
        this.menuReturn = new Button();

        this.options    = new Button();

        this.resume     = new Button();
        this.sound      = new Button();  
        this.language   = new Button();
        this.exit       = new Button();
        
        this.optionsArray = [
            this.resume,
            this.sound,
            this.language,
            this.exit
        ];

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
        for(let i = 0; i < this.optionsArray.length; i++){
            if(this.optionsArray[i]){
                this.optionsArray[i].changeScale(this.scale);
            }
        }
        if(this.options){
            this.options.changeScale(this.scale);
        }
    }

    init(){
        let SIZE        = {x:250, y: 100};
        let POS         = {x:1475 ,y: 875};
        let RADIUS      = 20;
        let LINEWIDTH   = 8;
        let FONTSIZE    = 50;
        let TEXT        = "Submit";
        let DEFCOLOR = {infill: '#f3b1557e', outline: '#f3b255'};
        let HOVERCOLOR = {infill: '#d3a25e', outline: '#d3a25e'};
        let PRESSCOLOR = {infill: '#f3b255', outline: '#f3b255'};
        let FONTCOLOR   = 'black';
        this.submit.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.submit.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE        = {x:50, y: 50};
        POS         = {x:900 ,y: 800};
        RADIUS      = 22;
        LINEWIDTH   = 5;
        FONTSIZE    = 50;
        TEXT        = ">";
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

        this.initOptions();
    }

    initOptions(){

        const SCREEN_CENTER = {x: GAME_SIZE.x / 2, y: GAME_SIZE.y / 2};

        let SIZE        = {x:300, y: 100};
        let POS         = {x:(SCREEN_CENTER.x - SIZE.x / 2) * this.scale, y: (SCREEN_CENTER.y - (SIZE.y / 2) - 150) * this.scale};
        let RADIUS      = 15;
        let LINEWIDTH   = 2;
        let FONTSIZE    = 40;
        let TEXT        = "Resume";

        let DEF = {infill: '#f3b255', outline: '#f3b255'};
        let HOVER = {infill: '#d3a25e', outline: '#d3a25e'};
        let PRESS = {infill: '#f3b255', outline: '#f3b255'};
        let FONT = 'black';

        this.resume.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.resume.setColors(DEF, HOVER, PRESS, FONT);

        POS = {x: POS.x, y: POS.y + SIZE.y + 25};
        TEXT = "Sound";
        this.sound.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.sound.setColors(DEF, HOVER, PRESS, FONT);

        POS = {x: POS.x, y: POS.y + SIZE.y + 25};
        TEXT = "Language";
        this.language.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.language.setColors(DEF, HOVER, PRESS, FONT);

        POS = {x: POS.x, y: POS.y + SIZE.y + 25};
        TEXT = "Exit";
        this.exit.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.exit.setColors(DEF, HOVER, PRESS, FONT);


        POS = {x: 30, y: 30};
        TEXT = "Options";
        this.options.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.options.setColors(DEF, HOVER, PRESS, FONT);
    }

    update(command, mousePos){

        if(this.viewingMenu){
            this.menuReturn.update(command, mousePos);
            if(this.menuReturn.isPressed()){
                this.viewingMenu = false;
            }
        } else if(this.viewingOptions){
            for(let i = 0; i < this.optionsArray.length; i++){
                this.optionsArray[i].update(command, mousePos);
            }
            if(this.resume.isPressed()){
                this.viewingOptions = false;
            } else if (this.sound.isPressed()){

            } else if(this.language.isPressed()){

            } else if (this.exit.isPressed()){
                // Game.gamestate = GameState.INIT_MENU;
                this.viewingOptions = false;
            }
        } else {

            if(this.pressedButton){
                this.pressedButton = null;
            }

            this.submit.update(command, mousePos);
            this.next.update(command, mousePos);
            this.prev.update(command, mousePos);
            this.menu.update(command, mousePos);
            this.options.update(command, mousePos);

            if(this.submit.isPressed()){this.pressedButton = this.submit;}
            else if (this.next.isPressed()){this.pressedButton = this.next;}
            else if (this.prev.isPressed()){this.pressedButton = this.prev;}
            else if(this.menu.isPressed()){this.viewingMenu = true;}
            else if(this.options.isPressed()){this.viewingOptions = true;}
        }
    }

    updateOptions(command, mousePos){

        if(this.viewingOptions){
            for(let i = 0; i < this.optionsArray.length; i++){
                this.optionsArray[i].update(command, mousePos);
            }
            if(this.resume.isPressed()){
                this.viewingOptions = false;
            }
        } else {
            this.options.update(command, mousePos);

            if(this.options.isPressed()){
                this.viewingOptions = true;
            }
        }
    }

    draw(ctx){
        this.submit.draw(ctx);
        this.next.draw(ctx);
        this.prev.draw(ctx);

        if(this.viewingMenu){
            this.menu.draw(ctx);
        } else if(this.viewingOptions){
            this.drawOptionButtons(ctx);
        }
    }

    drawOptions(ctx){

        if(this.viewingOptions){
            this.drawOptionButtons(ctx);
        } else if(this.options){
            this.options.draw(ctx);
        }
    }

    drawOptionButtons(ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        for(let i = 0; i < this.optionsArray.length; i++){
            if(this.optionsArray[i]){
                this.optionsArray[i].draw(ctx);
            }
        }
    }

    drawMenuReturn(ctx){
        this.menuReturn.draw(ctx);
    }
}