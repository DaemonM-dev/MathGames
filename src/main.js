import { Init } from './game.js';
import { ResizeCanvas } from './renderer.js';

window.addEventListener('load', Init);
window.addEventListener('resize', ResizeCanvas);