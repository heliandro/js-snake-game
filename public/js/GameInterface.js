import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';

export class GameInterface {

	#appleField;
	#scoreField;
	#btnDpad;
	#btnStart

	constructor(screen) {
		this.screen = screen;
		this.#appleField = document.querySelector('#userInfo #apple span');
		this.#scoreField = document.querySelector('#userInfo #trophy span');
		this.#btnDpad = document.querySelector('#gameCommands #buttons #btnDpad');
		this.#btnStart = document.querySelector('#gameCommands #buttons #btnStart');
	}

	get btnDpad() {
		return this.#btnDpad;
	}

	get btnStart() {
		return this.#btnStart;
	}

	updatePageField(field, value) {
		if (field.includes('apple'))
			this.#appleField.innerText = value;
		else
			this.#scoreField.innerText = value;
	}

	resetPageFields() {
		this.#appleField.innerText = 0;
		this.#scoreField.innerText = 0;
	}

	drawStartScreen() {
		this.screen.font = '30px Arial';
		this.screen.fillStyle = 'white';
		this.screen.textAlign = 'center';
		this.screen.fillText('SNAKE GAME', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.screen.font = '14px Arial';
		this.screen.fillText('> Press Start <', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
		this.screen.restore();
	}

	clearScreenToDefault = () => {
		this.screen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.screen.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	clearScreenToGameAction = () => {
		this.clearScreenToDefault();
		this.screen.fillStyle = 'darkseagreen';
	}

	drawGameOverScreen() {
		this.screen.fillStyle = 'black';
		this.clearScreenToDefault();
		this.screen.save();

		this.screen.font = '30px Arial';
		this.screen.fillStyle = 'white';
		this.screen.textAlign = 'center';
		this.screen.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.screen.font = '14px Arial';
		this.screen.fillText('> press start to continue... <', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);

		this.screen.restore();
	}
}
