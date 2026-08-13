import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT } from './constants.js';
import { AssetHandler } from './asset_handler.js';
import { InputHandler, Command } from './input_handler.js';
import { UiHandler }    from './ui_handler.js';

let screenCenter = {x: 0, y: 0};

export const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scale: {x: 1.0, y: 1.0},
    assetsLoaded: false,
    assets: new AssetHandler(),
    input: new InputHandler(),
    ui: new UiHandler({x: 1.0, y: 1.0}),
    activeCommand: Command.NONE
};

export function init(){
    Game.canvas = document.getElementById(CANVAS_ID);
    Game.ctx = Game.canvas.getContext('2d');

    resizeCanvas();

    Game.assets.loadAll();
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
    if(!Game.assetsLoaded){
        if (Game.assets.areAllAssetsLoaded()){
            Game.assetsLoaded = true;
            resizeCanvas();
            Game.ui.initUI(Game.assets, Game.ctx);
            console.log("Assets loaded");
        }
    } else{
        Game.activeCommand = Game.input.getActiveCommand();
        Game.ui.updateUI(Game.activeCommand, Game.input.mousePos, Game.scale, deltaTime);
    }
}

function draw(){
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

    if(!Game.assetsLoaded){
        Game.ctx.fillStyle = "#000";
        Game.ctx.font = `40px Arial`;
        Game.ctx.fillText("Loading...", screenCenter.x - 40, screenCenter.y);
    } else{
        Game.ui.drawUI(Game.ctx);
    }
}

export function resizeCanvas(){

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (Game.canvas.width !== displayWidth || Game.canvas.height !== displayHeight) 
    {
        Game.canvas.width = displayWidth;
        Game.canvas.height = displayHeight;

        Game.scale.x = displayWidth / GAME_WIDTH;
        Game.scale.y = displayHeight / GAME_HEIGHT;

        screenCenter = {x: displayWidth / 2, y: displayHeight / 2};

        /*
        console.log("Canvas resized:", displayWidth, "x", displayHeight); 
        */
    }
}

function checkAssetsReady() {
    if (Game.assets.areAllAssetsLoaded()){
        Game.assetsLoaded = true;
        console.log("Assets loaded");
    }
}