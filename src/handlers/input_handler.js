import { Game } from '../game.js';
import { Command } from '../constants.js';
import { getKeyboardInput, removeKeyboardInput, pressButton } from '../gameplay/gameplay.js';

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

            if(event.code === 'Enter') {
                pressButton(Game.gameplay, Game.gameplay.submit);
                event.preventDefault();
            }

            if(event.code === 'Backspace'){
                removeKeyboardInput(Game.gameplay);
                event.preventDefault();
            }

            if(event.code === 'Digit1' || event.code === 'Numpad1'){
                getKeyboardInput(Game.gameplay, '1');
                event.preventDefault();
            }
            if(event.code === 'Digit2' || event.code === 'Numpad2'){
                getKeyboardInput(Game.gameplay, '2');
                event.preventDefault();
            }
            if(event.code === 'Digit3' || event.code === 'Numpad3'){
                getKeyboardInput(Game.gameplay, '3');
                event.preventDefault();
            }
            if(event.code === 'Digit4' || event.code === 'Numpad4'){
                getKeyboardInput(Game.gameplay, '4');
                event.preventDefault();
            }
            if(event.code === 'Digit5' || event.code === 'Numpad5'){
                getKeyboardInput(Game.gameplay, '5');
                event.preventDefault();
            }
            if(event.code === 'Digit6' || event.code === 'Numpad6'){
                getKeyboardInput(Game.gameplay, '6');
                event.preventDefault();
            }
            if(event.code === 'Digit7' || event.code === 'Numpad7'){
                getKeyboardInput(Game.gameplay, '7');
                event.preventDefault();
            }
            if(event.code === 'Digit8' || event.code === 'Numpad8'){
                getKeyboardInput(Game.gameplay, '8');
                event.preventDefault();
            }
            if(event.code === 'Digit9' || event.code === 'Numpad9'){
                getKeyboardInput(Game.gameplay, '9');
                event.preventDefault();
            }
            if(event.code === 'Digit0' || event.code === 'Numpad0'){
                getKeyboardInput(Game.gameplay, '0');
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
