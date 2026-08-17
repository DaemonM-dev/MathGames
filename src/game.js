import { CANVAS_ID, GAME_WIDTH, GAME_HEIGHT, Commands, GameStates, Levels } from './constants.js';
import { AssetHandler } from './handlers/asset_handler.js';
import { InputHandler } from './handlers/input_handler.js';
import { UiHandler } from './handlers/ui_handler.js';
import { Level } from './elements/levels.js'
import { FoodItems } from './elements/food_items.js'

let screenCenter = {x: 0, y: 0};

export const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scale: {x: 1.0, y: 1.0},
    
    assetHandler: new AssetHandler(),
    inputHandler: new InputHandler(),
    level:        new Level(),
    uiHandler:    new UiHandler(),
    foodItems:    new FoodItems(),

    gamestate: GameStates.LOADING,
    currentLevel: Levels.LEVEL_1,
    activeCommand: Commands.NONE
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
            Game.level.init(Game.assetHandler);
            Game.uiHandler.init();
            Game.foodItems.init(Game.assetHandler);
            Game.inputHandler.initInputs();
            Game.gamestate = GameStates.GAMEPLAY;
            console.log("Game initialized!");
            break;
        case GameStates.GAMEPLAY:
            Game.activeCommand = Game.inputHandler.getActiveCommand();
            Game.level.update(Game.scale, deltaTime);
            Game.uiHandler.update(Game.activeCommand, Game.scale, Game.ctx, deltaTime);
            Game.foodItems.update(Game.activeCommand, Game.inputHandler.mousePos, Game.scale, deltaTime);
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
            Game.level.draw(Game.ctx);
            Game.uiHandler.draw(Game.ctx);
            Game.foodItems.draw(Game.ctx);
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