import {Game} from './game.js'
import { SpeechBubble } from './ui_elements/speech_bubbles.js';

let dialogueBox = null;
let mousePressed = false;

export function Init_UI(){
    InitSpeechBubble();
}

export function Update_UI(deltaTime){
    UpdateSpeechBubble(deltaTime);
}

export function Draw_UI(){
    DrawSpeechBubble();
}

export function HandleMouseDown(){
    
}
export function HandleMouseUp(){
    
}
export function HandleMouseClick(){
    if(!mousePressed){mousePressed = true;}
    console.log("Mouse click registered");
}

function InitSpeechBubble(){
    dialogueBox = new SpeechBubble(0, 0, 500, 125, 15);

    dialogueBox.addMessage("Hello there!");
    dialogueBox.addMessage("Welcome to my game!");
    dialogueBox.addMessage("This is a speech bubble with multiple messages.");
    dialogueBox.addMessage("Messages will cycle automatically.");
}

function UpdateSpeechBubble(deltaTime){
    if (dialogueBox && mousePressed) {
        dialogueBox.nextMessage();
        mousePressed = false; // Reset after handling
    }
}

function DrawSpeechBubble(){
   if (dialogueBox) {
        dialogueBox.Draw(Game.ctx, Game.scaleX, Game.scaleY);
    }
}

