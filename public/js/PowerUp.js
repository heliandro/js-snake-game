import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_SIZE, BOX } from './main.js';

export class PowerUp {

	constructor(color = 'orange') {

		this.color = color;
		this.width = BOX;
		this.height = BOX;

		let random;

		random = Math.random() * (CANVAS_WIDTH - this.width);
		const jumpX = random - (random % this.width);
		this.x = jumpX == 0 ? jumpX + this.width : jumpX;

		random = Math.random() * (CANVAS_HEIGHT - this.height);
		const jumpY = random - (random % this.height);
		this.y = jumpY == 0 ? jumpY + this.height : jumpY;

		//console.log(`randomX: ${jumpX} | randomY: ${jumpY} | x: ${this.x} | y: ${this.y}`);
	}
}
