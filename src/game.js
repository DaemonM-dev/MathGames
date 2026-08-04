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

    const deltaTime = (timestamp - GAME.lastTime) / 1000; // Calculating Delta Time
    GAME.lastTime = timestamp;

    Update(deltaTime);

    GAME.ctx.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height); // Clear canvas before drawing
    Draw();

    requestAnimationFrame(GameLoop); // Restart game loop
}

function Update(deltaTime){

}

function Draw(){

}

window.addEventListener('load', Init);