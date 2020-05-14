import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';
import { GameInterface } from './GameInterface.js';

export class PowerUp {

	constructor(size = 20, color = 'orange') {

		this.color = color;
		this.width = size;
		this.height = size;

		// normal way
		// let max = (CANVAS_WIDTH/20) + 1;
		// this.x = this.width * (Math.floor(Math.random()) * max);
		// this.y = this.height * (Math.floor(Math.random()) * max);

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
