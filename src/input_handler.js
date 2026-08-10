import { Game } from './game.js';
import { GAME_WIDTH, GAME_HEIGHT, Vector2i } from './constants.js';

export class InputHandler{
    constructor(){
        this.mousePos = null;
        this.mouseClicked = false;
        this.mouseDown = false;
    }

    initInputs(){
        Game.canvas.addEventListener('mousedown', this.setMouseDown.bind(this));
        Game.canvas.addEventListener('mouseup', this.setMouseUp.bind(this));
        Game.canvas.addEventListener('click', this.setMouseClick.bind(this));
        Game.canvas.addEventListener('mousemove', this.updateMousePos.bind(this));
        console.log("Inputs Initialized");
    }

    update(deltaTime){

    }

    setMouseDown(){
        if(!this.mouseDown){this.mouseDown = true;console.log("Mouse Down Input");}
    }
    getMouseDown(){
        return this.mouseDown;
    }
    setMouseUp(){
        if(this.mouseDown){this.mouseDown = false;console.log("Mouse Up Input");}
    }
    setMouseClick(){
        if(!this.mouseClicked){this.mouseClicked = true;console.log("Mouse Click Input");}
    }
    resetMouseClick(){
        if(this.mouseClicked){this.mouseClicked = false;}
    }
    getMouseClick(){
        return this.mouseClicked;
    }
    updateMousePos(event){
        const screen = Game.canvas.getBoundingClientRect();
        this.mousePos = new Vector2i( event.clientX - screen.left, event.clientY - screen.top);
    }

}