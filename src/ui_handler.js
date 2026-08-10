import { Game } from './game.js';
import { Vector2i } from './constants.js';
import { SpeechBubble } from './speech_bubbles.js';
import { BoxBubble } from './box_bubble.js';

let dialogueBox = null;
let topBox = null;
let middleBox = null;
let bottomBox = null;

let mousePressed = false;

export function initUI(){
    // Initialize dialogue box
    initSpeechBubble();

    // Initialize gameplay element boxes
    topBox = new BoxBubble(new Vector2i(1100,50), new Vector2i(350,100), 15, '#ffffff');
    console.log("Top box created:", topBox);
    middleBox = new BoxBubble(new Vector2i(1100,150), new Vector2i(350,400), 15, '#ffffff');
    console.log("Middle box created:", middleBox);
    bottomBox = new BoxBubble(new Vector2i(1100,550), new Vector2i(350,100), 15, '#ffffff');
    console.log("Bottom box created:", bottomBox);
}

export function updateUI(deltaTime, input){
    if (dialogueBox)
    {
        if(input.getMouseClick){dialogueBox.nextMessage();}
        dialogueBox.update(deltaTime, new Vector2i(Game.scaleX, Game.scaleY));
    }
}

export function drawUI(){
    if (dialogueBox) { dialogueBox.draw(Game.ctx); }
    
    if(topBox){ topBox.draw(Game.ctx,Game.scaleX, Game.scaleY); }
    if(middleBox){ middleBox.draw(Game.ctx,Game.scaleX, Game.scaleY); }
    if(bottomBox){ bottomBox.draw(Game.ctx,Game.scaleX, Game.scaleY); }
    
}

function initSpeechBubble(){
    const size = new Vector2i(400, 125);
    const position = new Vector2i((Game.canvas.width - size.x) / 2, Game.canvas.height - size.y);
    const scale = new Vector2i(Game.scaleX, Game.scaleY);
    const radius = 15;
    const lineWidth = 7;
    const fontSize = 24;
    dialogueBox = new SpeechBubble();
    dialogueBox.init(position, size, radius, scale, lineWidth, fontSize);

    createMessages();
    console.log("Dialogue box created:", dialogueBox);
}
function createMessages(){
    dialogueBox.addMessage("Hello there! Click to cycle through text...");
    dialogueBox.addMessage("Where is the food? Click to find out..");
    dialogueBox.addMessage("Ah, the food hasn't been added yet..");
    dialogueBox.addMessage("Try resizing the window!");
}