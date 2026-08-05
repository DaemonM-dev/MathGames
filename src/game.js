import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { Init_UI, Update_UI, Draw_UI } from './ui_handler.js';
import { HandleMouseDown, HandleMouseUp, HandleMouseClick } from './ui_handler.js';

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

    SetUpInputs();
    ResizeCanvas();
    Init_UI();

    Game.running = true;
    requestAnimationFrame(GameLoop);
}

function SetUpInputs(){
    Game.canvas.addEventListener('mousedown', HandleMouseDown);
    Game.canvas.addEventListener('mouseup', HandleMouseUp);
    Game.canvas.addEventListener('click', HandleMouseClick);
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
    Update_UI(deltaTime);
}

function Draw(){
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    Draw_UI();
    
}

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