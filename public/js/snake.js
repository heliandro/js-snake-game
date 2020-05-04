import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';

export class Snake {

	#body = [];
	#bodyPart = { height: 10, width: 10, x: 0, y: 0, color: 'black'};
	#previousDirection = '';

	constructor() {
		this.#body = [
			{ ...this.#bodyPart, x: 150, y: 150, color: 'purple' },
			{ ...this.#bodyPart, x: 139, y: 150 },
			{ ...this.#bodyPart, x: 128, y: 150 }
		];
	}

	get body() {
		return this.#body;
	};

	set previousDirection(direction) {
		this.#previousDirection = direction;
	}

	updateBodyPart = (pos, x, y)  => {
		this.#body[pos].x = x ?? this.#body[pos].x;
		this.#body[pos].y = y ?? this.#body[pos].y;
	}

	increaseSnakeBody = () => {
		this.#body = [
			...this.body,
			{
				...this.#bodyPart,
				x: this.body[this.body.length-1].x - (this.#bodyPart.width + 1),
				y: this.body[this.body.length-1].y
			}
		];
	}

	// colisão com as bordas da tela
	#checkSnakePosition = () => {
		if (this.#body[0].x > CANVAS_WIDTH) {
			this.updateBodyPart(0, 0);
		}
		if (this.#body[0].x < 0) {
			this.updateBodyPart(0, CANVAS_WIDTH);
		}
		if (this.#body[0].y > CANVAS_HEIGHT) {
			this.updateBodyPart(0, null, 0);
		}
		if (this.#body[0].y < 0) {
			this.updateBodyPart(0, null, CANVAS_HEIGHT);
		}
	}

	#moveToRight = (i) => {
		this.previousDirection = 'right';
		this.#body[i].x = i == 0 ? this.#body[i].x + 11 : this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y : this.#body[i-1].y;
	}

	#moveToLeft = (i) => {
		this.previousDirection = 'left';
		this.#body[i].x = i == 0 ? this.#body[i].x - 11 : this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y : this.#body[i-1].y;
	}

	#moveToUp = (i) => {
		this.previousDirection = 'up';
		this.#body[i].x = i == 0 ? this.#body[i].x : this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y - 11 : this.#body[i-1].y;
	}

	#moveToDown = (i) => {
		this.previousDirection = 'down';
		this.#body[i].x = i == 0 ? this.#body[i].x: this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y + 11 : this.#body[i-1].y;
	}

	updateSnakeMovement = (direction) => {
		this.#checkSnakePosition();

		for (let i = this.body.length-1; i >= 0; i--) {

			switch (direction) {

				case 'left': {
					if (this.#previousDirection === 'right')
						this.#moveToRight(i);
					else
						this.#moveToLeft(i);
					break;
				}

				case 'right': {
					if (this.#previousDirection === 'left')
						this.#moveToLeft(i);
					else
						this.#moveToRight(i);
					break;
				}

				case 'up': {
					if (this.#previousDirection === 'down')
						this.#moveToDown(i);
					else
						this.#moveToUp(i);
					break;
				}

				case 'down': {
					if (this.#previousDirection === 'up')
						this.#moveToUp(i);
					else
						this.#moveToDown(i);
					break;
				}
			}
		}
	};
}
