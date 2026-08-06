import { Game } from './game.js'
import { Vector2i } from './constants.js'
import { SpeechBubble } from './ui_elements/speech_bubbles.js';
import { BoxBubble } from './ui_elements/box_bubble.js'

let dialogueBox = null;
let topBox = null;
let middleBox = null;
let bottomBox = null;

let mousePressed = false;

export function initUI(){
    // Initialize dialogue box
    const size = new Vector2i(500, 125);
    const position = new Vector2i((Game.canvas.width - size.x) / 2, Game.canvas.height - size.y);
    dialogueBox = new SpeechBubble();
    dialogueBox.init(position, size, 15);
    createMessages();
    console.log("Dialogue box created:", topBox);

    // Initialize gameplay element boxes
    topBox = new BoxBubble(new Vector2i(200,200), new Vector2i(200,200), 15, '#ffffff');
    console.log("Top box created:", topBox);
    middleBox = new BoxBubble(new Vector2i(500,500), new Vector2i(200,200), 15, '#ffffff');
    console.log("Middle box created:", topBox);
    bottomBox = new BoxBubble(new Vector2i(800,350), new Vector2i(200,200), 15, '#ffffff');
    console.log("Bottom box created:");
}

export function updateUI(deltaTime){
    if (dialogueBox && mousePressed) { dialogueBox.nextMessage(); mousePressed = false; }
}

export function drawUI(){
    
    if (dialogueBox) { dialogueBox.draw(Game.ctx, Game.scaleX, Game.scaleY); }

    if(topBox){ topBox.draw(Game.ctx,Game.scaleX, Game.scaleY); }
    if(middleBox){ middleBox.draw(Game.ctx,Game.scaleX, Game.scaleY); }
    if(bottomBox){ bottomBox.draw(Game.ctx,Game.scaleX, Game.scaleY); }
}

export function handleMouseDown(){
    
}
export function handleMouseUp(){
    
}
export function handleMouseClick(){
    if(!mousePressed){mousePressed = true;}
    console.log("Mouse click registered");
}

function createMessages(){
    dialogueBox.addMessage("Hello there!");
    dialogueBox.addMessage("Welcome to my game!");
    dialogueBox.addMessage("This is a speech bubble with multiple messages.");
    dialogueBox.addMessage("Messages will cycle automatically.");
}