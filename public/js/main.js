import { Engine } from './Engine.js';

// CANVAS REFERENCE
const canvas = document.getElementById('screen');

// GAME DIMENSION
let context = canvas.getContext('2d');

// SCREEN SIZE
export const CANVAS_HEIGHT = 280;
export const CANVAS_WIDTH = 280;

// SCREEN COLORS
context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
context.save();

// GAME ENGINE | START
const engine = new Engine(context);
