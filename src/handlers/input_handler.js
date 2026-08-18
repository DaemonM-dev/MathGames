import { Game } from '../game.js';
import { GAME_WIDTH, GAME_HEIGHT, Commands } from '../constants.js';

export class InputHandler{
    constructor(){
        this.mousePos = {x: 0.0, y: 0.0};
        this.activeCommand = Commands.NONE;
        this.submitButtonPressed = false;
    }

    initInputs(){
        Game.canvas.addEventListener('mousedown', (event) => {
            if(this.activeCommand !== Commands.MOUSE_DOWN){
                this.activeCommand = Commands.MOUSE_DOWN;
            }
            
            if(Game.uiHandler.isMouseOverSubmitButton(this.mousePos)) {
                this.submitButtonPressed = true;
            }
        });
       
        Game.canvas.addEventListener('mouseup', (event) => {
            if(this.activeCommand !== Commands.MOUSE_UP){
                this.activeCommand = Commands.MOUSE_UP;
            }
            
            this.submitButtonPressed = false;
        });
        
        Game.canvas.addEventListener('mousemove', (event) => {
            const screen = Game.canvas.getBoundingClientRect();
            this.mousePos = {x: event.clientX - screen.left, y: event.clientY - screen.top};
            
            Game.uiHandler.updateSubmitHover(this.mousePos);
        });
        
        document.addEventListener('keydown', (event) => {
            if(event.code === 'Space') {
                if(this.activeCommand !== Commands.SPACEBAR_DOWN){
                    this.activeCommand = Commands.SPACEBAR_DOWN;
                }
                event.preventDefault();
            }

            if(event.code === 'ArrowRight') {
                if(this.activeCommand !== Commands.RIGHT_ARROW_DOWN){
                    this.activeCommand = Commands.RIGHT_ARROW_DOWN;
                }
                event.preventDefault();
            }

            if(event.code === 'Enter') {
                if(this.activeCommand !== Commands.SUBMIT_PRESSED){
                    this.activeCommand = Commands.SUBMIT_PRESSED;
                }
                event.preventDefault();
            }
        });

        console.log("Inputs Initialized");
    }

    getActiveCommand(){
        const command = this.activeCommand;
        this.activeCommand = Commands.NONE;
        return command;
    }
}
