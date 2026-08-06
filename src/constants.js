export const CANVAS_ID = 'game_canvas';
export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export class Vector2i {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Vector2f {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
}