import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { Draw } from './renderer.js';

export const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scaleX: 1,
    scaleY: 1
};

export function Init(){
    Game.canvas = document.getElementById(CANVAS_ID);
    Game.ctx = Game.canvas.getContext('2d');

    Game.running = true;
    requestAnimationFrame(GameLoop);
}

function GameLoop(timeStamp){
    if(!Game.running){return;}

    const deltaTime = (timeStamp - Game.lastTime) / 1000; // Calculating Delta Time in seconds
    Game.lastTime = timeStamp;

    Update(deltaTime);
    Draw();

    requestAnimationFrame(GameLoop); // Restart game loop
}

function Update(deltaTime){
    console.log("Update called");
}