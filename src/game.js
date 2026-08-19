import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT, Commands, GameStates } from './constants.js';
import { AssetHandler } from './handlers/asset_handler.js';
import { InputHandler } from './handlers/input_handler.js';
import { Gameplay } from './gameplay/gameplay.js'

let screenCenter = {x: 0, y: 0};

export const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scale: {x:1.0,y:1.0},
    
    assetHandler: new AssetHandler(),
    inputHandler: new InputHandler(),
    gameplay: new Gameplay(),

    activeCommand: Commands.NONE,
    gamestate: GameStates.LOADING,
};

export function init(){
    Game.canvas = document.getElementById(CANVAS_ID);
    Game.ctx = Game.canvas.getContext('2d');
    resizeCanvas();
    Game.assetHandler.loadAll();
    Game.running = true;
    requestAnimationFrame(gameLoop);
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
    switch(Game.gamestate){
        case GameStates.LOADING:
            if(Game.assetHandler.areAllAssetsLoaded()){
                Game.gamestate = GameStates.INITIALIZING;
                console.log("Assets loaded!");
            }
            break;
        case GameStates.INITIALIZING:
            Game.gameplay.init(Game.assetHandler);
            Game.inputHandler.initInputs();
            Game.gamestate = GameStates.GAMEPLAY;
            console.log("Game initialized!");
            break;
        case GameStates.GAMEPLAY:
            Game.activeCommand = Game.inputHandler.getActiveCommand();
            Game.gameplay.update(Game.activeCommand, Game.inputHandler.mousePos, Game.scale);
            break;
        case GameStates.GAME_COMPLETE:
            break;
    }
}

function draw(){
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    switch(Game.gamestate){
        case GameStates.LOADING:
            Game.ctx.fillStyle = "#000";
            Game.ctx.font = `40px Arial`;
            Game.ctx.fillText("Loading...", screenCenter.x - 40, screenCenter.y);
            break;
        case GameStates.INITIALIZING:
            Game.ctx.fillText("Initializing...", screenCenter.x - 40, screenCenter.y);
            break;
        case GameStates.GAMEPLAY:
            Game.gameplay.draw(Game.ctx);
            break;
        case GameStates.GAME_COMPLETE:
            Game.ctx.fillStyle = "#000";
            Game.ctx.font = `40px Arial`;
            Game.ctx.fillText("You did it! Game Complete!", screenCenter.x - 200, screenCenter.y);
            break;
    }
}

export function resizeCanvas(){
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    if (Game.canvas.width !== displayWidth || Game.canvas.height !== displayHeight){
        
        Game.canvas.width = displayWidth;
        Game.canvas.height = displayHeight;

        Game.scale = {x: displayWidth / GAME_WIDTH, y: displayHeight / GAME_HEIGHT};

        screenCenter = {x: displayWidth / 2, y: displayHeight / 2};
    }
}
