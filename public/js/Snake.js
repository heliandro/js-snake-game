import { BOX } from './main.js';

export class Snake {

	#body = [];
	#bodyPart = { height: 0, width: 0, x: 0, y: 0, color: 'green'};
	#previousDirection = '';

	constructor() {
		this.#bodyPart = { ...this.#bodyPart, height: BOX, width: BOX };
		this.#body = [
			{ ...this.#bodyPart, x: 140, y: 140, color: 'darkgreen' },
			{ ...this.#bodyPart, x: 120, y: 140 },
		];
	}

	get body() {
		return this.#body;
	};

	decrementSnakeBody = () => {
		this.#body.pop();
	}

	increaseSnakeBody = (x, y) => {
		// this.#body.push(
		// 	{
		// 		...this.#bodyPart,
		// 		x: this.body[this.body.length-1].x - (this.#bodyPart.width),
		// 		y: this.body[this.body.length-1].y
		// 	}
		// );
		this.#body.unshift({
			...this.#bodyPart,
			x,
			y
		})
	}

	#moveToRight = (index) => {
		this.#previousDirection = 'right';
		this.#body[index].x = index == 0 ? (this.#body[index].x + this.#bodyPart.width) : this.#body[index-1].x;
		this.#body[index].y = index == 0 ? this.#body[index].y : this.#body[index-1].y;
	}

	#moveToLeft = (index) => {
		this.#previousDirection = 'left';
		this.#body[index].x = index == 0 ? (this.#body[index].x - this.#bodyPart.width) : this.#body[index-1].x;
		this.#body[index].y = index == 0 ? this.#body[index].y : this.#body[index-1].y;
	}

	#moveToUp = (index) => {
		this.#previousDirection = 'up';
		this.#body[index].x = index == 0 ? this.#body[index].x : this.#body[index-1].x;
		this.#body[index].y = index == 0 ? (this.#body[index].y - this.#bodyPart.height): this.#body[index-1].y;
	}

	#moveToDown = (index) => {
		this.#previousDirection = 'down';
		this.#body[index].x = index == 0 ? this.#body[index].x: this.#body[index-1].x;
		this.#body[index].y = index == 0 ? (this.#body[index].y + this.#bodyPart.height): this.#body[index-1].y;
	}

	updateSnakeMovement = (direction) => {
		// console.time('Snake moviment');
		//for (let index = this.body.length-1; index >= 0; index--) {

		this.decrementSnakeBody();

		let snakeX = this.#body[0].x;
		let snakeY = this.#body[0].y;

		switch (direction) {

			case 'left': {
				if (this.#previousDirection === 'right') {
					// this.#moveToRight(index);
					snakeX += BOX;
				} else {
					// this.#moveToLeft(index);
					this.#previousDirection = 'left';
					snakeX -= BOX;
				}
				break;
			}

			case 'right': {
				if (this.#previousDirection === 'left') {
					// this.#moveToLeft(index);
					snakeX -= BOX;
				} else {
					// this.#moveToRight(index);
					this.#previousDirection = 'right';
					snakeX += BOX;
				}
				break;
			}

			case 'up': {
				if (this.#previousDirection === 'down') {
					// this.#moveToDown(index);
					snakeY += BOX;
				} else {
					// this.#moveToUp(index);
					this.#previousDirection = 'up';
					snakeY -= BOX;
				}
				break;
			}

			case 'down': {
				if (this.#previousDirection === 'up') {
					// this.#moveToUp(index);
					snakeY -= BOX;
				} else {
					// this.#moveToDown(index);
					this.#previousDirection = 'down';
					snakeY += BOX;
				}
				break;
			}
		}

		// this.#body[0].x = snakeX; this.#body[0].y = snakeY;
		this.increaseSnakeBody(snakeX, snakeY);
		// }
		// console.timeEnd('Snake moviment');
	};
}
