import { CANVAS_HEIGHT, CANVAS_WIDTH } from './main.js';

export class PowerUp {

	constructor(x = 0, y = 0, color = 'orange') {

		this.color = color;
		this.width = 10;
		this.height = 10;

		let jump = (CANVAS_WIDTH / 10);
		this.x = (Math.random() * CANVAS_WIDTH)  + jump;
		this.x = this.x > CANVAS_WIDTH - jump ? CANVAS_WIDTH - jump : this.x;
		this.y = (Math.random() * CANVAS_HEIGHT)  + jump;
		this.y = this.y > CANVAS_HEIGHT - jump ? CANVAS_HEIGHT - jump : this.y;
	}
}
