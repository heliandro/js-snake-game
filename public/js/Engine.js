import { PowerUp } from './PowerUp.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BOX } from './main.js';
import { drawCharacter, drawPowerUp } from './draw.js';
import { GameInterface } from './GameInterface.js';
import { Snake } from './Snake.js';
import { SoundEffects } from './SoundEffects.js';
import { GameControls } from './GameControls.js';

export class Engine {

	// game running reference
	#gameRef;
	// character, object and enemy
	#character;
	#powerUp = [];
	// scores
	#score = 0;
	#powerUpEaten = 0;
	// engine variables control
	#speed = 180; // 1000 = 1fps | 100 = 10fps
	#charDirection = 'none';
	#firstEnter = true;
	#isGamePaused = false;
	// extra
	#gameInterface;
	#gameSounds;
	#gameControls;

	constructor(context) {

		this.screen = context;
		this.#gameInterface = new GameInterface(this.screen);
		this.square = this.#gameInterface.square;
		this.#character = new Snake(this.square);
		this.#powerUp = [new PowerUp(this.square)];
		this.#gameSounds = new SoundEffects();
		this.#gameInterface.drawStartScreen();
		this.#gameControls = new GameControls();

		globalThis.document.onkeydown = (event) => this.#gameControls.keyboardControlsFns
			.bind(null, { execCommands: this.execCommands, event })();
	}

	execCommands = (args) => {
		if (args.code.includes('space')) {
			if (this.#firstEnter) {
				this.restartGame();
			} else if (this.#isGamePaused) {
				this.resumeGame();
			} else {
				this.stopGame();
			}
		} else {
			this.#charDirection = args.code;
			this.#gameSounds.reproduceSound('moviment');
		}
	}

	#testCollision = (character, object) => {
		if (
			(character.x <= object.x + object.width - 1) &&
			(object.x <= character.x + character.width - 1) &&
			(character.y <= object.y + object.height - 1) &&
			(object.y <= character.y + character.height - 1)
		) {
			return true;
		}
		return false;
	}

	#testCollisionWithMySelf = (character) => {
		// collision of the snake's head on her body
		let isCollided = false;
		for (let index = character.body.length - 1; index >= 0; index--) {
			if (index > 2 && this.#testCollision(character.body[0], character.body[index])) {
				isCollided = true;
				break;
			}
		}
		return isCollided;
	}

	#testWallCollision = (character) => {
		return (
			(character.body[0].x + BOX) > CANVAS_WIDTH
			|| (character.body[0].x + BOX) <= 0
			|| (character.body[0].y + BOX) > CANVAS_HEIGHT
			|| (character.body[0].y + BOX) <= 0
		);
	}

	#updateDifficulty = () => {
		if ((this.#powerUpEaten % 10 === 0) && this.#speed >= 60) {
			this.#speed -= 20;
			// clean setInterval and start new setInterval for update speed
			clearInterval(this.#gameRef);
			this.startGame();
			this.#gameInterface.updatePageField('speed', this.#speed);
		}
	}

	#levelUp = () => {
		// this.#character.increaseSnakeBody();
		this.#character.increaseSnakeBody(this.#character.body[0].x, this.#character.body[0].y)
		this.#score += this.#score <= 1000 ? 100 : Math.floor(this.#score / 1000) * 100;
		this.#powerUpEaten += 1;
		this.#updateDifficulty();
		this.#gameInterface.updatePageField('apple', this.#powerUpEaten);
		this.#gameInterface.updatePageField('score', this.#score);
	}

	#redrawScreen = (character, powerUp, enemy) => {
		// console.time('redrawScreen');
		this.#gameInterface.clearScreenToGameAction();

		// Recreates the apple if it was eaten
		if (powerUp.length === 0) {
			powerUp.push(new PowerUp());
		}

		// Draw snake and apple
		drawPowerUp(this.screen, powerUp[0]);

		// character.body.forEach((partOfBody, index) => drawCharacter(this.screen, partOfBody, index));
		// no forEach for more performance
		for (let index = character.body.length - 1; index >= 0; index--) {
			drawCharacter(this.screen, character.body[index], index);
		}

		// Test the collision of the snake's head on power-up
		if (this.#testCollision(character.body[0], powerUp[0])) {
			this.#gameSounds.reproduceSound('apple-crunch');
			powerUp.pop();
			this.#levelUp();
		}

		// Test the collision
		if(this.#testWallCollision(character) || this.#testCollisionWithMySelf(character)) {
			this.gameOver();
		}

		character.updateSnakeMovement(this.#charDirection);
		// console.timeEnd('redrawScreen');
	}

	gameOver = () => {
		this.stopGame();
		this.#gameInterface.drawGameOverScreen();
		this.#firstEnter = true;
	}

	restartGame = () => {
		this.#character = new Snake();
		this.#powerUp = [new PowerUp()];
		this.#score = 0;
		this.#powerUpEaten = 0;
		this.#gameInterface.resetPageFields();
		this.#firstEnter = false;
		this.#isGamePaused = false;
		this.#charDirection = 'right';
		this.#speed = 200;
		this.#gameInterface.updatePageField('speed', this.#speed);
		this.startGame();
	}

	startGame = () => {
		this.#gameRef = setInterval(() => {
			this.#redrawScreen(this.#character, this.#powerUp);
		}, this.#speed);
	}

	stopGame = () => {
		clearInterval(this.#gameRef);
		this.#isGamePaused = true;
	}

	resumeGame = () => {
		this.startGame();
		this.#isGamePaused = false;
	}

}
