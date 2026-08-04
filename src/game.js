const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

const GAME = {
    canvas: null,
    ctx: null,
    running: false,
    lastTime: 0,
    scaleX: 1,
    scaleY: 1
};

function Init(){
    GAME.canvas = document.getElementById("game_canvas");
    GAME.ctx = GAME.canvas.getContext('2d');

    GAME.running = true;
    requestAnimationFrame(GameLoop);
}

function GameLoop(timeStamp){
    if(!GAME.running){return;}

    const deltaTime = (timeStamp - GAME.lastTime) / 1000; // Calculating Delta Time
    GAME.lastTime = timeStamp;

    Update(deltaTime);

    GAME.ctx.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height); // Clear canvas before drawing
    Draw();

    requestAnimationFrame(GameLoop); // Restart game loop
}

function Update(deltaTime){
    console.log("Update called");
}

function Draw(){
    GAME.ctx.strokeStyle = '#df2020';
    GAME.ctx.lineWidth = 5;
    GAME.ctx.strokeRect(0, 0, GAME.canvas.width, GAME.canvas.height);
    
    console.log("Draw called");
}

window.addEventListener('load', Init);