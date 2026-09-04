import { CANVAS_ID, GAME_SIZE} from './globals.js'
import { Command } from './enums/commands.js'
import { GameState } from './enums/game_states.js'

import { AssetHandler } from './handlers/asset_handler.js'
import { InputHandler } from './handlers/input_handler.js'
import { Gameplay } from './gameplay/gameplay.js'

let screenCenter = {x: 0, y: 0};

export const Game = {
    canvas: null,
    container: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scale: 1.0,
    session: null,
    onAnswer: null,

    assetHandler: new AssetHandler(),
    inputHandler: new InputHandler(),
    gameplay: new Gameplay(),

    activeCommand: Command.NONE,
    gamestate: GameState.LOADING,
};

export function init(options = {}){
    Game.canvas = options.canvas ?? document.getElementById(CANVAS_ID);
    Game.container = options.container ?? Game.canvas?.parentElement ?? null;
    Game.session = options.session ?? null;
    Game.onAnswer = options.onAnswer ?? null;
    Game.ctx = Game.canvas.getContext('2d');
    Game.assetHandler.loadAll();
    Game.running = true;
    Game.lastTime = 0;
    resizeCanvas();
    requestAnimationFrame(gameLoop);
}

export function destroy(){
    Game.running = false;
    Game.inputHandler.removeEventListeners();
    Game.canvas = null;
    Game.container = null;
    Game.session = null;
    Game.onAnswer = null;
}

export function setSession(session){
    Game.session = session ?? null;
}

function gameLoop(timeStamp){
    if(!Game.running){Game.inputHandler.removeEventListeners();return;}
    const deltaTime = (timeStamp - Game.lastTime) / 1000; // Calculating Delta Time in seconds
    Game.lastTime = timeStamp;
    update(deltaTime);
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    draw();
    requestAnimationFrame(gameLoop); // Restart game loop
}

function update(deltaTime){
    switch(Game.gamestate){
        case GameState.LOADING:
            if(Game.assetHandler.areAllAssetsLoaded()){
                Game.gamestate = GameState.INITIALIZING;
            }
            break;
        case GameState.INITIALIZING:
            Game.gameplay.init(Game.assetHandler);
            Game.inputHandler.initInputs();
            resizeCanvas();
            Game.gamestate = GameState.GAMEPLAY;
            break;
        case GameState.GAMEPLAY:
            Game.activeCommand = Game.inputHandler.getActiveCommand();
            Game.gameplay.update(deltaTime);
            break;
        case GameState.GAME_COMPLETE:
            break;
    }
}

function draw(){
    switch(Game.gamestate){
        case GameState.LOADING:
            Game.ctx.fillStyle = "#000";
            Game.ctx.font = `40px Arial`;
            Game.ctx.fillText("Loading...", screenCenter.x - 40, screenCenter.y);
            break;
        case GameState.INITIALIZING:
            Game.ctx.fillText("Initializing...", screenCenter.x - 40, screenCenter.y);
            break;
        case GameState.GAMEPLAY:
            Game.gameplay.draw(Game.ctx);
            break;
        case GameState.GAME_COMPLETE:
            Game.ctx.fillStyle = "#000";
            Game.ctx.font = `40px Arial`;
            Game.ctx.fillText("You did it! Game Complete!", screenCenter.x - 200, screenCenter.y);
            break;
    }
}

export function resizeCanvas(){
    if(!Game.canvas){return;}

    const target = Game.container ?? Game.canvas;
    const displayWidth = target.clientWidth || window.innerWidth;
    const displayHeight = target.clientHeight || window.innerHeight;

    const scaleX = displayWidth / GAME_SIZE.x;
    const scaleY = displayHeight / GAME_SIZE.y;

    Game.scale = Math.min(scaleX, scaleY);

    const scaledWidth = GAME_SIZE.x * Game.scale;
    const scaledHeight = GAME_SIZE.y * Game.scale;

    Game.canvas.width = scaledWidth;
    Game.canvas.height = scaledHeight;

    Game.canvas.style.width = scaledWidth + 'px';
    Game.canvas.style.height = scaledHeight + 'px';

    Game.gameplay.changeScale(Game.scale);
}