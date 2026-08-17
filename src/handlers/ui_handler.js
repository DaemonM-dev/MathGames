import { GAME_WIDTH, GAME_HEIGHT, Commands } from "../constants.js";
import { SpeechBubble } from "../elements/speech_bubble.js"

export class UiHandler{
    constructor(){
        this.speechBubbles = [];
    }

    init(){
        this.speechBubbles.push(new SpeechBubble({x: 368 , y: 810},
        {x: 520, y: 200}, '#f0b155', 10, 14, 'black'));

        this.speechBubbles[0].init('Arial', 34, 48);
    }

    update(command, scale, ctx, deltaTime){
        for(let i = 0; i < this.speechBubbles.length; i++){
            if(command === Commands.RIGHT_ARROW_DOWN){
                this.speechBubbles[i].nextMessage();
            }
            this.speechBubbles[i].update(scale, ctx, deltaTime);
        }
    }

    draw(ctx){
        for(let i = 0; i < this.speechBubbles.length; i++){
            this.speechBubbles[i].draw(ctx);
        }
    }
}