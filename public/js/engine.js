import { PowerUp } from './powerup.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';
import { drawCharacter, drawPowerUp } from './draw.js';

export class Engine {

	#gameRef;
	#firstEnter = true;
	#isGamePaused = false;
	#charDirection = 'none';
	#character;
	#powerUp = [];
	#score = 0;

	constructor(context, userScoreField, character, powerUp, buttons) {
		this.userScoreField = userScoreField;
		this.screen = context;
		this.#character = character;
		this.#powerUp = [powerUp];
		globalThis.document.addEventListener('keydown', this.#keyboardKeyPressed);
		buttons[0].addEventListener('click', this.#dpadClick);
		buttons[1].addEventListener('click', this.#startCkick)
	}

	get score() {
		return this.#score;
	}

	#dpadClick = (event) => {
		// console.log(event.layerX);
		// console.log(event.layerY);
		if (event.layerX >= 45 && event.layerX <= 95
			&& event.layerY >= 0 && event.layerY <= 45) {
			this.#charDirection = 'up';
		} else if (event.layerX >= 45 && event.layerX <= 95
			&& event.layerY >= 95 && event.layerY <= 140) {
			this.#charDirection = 'down';
		} else if (event.layerX >= 0 && event.layerX <= 45
			&& event.layerY >= 45 && event.layerY <= 95) {
			this.#charDirection = 'left';
		} else if (event.layerX >= 95 && event.layerX <= 140
			&& event.layerY >= 45 && event.layerY <= 95) {
			this.#charDirection = 'right';
		}
	}

	#startCkick = (event) => {
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
				break;
			}
			case 'ArrowRight': {
				this.#charDirection = 'right';
				break;
			}
			case 'ArrowUp': {
				this.#charDirection = 'up'
				break;
			}
			case 'ArrowDown': {
				this.#charDirection = 'down';
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
			character.x <= object.x + object.width
			&& character.width + character.x >= object.x

			&& character.y <= object.y + object.width
			&& character.height + character.y >= object.y
		) {
			return true;
		}
	}

	#levelUp = (character) => {
		this.#score += 100;
		if(!this.userScoreField?.textContent.includes(this.score))
			this.userScoreField.innerText = this.#score;
		character.increaseSnakeBody();
	}

	#redrawScreen = (character, powerUp, enemy) => {
		// Character
		character.body.forEach((partOfBody, index) => drawCharacter(this.screen, partOfBody, index));
		character.updateSnakeMovement(this.#charDirection);

		// PowerUP
		if (powerUp.length === 0) {
			powerUp.push(new PowerUp());
		}
		powerUp.forEach((object, index) => drawPowerUp(this.screen, object, index));

		// Test Collision
		if (this.#testCollision(character.body[0], powerUp[0])) {
			powerUp.pop();
			this.#levelUp(character);
		}
	}

	#clearScreen = () => {
		this.screen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.screen.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.screen.fillStyle = 'darkseagreen';
	}

	startGame = () => {
		this.#gameRef = setInterval(() => {
			this.#clearScreen();
			this.#redrawScreen(this.#character, this.#powerUp);
		}, 200); // 1000 = 1fps
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
