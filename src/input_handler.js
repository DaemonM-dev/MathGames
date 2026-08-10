import { Game } from './game.js';
import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

export class InputHandler{
    constructor(){
        this.mousePos = {x: 0.0, y: 0.0};
        this.mouseClicked = false;
        this.mouseDown = false;
    }

    initInputs(){
        Game.canvas.addEventListener('mousedown', (event) => {
            if(!this.mouseDown){
                this.mouseDown = true;
                console.log("Mouse Down Input");
            }
        });
        
        Game.canvas.addEventListener('mouseup', (event) => {
            if(this.mouseDown){
                this.mouseDown = false;
                console.log("Mouse Up Input");
            }
            if(this.mouseClicked){this.mouseClicked = false;}
        });
        
        Game.canvas.addEventListener('click', (event) => {
            if(!this.mouseClicked){
                this.mouseClicked = true;
                console.log("Mouse Click Input");
            }
        });
        
        Game.canvas.addEventListener('mousemove', (event) => {
            const screen = Game.canvas.getBoundingClientRect();
            this.mousePos = {x: event.clientX - screen.left, y: event.clientY - screen.top};
        });
        
        console.log("Inputs Initialized");
    }

    getMouseDown(){
        return this.mouseDown;
    }

    getMouseClicked(){
        if (this.mouseClicked) {
            this.mouseClicked = false;
            return true;
        }
        return false;
    }
}