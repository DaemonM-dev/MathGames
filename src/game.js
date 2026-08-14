import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT, Commands, GameStates, Levels } from './constants.js';
import { AssetHandler } from './handlers/asset_handler.js';
import { InputHandler } from './handlers/input_handler.js';
import { UiHandler }    from './handlers/ui_handler.js';

let screenCenter = {x: 0, y: 0};

export const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scale: {x: 1.0, y: 1.0},
    
    assets: new AssetHandler(),
    input: new InputHandler(),
    ui: new UiHandler(),

    gamestate: GameStates.LOADING,
    activeCommand: Commands.NONE,
    currentLevel: Levels.LEVEL_1
};

export function init(){
    Game.canvas = document.getElementById(CANVAS_ID);
    Game.ctx = Game.canvas.getContext('2d');
    resizeCanvas();
    Game.assets.loadAll();
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
            if(Game.assets.areAllAssetsLoaded()){
                Game.gamestate = GameStates.INITIALIZING;
                console.log("Assets loaded!");
            }
            break;
        case GameStates.INITIALIZING:
            Game.ui.initUI(Game.assets, Game.ctx);
            Game.gamestate = GameStates.GAMEPLAY;
            break;
        case GameStates.GAMEPLAY:
            Game.activeCommand = Game.input.getActiveCommand();
            Game.ui.updateUI(Game.activeCommand, Game.input.mousePos, Game.scale, deltaTime);
            break;
        case GameStates.RESTARTING:
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
            Game.ui.drawUI(Game.ctx);
            break;
        case GameStates.RESTARTING:
            break;
    }
}

export function resizeCanvas(){
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (Game.canvas.width !== displayWidth || Game.canvas.height !== displayHeight) {
        Game.canvas.width = displayWidth;
        Game.canvas.height = displayHeight;
        Game.scale.x = displayWidth / GAME_WIDTH;
        Game.scale.y = displayHeight / GAME_HEIGHT;
        screenCenter = {x: displayWidth / 2, y: displayHeight / 2};
    }
}