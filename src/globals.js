export const CANVAS_ID = 'game_canvas';

export const GAME_SIZE = {x:960, y: 540};

export function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max){
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(2)); // Two decimal places max
}