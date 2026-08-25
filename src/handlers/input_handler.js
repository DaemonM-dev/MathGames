import { Game } from '../game.js';
import { Command } from '../enums/commands.js';
import { getKeyboardInput, removeKeyboardInput, pressButton } from '../gameplay/gameplay.js';

export class InputHandler{
    constructor(){
        this.mousePos = {x: 0.0, y: 0.0};
        this.activeCommand = Command.NONE;
        this.submitButtonPressed = false;
        
        this.mousedownHandler = (event) => {
            if(this.activeCommand !== Command.MOUSE_DOWN){
                this.activeCommand = Command.MOUSE_DOWN;
            }
        };
        
        this.mouseupHandler = (event) => {
            if(this.activeCommand !== Command.MOUSE_UP){
                this.activeCommand = Command.MOUSE_UP;
            }
        };
        
        this.mousemoveHandler = (event) => {
            const screen = Game.canvas.getBoundingClientRect();
            this.mousePos = {x: event.clientX - screen.left, y: event.clientY - screen.top};
        };
        
        this.keydownHandler = (event) => {
            switch(event.code) {
                case 'Enter':
                    pressButton(Game.gameplay, Game.gameplay.buttons[0]);
                    event.preventDefault();
                    break;
                case 'Backspace':
                    removeKeyboardInput(Game.gameplay);
                    event.preventDefault();
                    break;
                case 'Period':
                case 'NumpadDecimal':
                    getKeyboardInput(Game.gameplay, '.');
                    event.preventDefault();
                    break;
                case 'Digit1':
                case 'Numpad1':
                    getKeyboardInput(Game.gameplay, '1');
                    event.preventDefault();
                    break;
                case 'Digit2':
                case 'Numpad2':
                    getKeyboardInput(Game.gameplay, '2');
                    event.preventDefault();
                    break;
                case 'Digit3':
                case 'Numpad3':
                    getKeyboardInput(Game.gameplay, '3');
                    event.preventDefault();
                    break;
                case 'Digit4':
                case 'Numpad4':
                    getKeyboardInput(Game.gameplay, '4');
                    event.preventDefault();
                    break;
                case 'Digit5':
                case 'Numpad5':
                    getKeyboardInput(Game.gameplay, '5');
                    event.preventDefault();
                    break;
                case 'Digit6':
                case 'Numpad6':
                    getKeyboardInput(Game.gameplay, '6');
                    event.preventDefault();
                    break;
                case 'Digit7':
                case 'Numpad7':
                    getKeyboardInput(Game.gameplay, '7');
                    event.preventDefault();
                    break;
                case 'Digit8':
                case 'Numpad8':
                    getKeyboardInput(Game.gameplay, '8');
                    event.preventDefault();
                    break;
                case 'Digit9':
                case 'Numpad9':
                    getKeyboardInput(Game.gameplay, '9');
                    event.preventDefault();
                    break;
                case 'Digit0':
                case 'Numpad0':
                    getKeyboardInput(Game.gameplay, '0');
                    event.preventDefault();
                    break;
            }
        };
    }

    initInputs(){
        Game.canvas.addEventListener('mousedown', this.mousedownHandler);
        Game.canvas.addEventListener('mouseup', this.mouseupHandler);
        Game.canvas.addEventListener('mousemove', this.mousemoveHandler);
        document.addEventListener('keydown', this.keydownHandler);
        console.log("Inputs Initialized");
    }

    removeEventListeners(){
        Game.canvas.removeEventListener('mousedown', this.mousedownHandler);
        Game.canvas.removeEventListener('mouseup', this.mouseupHandler);
        Game.canvas.removeEventListener('mousemove', this.mousemoveHandler);
        document.removeEventListener('keydown', this.keydownHandler);
        console.log("Removed event listeners");
    }

    getActiveCommand(){
        const command = this.activeCommand;
        this.activeCommand = Command.NONE;
        return command;
    }
}
