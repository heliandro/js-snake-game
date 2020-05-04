import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';

export class PowerUp {

	constructor(x = 0, y = 0, color = 'orange') {

		this.color = color;
		this.width = 10;
		this.height = 10;
		this.x = x || Math.floor(Math.random() * (CANVAS_WIDTH - this.width * 2)) + this.width;
		this.y = y || Math.floor(Math.random() * (CANVAS_HEIGHT - this.height * 2)) + this.height;
	}
}
