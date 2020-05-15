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
		this.#gameInterface = new GameInterface(this.screen);
		this.square = this.#gameInterface.square;
		this.#character = new Snake(this.square);
		this.#powerUp = [new PowerUp(this.square)];
		this.#gameSounds = new SoundEffects();
		this.#gameInterface.drawStartScreen();
		this.#gameControls = new GameControls();

		globalThis.document.onkeydown = (event) => this.#gameControls.keyboardControlsFns
			.bind(null, { execCommands: this.execCommands, event })();

		const btnStartHammerListener = new Hammer(this.#gameControls.canvas);
		btnStartHammerListener.on('tap', () => this.#gameControls.btnStartFns.call(null, { execCommands: this.execCommands }));

		const btnTopHammerListener = new Hammer(this.#gameControls.btnTop);
		btnTopHammerListener.on('tap', (event) => this.#gameControls.btnDpadFns
			.call(null, { type: 'up', execCommands: this.execCommands }));

		const btnLeftHammerListener = new Hammer(this.#gameControls.btnLeft);
		btnLeftHammerListener.on('tap', (event) => this.#gameControls.btnDpadFns
			.call(null, { type: 'left', execCommands: this.execCommands }));

		const btnRightHammerListener = new Hammer(this.#gameControls.btnRight);
		btnRightHammerListener.on('tap', (event) => this.#gameControls.btnDpadFns
			.call(null, { type: 'right', execCommands: this.execCommands }));

		const btnBottomHammerListener = new Hammer(this.#gameControls.btnBottom);
		btnBottomHammerListener.on('tap', (event) => this.#gameControls.btnDpadFns
			.call(null, { type: 'down', execCommands: this.execCommands }));
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

	#testWallCollision = (character) => {
		return (
			character.body[0].x + character.body[0].width > CANVAS_WIDTH
			|| character.body[0].x + character.body[0].width <= 0
			|| character.body[0].y + character.body[0].height > CANVAS_HEIGHT
			|| character.body[0].y + character.body[0].height <= 0
		);
	}

	#updateDifficulty = () => {
		if ((this.#score % 1000 === 0) && this.#speed >= 60) {
			this.#speed -= 20;
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
			powerUp.push(new PowerUp(this.square));
		}

		// Test the collision of the snake's head on power-up
		if (this.#testCollision(character.body[0], powerUp[0])) {
			this.#gameSounds.reproduceSound('apple-crunch');
			powerUp.pop();
			this.#levelUp();
		}

		// Test the collision
		if(
			// collision of the snake and wall
			this.#testWallCollision(character) ||
			// collision of the snake's head on her body
			(character.body.some((partOfBody, index) =>
				index > 0 && this.#testCollision(character.body[0], partOfBody))
			)
		) {
			this.gameOver();
		}

		character.updateSnakeMovement(this.#charDirection);
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
