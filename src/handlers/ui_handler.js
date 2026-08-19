import { GAME_WIDTH, GAME_HEIGHT, Commands } from "../constants.js";
import { SpeechBubble } from "../elements/speech_bubble.js"

export class UiHandler{
    constructor(){
        this.speechBubbles = [];
        this.submitButton = null;
        this.scale = {x:1.0, y:1.0};
        this.submitHovered = false;
    }

    init(){
        this.speechBubbles.push(new SpeechBubble({x: 368 , y: 810},
        {x: 520, y: 200}, '#f0b155', 30, 7, 'black'));

        this.speechBubbles[0].init('Arial', 34, 48);

        this.submitButton = {
            pos: {x: 1600, y: 950},
            size: {x: 180, y: 60},
            visible: true,
            hoverColor: '#3b8b3f',
            normalColor: '#4CAF50'
        };
    }

    update(command, scale, ctx, deltaTime){
        if(scale.x !== this.scale.x || scale.y !== this.scale.y){
            this.scale = {...scale};
            if(this.submitButton){
                this.submitButton.pos = { x: 1700 * this.scale.x, y: 950 * this.scale.y };
                this.submitButton.size = { x: 180 * this.scale.x, y: 60 * this.scale.y };
            }
        }

        for(let i = 0; i < this.speechBubbles.length; i++){
            if(command === Commands.RIGHT_ARROW_DOWN){
                this.speechBubbles[i].nextMessage();
            }
            this.speechBubbles[i].update(this.scale, ctx, deltaTime);
        }
    }

    draw(ctx){
        for(let i = 0; i < this.speechBubbles.length; i++){
            this.speechBubbles[i].draw(ctx);
        }
        if(this.submitButton && this.submitButton.visible) {
            // Draw submit button with hover effect
            ctx.fillStyle = this.submitHovered ? this.submitButton.hoverColor : this.submitButton.normalColor;
            ctx.fillRect(this.submitButton.pos.x, this.submitButton.pos.y, 
                        this.submitButton.size.x, this.submitButton.size.y);
            
            // Add button border
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.submitButton.pos.x, this.submitButton.pos.y, 
                          this.submitButton.size.x, this.submitButton.size.y);
            
            ctx.fillStyle = 'white';
            ctx.font = `${24 * Math.min(this.scale.x, this.scale.y)}px Arial`;
            ctx.fillText('SUBMIT', 
                        this.submitButton.pos.x + 10, 
                        this.submitButton.pos.y + 35);
        }
    }
    
    isMouseOverSubmitButton(mousePos) {
        if (!this.submitButton) return false;
        
        return mousePos.x >= this.submitButton.pos.x &&
               mousePos.x <= this.submitButton.pos.x + this.submitButton.size.x &&
               mousePos.y >= this.submitButton.pos.y &&
               mousePos.y <= this.submitButton.pos.y + this.submitButton.size.y;
    }
    
    updateSubmitHover(mousePos) {
        this.submitHovered = this.isMouseOverSubmitButton(mousePos);
    }
}
