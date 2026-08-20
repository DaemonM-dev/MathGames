import { Game } from '../game.js';
import { Command } from '../constants.js';

export class InputHandler{
    constructor(){
        this.mousePos = {x: 0.0, y: 0.0};
        this.activeCommand = Command.NONE;
        this.submitButtonPressed = false;
    }

    initInputs(){
        Game.canvas.addEventListener('mousedown', (event) => {
            if(this.activeCommand !== Command.MOUSE_DOWN){
                this.activeCommand = Command.MOUSE_DOWN;
            }
        });
       
        Game.canvas.addEventListener('mouseup', (event) => {
            if(this.activeCommand !== Command.MOUSE_UP){
                this.activeCommand = Command.MOUSE_UP;
            }
            
            this.submitButtonPressed = false;
        });
        
        Game.canvas.addEventListener('mousemove', (event) => {
            const screen = Game.canvas.getBoundingClientRect();
            this.mousePos = {x: event.clientX - screen.left, y: event.clientY - screen.top};
            
        });
        
        document.addEventListener('keydown', (event) => {
            if(event.code === 'Space') {
                if(this.activeCommand !== Command.SPACEBAR_DOWN){
                    this.activeCommand = Command.SPACEBAR_DOWN;
                }
                event.preventDefault();
            }

            if(event.code === 'ArrowRight') {
                if(this.activeCommand !== Command.RIGHT_ARROW_DOWN){
                    this.activeCommand = Command.RIGHT_ARROW_DOWN;
                }
                event.preventDefault();
            }

            if(event.code === 'Enter') {
                if(this.activeCommand !== Command.SUBMIT_PRESSED){
                    this.activeCommand = Command.SUBMIT_PRESSED;
                }
                event.preventDefault();
            }
        });

        console.log("Inputs Initialized");
    }

    getActiveCommand(){
        const command = this.activeCommand;
        this.activeCommand = Command.NONE;
        return command;
    }
}
