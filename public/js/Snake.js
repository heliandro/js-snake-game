import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';
import { GameInterface } from './GameInterface.js';

export class Snake {

	#body = [];
	#bodyPart = { height: 0, width: 0, x: 0, y: 0, color: 'black'};
	#previousDirection = '';

	constructor(size = 20) {
		this.#bodyPart = { ...this.#bodyPart, height: size, width: size };
		this.#body = [
			{ ...this.#bodyPart, x: 140, y: 140, color: 'purple' },
			{ ...this.#bodyPart, x: 120, y: 140 },
			{ ...this.#bodyPart, x: 100, y: 140 }
		];
	}

	get body() {
		return this.#body;
	};

	get previousDirection() {
		return this.#previousDirection;
	}

	set previousDirection(direction) {
		this.#previousDirection = direction;
	}

	updateBodyPart = (pos, x, y)  => {
		this.#body[pos].x = x ?? this.#body[pos].x;
		this.#body[pos].y = y ?? this.#body[pos].y;
	}

	increaseSnakeBody = () => {
		this.#body.push(
			{
				...this.#bodyPart,
				x: this.body[this.body.length-1].x - (this.#bodyPart.width),
				y: this.body[this.body.length-1].y
			}
		);
	}

	// colisão com as bordas da tela
	#checkSnakePosition = () => {
		if (this.#body[0].x + this.#body[0].width > CANVAS_WIDTH - this.#bodyPart.width) {
			this.updateBodyPart(0, this.#bodyPart.width);
		}
		if (this.#body[0].x + this.#body[0].width < this.#bodyPart.width) {
			this.updateBodyPart(0, CANVAS_WIDTH - this.#bodyPart.width);
		}
		if (this.#body[0].y + this.#body[0].height > CANVAS_HEIGHT - this.#bodyPart.height) {
			this.updateBodyPart(0, null, this.#bodyPart.height);
		}
		if (this.#body[0].y + this.#body[0].height < this.#bodyPart.height) {
			this.updateBodyPart(0, null, CANVAS_HEIGHT - this.#bodyPart.height);
		}
	}

	#moveToRight = (i) => {
		this.previousDirection = 'right';
		this.#body[i].x = i == 0 ? this.#body[i].x + (this.#bodyPart.width) : this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y : this.#body[i-1].y;
	}

	#moveToLeft = (i) => {
		this.previousDirection = 'left';
		this.#body[i].x = i == 0 ? this.#body[i].x - (this.#bodyPart.width) : this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y : this.#body[i-1].y;
	}

	#moveToUp = (i) => {
		this.previousDirection = 'up';
		this.#body[i].x = i == 0 ? this.#body[i].x : this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y - (this.#bodyPart.height): this.#body[i-1].y;
	}

	#moveToDown = (i) => {
		this.previousDirection = 'down';
		this.#body[i].x = i == 0 ? this.#body[i].x: this.#body[i-1].x;
		this.#body[i].y = i == 0 ? this.#body[i].y + (this.#bodyPart.height): this.#body[i-1].y;
	}

	updateSnakeMovement = (direction) => {
		// this.#checkSnakePosition();

		for (let i = this.body.length-1; i >= 0; i--) {

			switch (direction) {

				case 'left': {
					if (this.#previousDirection === 'right') {
						this.#moveToRight(i);
					} else {
						this.#moveToLeft(i);
					}
					break;
				}

				case 'right': {
					if (this.#previousDirection === 'left') {
						this.#moveToLeft(i);
					} else {
						this.#moveToRight(i);
					}
					break;
				}

				case 'up': {
					if (this.#previousDirection === 'down') {
						this.#moveToDown(i);
					} else {
						this.#moveToUp(i);
					}
					break;
				}

				case 'down': {
					if (this.#previousDirection === 'up') {
						this.#moveToUp(i);
					} else {
						this.#moveToDown(i);
					}
					break;
				}
			}
		}
	};
}
