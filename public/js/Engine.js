import { PowerUp } from './PowerUp.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';
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
	#speed = 200; // 1000 = 1fps | 100 = 10fps
	#charDirection = 'none';
	#firstEnter = true;
	#isGamePaused = false;
	// extra
	#gameInterface;
	#gameSounds;
	#gameControls;

	constructor(context) {

		this.screen = context;
		this.#character = new Snake();
		this.#powerUp = [new PowerUp()];
		this.#gameInterface = new GameInterface(this.screen);
		this.#gameSounds = new SoundEffects();
		this.#gameInterface.drawStartScreen();
		this.#gameControls = new GameControls();

		globalThis.document.onkeydown = (event) => this.#gameControls.keyboardControlsFns
			.bind(null, { execCommands: this.execCommands, event })();

		const btnDpadHammerListener = new Hammer(this.#gameControls.btnDpad);
		btnDpadHammerListener.on('tap', (event) => this.#gameControls.btnDpadFns.bind(null, { execCommands: this.execCommands, event })());

		const btnStartHammerListener = new Hammer(this.#gameControls.btnStart);
		btnStartHammerListener.on('tap', (event) => this.#gameControls.btnStartFns.bind(null, { execCommands: this.execCommands, event })());

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
			(character.x <= object.x + object.width) &&
			(object.x <= character.x + character.width) &&
			(character.y <= object.y + object.height) &&
			(object.y <= character.y + character.height)
		) {
			return true;
		}
		return false;
	}

	#updateDifficulty = () => {
		if ((this.#score % 500 === 0) && this.#speed >= 60) {
			this.#speed -= 10;
			// clean setInterval and start new setInterval for update speed
			clearInterval(this.#gameRef);
			this.startGame();
			this.#gameInterface.updatePageField('speed', this.#speed);
		}
	}

	#levelUp = () => {
		this.#character.increaseSnakeBody();
		this.#score += this.#score >= 2000 ? 200 : 100;
		this.#powerUpEaten += 1;
		this.#updateDifficulty();
		this.#gameInterface.updatePageField('apple', this.#powerUpEaten);
		this.#gameInterface.updatePageField('score', this.#score);
	}

	#redrawScreen = (character, powerUp, enemy) => {

		// Draw snake and apple
		powerUp.forEach((object, index) => drawPowerUp(this.screen, object, index));
		character.body.forEach((partOfBody, index) => drawCharacter(this.screen, partOfBody, index));

		// Recreates the apple if it was eaten
		if (powerUp.length === 0) {
			powerUp.push(new PowerUp());
		}

		// Test the collision of the snake's head on power-up
		if (this.#testCollision(character.body[0], powerUp[0])) {
			this.#gameSounds.reproduceSound('apple-crunch');
			powerUp.pop();
			this.#levelUp();
		}

		// Test the collision of the snake's head on her body
		if(character.body.some((partOfBody, index) => index > 0 && this.#testCollision(character.body[0], partOfBody))) {
			this.gameOver();
		} else {
			character.updateSnakeMovement(this.#charDirection);
		}
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
			this.#gameInterface.clearScreenToGameAction();
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
