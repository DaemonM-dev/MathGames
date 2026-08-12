import { Game } from './game.js';
import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

export const Command = {
    NONE: 'none',
    MOUSE_CLICK: 'mouse_click',
    MOUSE_DOWN: 'mouse_down',
    MOUSE_UP: 'mouse_up'
}

export class InputHandler{
    constructor(){
        this.mousePos = {x: 0.0, y: 0.0};
        this.activeCommand = Command.NONE;
    }

    initInputs(){
        Game.canvas.addEventListener('mousedown', (event) => {
            if(this.activeCommand !== Command.MOUSE_DOWN){
                this.activeCommand = Command.MOUSE_DOWN;
            }
        });
        
        
        Game.canvas.addEventListener('click', (event) => {
            if(this.activeComand !== Command.MOUSE_CLICK){
                this.activeCommand = Command.MOUSE_CLICK;
            }
        });
        
       
        Game.canvas.addEventListener('mouseup', (event) => {
            if(this.activeComand !== Command.MOUSE_UP){
                this.activeCommand = Command.MOUSE_UP;
            }
        });
        
        Game.canvas.addEventListener('mousemove', (event) => {
            const screen = Game.canvas.getBoundingClientRect();
            this.mousePos = {x: event.clientX - screen.left, y: event.clientY - screen.top};
            console.log("Mouse Position: ", this.mousePos);
        });
        
        console.log("Inputs Initialized");
    }

    getActiveCommand(){
        const command = this.activeCommand;
        if(this.activeCommand === Command.MOUSE_CLICK){
            this.activeCommand = Command.NONE;
        }
        return command;
    }
}