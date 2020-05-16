import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_SIZE, BOX } from './main.js';

export class GameInterface {

	#appleField;
	#scoreField;
	#speedField;

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
		this.screen.fillText('> Press Space to start <', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
		this.screen.fillText('* Controls: Keyboard arrows', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
		this.screen.restore();
	}

	clearScreenToGameAction = () => {
		this.screen.fillStyle = 'darkseagreen';

		this.screen.fillRect(
			0,
			0,
			(CANVAS_SIZE * BOX) - BOX,
			(CANVAS_SIZE * BOX) - BOX
		);
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
		this.screen.fillText('> press Space to continue... <', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);

		this.screen.restore();
	}
}
