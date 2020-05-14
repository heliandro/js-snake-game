import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';

export class GameInterface {

	#appleField;
	#scoreField;
	#speedField;
	square = 20;
	#canvasSize = 16;

	constructor(screen) {
		this.screen = screen;
		this.#appleField = document.querySelector('#userInfo #apple span');
		this.#scoreField = document.querySelector('#userInfo #score span');
		this.#speedField = document.querySelector('#userInfo #speed span');
	}

	updatePageField(field, value) {
		if (field.includes('apple'))
			this.#appleField.innerText = value;
		else if (field.includes('score'))
			this.#scoreField.innerText = value;
		else {
			// speed conversion
			let speedText = Math.round((200 - value) * 5 / 100);
			this.#speedField.innerText = speedText;
		}
	}

	resetPageFields() {
		this.#appleField.innerText = 0;
		this.#scoreField.innerText = 0;
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
		this.screen.fillStyle = 'burlywood';
		this.screen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.screen.fillRect(
			0,
			0,
			CANVAS_WIDTH,
			CANVAS_HEIGHT
		);
		this.screen.save();

		this.screen.fillStyle = 'darkseagreen';

		this.screen.fillRect(
			0,//this.square,
			0,//this.square,
			this.#canvasSize * this.square - this.square,
			this.#canvasSize * this.square - this.square
		);

		this.screen.restore();
	}

	clearScreenToGameAction = () => {
		this.clearScreenToDefault();
		// this.screen.fillStyle = 'darkseagreen';
	}

	drawGameOverScreen() {
		this.screen.fillStyle = 'black';
		this.screen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.screen.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
