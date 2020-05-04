import { Engine } from './engine.js';
import { Snake } from './snake.js';
import { PowerUp } from './powerup.js';

// REFERENCES
const userScoreField = document.querySelector('#userInfo h2 span');
const btnDpad = document.querySelector('#gameCommands #buttons #btnDpad');
const btnStart = document.querySelector('#gameCommands #buttons #btnStart');
const canvas = document.getElementById('screen');

// GAME DIMENSION
let context = canvas.getContext('2d');

// SCREEN SIZE
export const CANVAS_HEIGHT = 300;
export const CANVAS_WIDTH = 300;

// SCREEN COLORS
context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
context.fillStyle = 'darkseagreen';
context.save();

// START SCREEN
context.font = '30px Arial';
context.fillStyle = 'white';
context.textAlign = 'center';
context.fillText('SNAKE GAME', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
context.font = '14px Arial';
context.fillText('> Press Start <', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
context.restore();

// INIT
const character = new Snake();
const powerUp = new PowerUp();

// GAME ENGINE | START
const engine = new Engine(
	context, userScoreField, character, powerUp, [btnDpad, btnStart]
);
