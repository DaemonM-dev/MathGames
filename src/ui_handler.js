import {Game} from './game.js'
import {Vector2i} from './constants.js'
import { SpeechBubble } from './ui_elements/speech_bubbles.js';
import {BoxBubble} from './ui_elements/box_bubble.js'

let dialogueBox = null;

let topBox = null;
let middleBox = null;
let bottomBox = null;

let mousePressed = false;

export function initUI(){
    initSpeechBubble();
    initBoxBubble();
}

export function updateUI(deltaTime){
    updateSpeechBubble(deltaTime);
}

export function drawUI(){
    drawSpeechBubble();
    drawBoxBubble();
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
function initBoxBubble(){
    console.log("Creating top box...");
    topBox = new BoxBubble(new Vector2i(200,200), new Vector2i(200,200), 15, '#ffffff');
    console.log("Top box created:", topBox);
    console.log("Creating middle box...");
    middleBox = new BoxBubble(new Vector2i(500,500), new Vector2i(200,200), 15, '#ffffff');
    console.log("Middle box created:", topBox);
    console.log("Creating bottom box...");
    bottomBox = new BoxBubble(new Vector2i(800,350), new Vector2i(200,200), 15, '#ffffff');
    console.log("Bottom box created:");
}
function drawBoxBubble(){
    topBox.draw(Game.ctx,Game.scaleX, Game.scaleY);
    middleBox.draw(Game.ctx,Game.scaleX, Game.scaleY);
    bottomBox.draw(Game.ctx,Game.scaleX, Game.scaleY);
}