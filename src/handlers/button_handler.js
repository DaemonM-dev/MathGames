import { GAME_SIZE } from '../globals.js'
import { Button } from '../gameplay/elements/button.js'

export class ButtonHandler{
    constructor(){
        this.scale = 1.0;

        this.submit = new Button();
        this.next = new Button();
        this.prev = new Button();
        this.menu = new Button();
        this.menuReturn = new Button();

        this.buttonArray = [
            this.submit,
            this.next,
            this.prev,
            this.menu,
            this.menuReturn
        ];

        this.viewingMenu = false;
        this.pressedButton = null;

        this.init();
    }

    changeScale(scale){
        this.scale = scale;
        for(let i = 0; i < this.buttonArray.length; i++){
            if(this.buttonArray[i]){this.buttonArray[i].changeScale(this.scale);}
        }
    }

    init(){
        let SIZE = {x:250, y: 100};
        let POS = {x:1475 ,y: 875};
        let RADIUS = 35;
        let LINEWIDTH = 8;
        let FONTSIZE = 50;
        let TEXT = "Submit";
        let DEFCOLOR = {infill: '#f3b15576', outline: '#f3b255'};
        let HOVERCOLOR = {infill: '#f3b155bb', outline: '#f3b255'};
        let PRESSCOLOR = {infill: '#f3b15576', outline: '#f3b15500'};
        let FONTCOLOR = 'black';
        this.submit.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.submit.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE = {x:50, y: 50};
        POS = {x:900 ,y: 800};
        RADIUS = 22;
        LINEWIDTH = 5;
        FONTSIZE = 50;
        TEXT = ">";
        DEFCOLOR = {infill: '#88a8d877', outline: '#88a8d8'};
        HOVERCOLOR = {infill: '#88a8d8ce', outline: '#88a8d8'};
        PRESSCOLOR = {infill: '#88a8d877', outline: '#88a8d800'};
        FONTCOLOR = '#9bd7b5';
        this.next.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.next.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE = {x:50, y: 50};
        POS = {x:325 ,y: 800};
        RADIUS = 22;
        LINEWIDTH = 5;
        FONTSIZE = 50;
        TEXT = "<";
        DEFCOLOR = {infill: '#88a8d877', outline: '#88a8d8'};
        HOVERCOLOR = {infill: '#88a8d8ce', outline: '#88a8d8'};
        PRESSCOLOR = {infill: '#88a8d877', outline: '#88a8d800'};
        FONTCOLOR = '#9bd7b5';
        this.prev.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.prev.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE = {x:325, y: 40};
        POS = {x:500 ,y: 85};
        RADIUS = 10;
        LINEWIDTH = 5;
        FONTSIZE = 20;
        TEXT = "Click here to see the menu!";
        DEFCOLOR = {infill: '#75747400', outline: 'white'};
        HOVERCOLOR = {infill: '#bebdbd9d', outline: 'white'};
        PRESSCOLOR = {infill: '#bebdbd9d', outline: '#88a8d800'};
        FONTCOLOR = 'white';
        this.menu.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.menu.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);

        SIZE = {x:100, y: 100};
        POS = {x:1350 ,y: 55};
        RADIUS = 10;
        LINEWIDTH = 5;
        FONTSIZE = 50;
        TEXT = "X";
        DEFCOLOR = {infill: '#ed2626', outline: '#ffffff'};
        HOVERCOLOR = {infill: '#ed26269c', outline: '#ffffff'};
        PRESSCOLOR = {infill: '#ed26269c', outline: '#88a8d800'};
        FONTCOLOR = '#ffffff';
        this.menuReturn.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.menuReturn.setColors(DEFCOLOR, HOVERCOLOR, PRESSCOLOR, FONTCOLOR);
    }

    update(command, mousePos){
        if(!this.viewingMenu){
            this.submit.update(command, mousePos);
            this.next.update(command, mousePos);
            this.prev.update(command, mousePos);
            this.menu.update(command, mousePos);
        } else {
            this.menuReturn.update(command, mousePos);
            if(this.menuReturn.isPressed()){this.viewingMenu = false;}
        }
        if(this.menu.isPressed()){this.viewingMenu = true;}
    }

    draw(ctx){
        this.submit.draw(ctx);
        this.next.draw(ctx);
        this.prev.draw(ctx);
        this.menu.draw(ctx);
    }

    drawMenuReturn(ctx){
        this.menuReturn.draw(ctx);
    }
}