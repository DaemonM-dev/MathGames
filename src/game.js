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
    activeCommand: Commands.NONE,

    playerKuro: 0,
    submitted: false,
    nextLevelTimeout: null
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
            Game.playerKuro = Game.level.getStartingKuro();
            Game.gamestate = GameStates.GAMEPLAY;
            console.log("Game initialized!");
            break;
        case GameStates.GAMEPLAY:
            Game.activeCommand = Game.inputHandler.getActiveCommand();
            Game.level.update(Game.scale, deltaTime);
            Game.uiHandler.update(Game.activeCommand, Game.scale, Game.ctx, deltaTime);
            Game.foodItems.update(Game.activeCommand, Game.inputHandler.mousePos, Game.scale, Game.level.dropZone, deltaTime);

            if(Game.inputHandler.submitButtonPressed){
                handleLevelSubmission();
            }
            break;
        case GameStates.RESTARTING:
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
            Game.level.draw(Game.ctx);
            Game.uiHandler.draw(Game.ctx);
            Game.foodItems.draw(Game.ctx);
            drawPlayerKuro();
            break;
        case GameStates.RESTARTING:
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
    if (Game.canvas.width !== displayWidth || Game.canvas.height !== displayHeight) {
        Game.canvas.width = displayWidth;
        Game.canvas.height = displayHeight;
        Game.scale.x = displayWidth / GAME_WIDTH;
        Game.scale.y = displayHeight / GAME_HEIGHT;
        screenCenter = {x: displayWidth / 2, y: displayHeight / 2};
    }
}

function handleLevelSubmission(){
    const foodInDropZone = Game.foodItems.getFoodInDropZone(Game.level.dropZone);
    
    if (foodInDropZone.length === 0) {
        console.log("There are no food items in the dropzone!");
        return;
    }
    
    const totalCost = Game.foodItems.calculateTotalCost(Game.level);
    
    if(totalCost > Game.playerKuro) {
        Game.uiHandler.speechBubble?.showFeedback("You don't have enough Kuro!");
        Game.foodItems.resetToStartingPositions();
        return;
    }
    
    console.log("Congratulations! You got it right!");
    
    if (Game.nextLevelTimeout) {
        clearTimeout(Game.nextLevelTimeout);
    }
    
    Game.nextLevelTimeout = setTimeout(() => {
        advanceToNextLevel();
    }, 1000);
}

function advanceToNextLevel(){
    const levelOrder = Object.values(Levels);
    const currentIndex = levelOrder.indexOf(Game.currentLevel);

    if(currentIndex < levelOrder.length - 1){
        Game.currentLevel = levelOrder[currentIndex + 1];
        startNewLevel();
    } else {
        console.log("Game Completed!");
        Game.gamestate = GameStates.GAME_COMPLETE;
    }
}

function startNewLevel(){
    Game.level.loadLevel();
    Game.foodItems.startNewLevel();
    Game.playerKuro = Game.level.getStartingKuro();
    Game.submitted = false;
    
    if (Game.nextLevelTimeout) {
        clearTimeout(Game.nextLevelTimeout);
        Game.nextLevelTimeout = null;
    }
}

function drawPlayerKuro(){
    Game.ctx.fillStyle = "black";
    Game.ctx.font = `24px Arial`;
    Game.ctx.fillText(`Kuro: ${Game.playerKuro}`, 1300, 125);
}
