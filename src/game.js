const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

const Game = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scaleX: 1,
    scaleY: 1
};

function Init(){
    Game.canvas = document.getElementById("game_canvas");
    Game.ctx = Game.canvas.getContext('2d');

    Game.running = true;
    requestAnimationFrame(GameLoop);
}

function GameLoop(timeStamp){
    if(!GAME.running){return;}

    window.addEventListener('resize', ResizeCanvas, false);

    const deltaTime = (timeStamp - Game.lastTime) / 1000; // Calculating Delta Time in seconds
    Game.lastTime = timeStamp;

    Update(deltaTime);

    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height); // Clear canvas before drawing
    Draw();

    requestAnimationFrame(GameLoop); // Restart game loop
}

function ResizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Canvas resized");
}

function Update(deltaTime){
    console.log("Update called");
}

function Draw(){
    console.log("Draw called");
}

window.addEventListener('load', Init);