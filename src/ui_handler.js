import {Game} from './game.js'
import {Vector2i} from './constants.js'
import { SpeechBubble } from './ui_elements/speech_bubbles.js';

let dialogueBox = null;
let mousePressed = false;

export function initUI(){
    initSpeechBubble();
}

export function updateUI(deltaTime){
    updateSpeechBubble(deltaTime);
}

export function drawUI(){
    drawSpeechBubble();
}

export function handleMouseDown(){
    
}
export function handleMouseUp(){
    
}
export function handleMouseClick(){
    if(!mousePressed){mousePressed = true;}
    console.log("Mouse click registered");
}

function initSpeechBubble(){

    const newSize = new Vector2i(500, 125);

    const xPos = (Game.canvas.width - newSize.x) / 2;
    const yPos = Game.canvas.height - newSize.y;

    const newRadius = 15;
    dialogueBox = new SpeechBubble(xPos, yPos, newSize.x, newSize.y, newRadius);

    console.log("Speech bubble position:", xPos, yPos);
    console.log("Speech bubble position:", newSize.x, newSize.y);

    dialogueBox.addMessage("Hello there!");
    dialogueBox.addMessage("Welcome to my game!");
    dialogueBox.addMessage("This is a speech bubble with multiple messages.");
    dialogueBox.addMessage("Messages will cycle automatically.");
}

function updateSpeechBubble(deltaTime){
    if (dialogueBox && mousePressed) {
        dialogueBox.nextMessage();
        mousePressed = false; // Reset after handling
    }
}

function drawSpeechBubble(){
   if (dialogueBox) {
        dialogueBox.draw(Game.ctx, Game.scaleX, Game.scaleY);
    }
}

