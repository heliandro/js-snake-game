import { PowerUp } from './PowerUp.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';
import { drawCharacter, drawPowerUp } from './draw.js';
import { GameInterface } from './GameInterface.js';
import { Snake } from './Snake.js';
import { SoundEffects } from './SoundEffects.js';

export class Engine {

	#gameRef;
	#firstEnter = true;
	#isGamePaused = false;
	#charDirection = 'none';
	#character;
	#powerUp = [];
	#score = 0;
	#powerUpEaten = 0;
	#gameInterface;
	#gameSounds;

	constructor(context) {

		this.screen = context;
		this.#character = new Snake();
		this.#powerUp = [new PowerUp()];
		this.#gameInterface = new GameInterface(this.screen);
		this.#gameSounds = new SoundEffects();
		this.#gameInterface.drawStartScreen();

		// game controls
		globalThis.document.addEventListener('keydown', this.#keyboardKeyPressed);
		this.#gameInterface.btnDpad.addEventListener('click', this.#btnDpadClick);
		this.#gameInterface.btnStart.addEventListener('click', this.#btnStartCkick)
	}

	get score() {
		return this.#score;
	}

	get powerUpEaten() {
		return this.#powerUpEaten;
	}

	#btnDpadClick = (event) => {
		// console.log(event.layerX);
		// console.log(event.layerY);
		if (event.layerX >= 45 && event.layerX <= 95
			&& event.layerY >= 0 && event.layerY <= 45) {
			this.#charDirection = 'up';
			this.#gameSounds.reproduceSound('moviment');
		} else if (event.layerX >= 45 && event.layerX <= 95
			&& event.layerY >= 95 && event.layerY <= 140) {
			this.#charDirection = 'down';
			this.#gameSounds.reproduceSound('moviment');
		} else if (event.layerX >= 0 && event.layerX <= 45
			&& event.layerY >= 45 && event.layerY <= 95) {
			this.#charDirection = 'left';
			this.#gameSounds.reproduceSound('moviment');
		} else if (event.layerX >= 95 && event.layerX <= 140
			&& event.layerY >= 45 && event.layerY <= 95) {
			this.#charDirection = 'right';
			this.#gameSounds.reproduceSound('moviment');
		}
	}

	#btnStartCkick = (event) => {
		event.preventDefault();
		if (this.#firstEnter) {
			this.#charDirection = 'right';
			this.#firstEnter = false;
			this.startGame();
		} else if (this.#isGamePaused) {
			this.resumeGame();
		} else {
			this.stopGame();
		}
	}

	#keyboardKeyPressed = (event) => {
		switch (event.code) {
			case 'ArrowLeft': {
				this.#charDirection = 'left';
				this.#gameSounds.reproduceSound('moviment');
				break;
			}
			case 'ArrowRight': {
				this.#charDirection = 'right';
				this.#gameSounds.reproduceSound('moviment');
				break;
			}
			case 'ArrowUp': {
				this.#charDirection = 'up'
				this.#gameSounds.reproduceSound('moviment');
				break;
			}
			case 'ArrowDown': {
				this.#charDirection = 'down';
				this.#gameSounds.reproduceSound('moviment');
				break;
			}
			case 'Space': {
				if (this.#firstEnter) {
					this.#charDirection = 'right';
					this.#firstEnter = false;
					this.startGame();
				} else if (this.#isGamePaused) {
					this.resumeGame();
				} else {
					this.stopGame();
				}
			}
			default: {
				//alert('Use as setinhas.');
			}
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

	#levelUp = (character) => {
		character.increaseSnakeBody();
		this.#score += this.score > 2000 ? 84 : 42;
		this.#powerUpEaten += 1;
		this.#gameInterface.updatePageField('apple', this.powerUpEaten);
		this.#gameInterface.updatePageField('score', this.score);
	}

	#redrawScreen = (character, powerUp, enemy) => {
		// draw snake and apple
		powerUp.forEach((object, index) => drawPowerUp(this.screen, object, index));
		character.body.forEach((partOfBody, index) => drawCharacter(this.screen, partOfBody, index));

		// PowerUP
		if (powerUp.length === 0) {
			powerUp.push(new PowerUp());
		}

		// Test Collision => snake and powerUp
		if (this.#testCollision(character.body[0], powerUp[0])) {
			this.#gameSounds.reproduceSound('apple-crunch');
			powerUp.pop();
			this.#levelUp(character);
		}
		// test collision => snake head and snake body
		if(character.body.some((partOfBody, index) => index > 0 && this.#testCollision(character.body[0], partOfBody))) {
			this.resetGame();
		} else {
			character.updateSnakeMovement(this.#charDirection);
		}
	}

	resetGame = () => {
		this.stopGame();
		this.#gameInterface.drawGameOverScreen();
		this.#score = 0;
		this.#powerUpEaten = 0;
		this.#character = new Snake();
		this.#powerUp = [new PowerUp()];
		this.#firstEnter = true;
		this.#isGamePaused = false;
		this.#charDirection = 'none';
		this.#gameInterface.resetPageFields();
	}

	startGame = () => {
		this.#gameRef = setInterval(() => {
			this.#gameInterface.clearScreenToGameAction();
			this.#redrawScreen(this.#character, this.#powerUp);
		}, 150); // 1000 = 1fps
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
