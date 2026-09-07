export const CANVAS_ID = 'game_canvas';

export const GAME_SIZE = {x:1920, y: 1080};

export function pointIntersects(size, pos, point){
    return (point.x >= pos.x && point.x <= pos.x + size.x && point.y >= pos.y && point.y <= pos.y + size.y);
}

export function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max){
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(2)); // Two decimal places max
}