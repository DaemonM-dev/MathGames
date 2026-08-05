import { Vector2 } from '../../constants.js';
import { Game } from '../../game.js';

// RGBA for orange text box 94, 66, 23, 1

export function Draw_Speech_Bubble(){
    Game.ctx.fillStyle = '#f0b155';
    Game.ctx.strokeStyle = 'black';
    Game.ctx.lineWidth = 4;

    const rectWidth = 500 * Game.scaleX;
    const rectHeight = 125 * Game.scaleY;
    const radius = 15;

    const pos = new Vector2(
        (Game.canvas.width - rectWidth) / 2,
        Game.canvas.height - rectHeight - Game.ctx.lineWidth
    );

    const scale = new Vector2(rectWidth, rectHeight);

    Game.ctx.beginPath();
    Game.ctx.roundRect(pos.x, pos.y, scale.x, scale.y, radius);
    Game.ctx.fill();
    Game.ctx.stroke();
}