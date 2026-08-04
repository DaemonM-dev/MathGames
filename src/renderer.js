import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { Game } from './game.js';

export function ResizeCanvas(){

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (Game.canvas.width !== displayWidth || Game.canvas.height !== displayHeight) 
    {
        Game.canvas.width = displayWidth;
        Game.canvas.height = displayHeight;

        Game.scaleX = displayWidth / GAME_WIDTH;
        Game.scaleY = displayHeight / GAME_HEIGHT;

        console.log("Canvas resized:", displayWidth, "x", displayHeight); 
    }
}

export function Draw(){
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height); // Clear canvas before drawing

    Game.ctx.fillStyle = 'red';
    Game.ctx.fillRect(100 * Game.scaleX, 100 * Game.scaleY, 200 * Game.scaleX, 150 * Game.scaleY);

    console.log("Draw called");
}