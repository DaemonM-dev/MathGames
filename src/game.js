import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { initUI, updateUI, drawUI } from './ui_handler.js';
import { InputHandler } from './input_handler.js';


export const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scaleX: 1,
    scaleY: 1,
    input: null
};

let backgroundLoaded = false;
const background = new Image();

background.onload = () => {
    backgroundLoaded = true;
    console.log("Background loaded successfully.");
}

export function init(){
    Game.canvas = document.getElementById(CANVAS_ID);
    Game.ctx = Game.canvas.getContext('2d');
    
    background.src = './assets/shelf.png';

    resizeCanvas();
    initUI();

    Game.input = new InputHandler();
    Game.input.initInputs();

    Game.running = true;
    requestAnimationFrame(gameLoop);
    console.log("Game Initialized");
}

function gameLoop(timeStamp){
    if(!Game.running){return;}

    const deltaTime = (timeStamp - Game.lastTime) / 1000; // Calculating Delta Time in seconds
    Game.lastTime = timeStamp;

    update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop); // Restart game loop
}

function update(deltaTime){
    updateUI(deltaTime, Game.input);
}

function draw(){
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

    if(backgroundLoaded){
        Game.ctx.drawImage(background, 0, 0, Game.canvas.width, Game.canvas.height);
        drawUI();
    }
    else{
        Game.ctx.fillStyle = "#000";
        Game.ctx.fillText("Loading background...", 10, 30);
    }
    
}

export function resizeCanvas(){

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