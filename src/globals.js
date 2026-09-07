export const CANVAS_ID = 'game_canvas';

export const GAME_SIZE = {x:1920, y: 1080};

export function pointIntersects(point, object){
    if(point.size && point.pos){
        const CENTER = {x: point.pos.x + (point.size.x / 2), y: point.pos.y + (point.size.y / 2)};
        return(
        CENTER.x >= object.pos.x && 
        CENTER.x <= object.pos.x + object.size.x && 
        CENTER.y >= object.pos.y && 
        CENTER.y <= object.pos.y + object.size.y);
    }
    
    return(point.x >= object.pos.x && 
        point.x <= object.pos.x + object.size.x && 
        point.y >= object.pos.y && 
        point.y <= object.pos.y + object.size.y);
}

export function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max){
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(2)); // Two decimal places max
}