import { CANVAS_ID, GAME_SIZE} from './globals.js'
import { Command } from './enums/commands.js'
import { GameState } from './enums/game_states.js'
import { Difficulty } from './enums/difficulty.js'

import { AssetHandler } from './handlers/asset_handler.js'
import { InputHandler } from './handlers/input_handler.js'
import { Gameplay } from './gameplay/gameplay.js'
import { MainMenu } from './gameplay/elements/main_menu.js'

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
    mainMenu: new MainMenu(),

    activeCommand: Command.NONE,
    gamestate: GameState.LOADING,

    transition: {
        playing: false,
        state: 'none',
        alpha: 0.0,
        targetAlpha: 0.0,
        speed: 0.0
     }
};

export function init(options = {}){
    Game.canvas = options.canvas ?? document.getElementById(CANVAS_ID);
    Game.container = options.container ?? Game.canvas?.parentElement ?? null;
    Game.session = options.session ?? null;
    Game.onAnswer = options.onAnswer ?? null;
    Game.initial_score = options.score ?? {level:1, score:0};
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
            console.log("=== Loading Assets ===");
            if(Game.assetHandler.areAllAssetsLoaded()){
                console.log("=== Assets Loaded ===");
                Game.gamestate = GameState.INIT_MENU;
            }
            break;

        case GameState.INIT_MENU:
            console.log("=== Initializing Main Menu ===");
            Game.inputHandler.initInputs();
            Game.mainMenu.init(Game.assetHandler);
            resizeCanvas();
            Game.gameplay.initScore(Game.initial_score);
            console.log("=== Finished Initializing Main Menu ===");
            Game.gamestate = GameState.MAIN_MENU;
            break;

        case GameState.MAIN_MENU:
            if(!Game.transition.playing){
                Game.activeCommand = Game.inputHandler.getActiveCommand();
                Game.mainMenu.update(Game.activeCommand, Game.inputHandler.mousePos, deltaTime);
                if(Game.mainMenu.easyButton.isPressed()){
                    Game.gameplay.setDifficulty(Difficulty.REGULAR);
                    startFadeToBlack(0.5, Game.transition);
                } else if(Game.mainMenu.hardButton.isPressed()){
                    Game.gameplay.setDifficulty(Difficulty.CHALLENGE);
                    startFadeToBlack(0.5, Game.transition);
                }
            } else {
                updateTransition(Game.transition, deltaTime);
                if(!Game.transition.playing){
                    Game.gamestate = GameState.INITIALIZING;
                    startFadeFromBlack(0.25, Game.transition);
                }
            }
            break;
        case GameState.INITIALIZING:
            console.log("=== Starting to Initialize Gameplay ===");
            Game.gameplay.init(Game.assetHandler);
            // Game.inputHandler.initInputs();
            // Game.mainMenu.init(Game.assetHandler);
            resizeCanvas();
            console.log("=== Finished Initializing Gameplay ===");
            Game.gamestate = GameState.GAMEPLAY;
            // Game.gameplay.initScore(Game.initial_score);
            break;
        case GameState.GAMEPLAY:
                Game.activeCommand = Game.inputHandler.getActiveCommand();
                Game.gameplay.update(Game.activeCommand, Game.inputHandler.mousePos, deltaTime);
                updateTransition(Game.transition, deltaTime);
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
        case GameState.MAIN_MENU:
            Game.mainMenu.draw(Game.ctx);
            if(Game.transition.playing){drawTransition(Game.transition, Game.ctx);}
            break;
        case GameState.GAMEPLAY:
            Game.gameplay.draw(Game.ctx);
            if(Game.transition.playing){drawTransition(Game.transition, Game.ctx);}
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

    if(Game.gameplay){Game.gameplay.changeScale(Game.scale);}
    if(Game.mainMenu){Game.mainMenu.changeScale(Game.scale);}
}

function startFadeToBlack(duration, transition){
        transition.playing = true;
        transition.state = 'fadeToBlack';
        transition.alpha = 0.0;
        transition.targetAlpha = 1.0;
        transition.speed = 1.0 / duration;
}

function startFadeFromBlack(duration, transition){
    transition.playing = true;
        transition.state = 'fadeFromBlack';
        transition.alpha = 1.0;
        transition.targetAlpha = 0.0;
        transition.speed = 1.0 / duration;
}

function updateTransition(transition, deltaTime){
    if(transition.playing){
        switch(transition.state){
            case 'fadeToBlack':
                if(transition.alpha < transition.targetAlpha){
                    transition.alpha += transition.speed * deltaTime;
                } else {
                    transition.alpha = transition.targetAlpha;
                    transition.playing = false;
                }
                break;
            case 'fadeFromBlack':
                if(transition.alpha > transition.targetAlpha){
                    transition.alpha -= transition.speed * deltaTime;
                } else {
                    transition.alpha = transition.targetAlpha;
                    transition.playing = false;
                }
                break;
        }
    }
}

function drawTransition(transition, ctx){
   ctx.fillStyle = `rgba(0, 0, 0, ${transition.alpha})`;
   ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
}