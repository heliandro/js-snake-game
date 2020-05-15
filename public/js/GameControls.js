export class GameControls {

	constructor() {
		this.canvas = document.querySelector('#screen');
		this.btnTop = document.querySelector('#gameCommands .btnTop .btn');
		this.btnLeft = document.querySelector('#gameCommands .btnsLeftAndRight .btn:first-of-type');
		this.btnRight = document.querySelector('#gameCommands .btnsLeftAndRight .btn:last-of-type');
		this.btnBottom = document.querySelector('#gameCommands .btnBottom .btn');
	}

	btnDpadFns = (args) => {
		switch (args.type) {
			case 'up': {
				args.execCommands.bind(null, { code: 'up' })();
				break;
			}
			case 'left': {
				args.execCommands.bind(null, { code: 'left' })();
				break;
			}
			case 'right': {
				args.execCommands.bind(null, { code: 'right' })();
				break;
			}
			case 'down': {
				args.execCommands.bind(null, { code: 'down' })();
				break;
			}
			default: {
				// ...
			}
		}
	}

	btnStartFns = (args) => {
		args.execCommands.bind(null, { code: 'space' })();
	}

	keyboardControlsFns = (args) => {
		switch (args.event.code) {
			case 'ArrowLeft': {
				args.execCommands.bind(null, { code: 'left' })();
				break;
			}
			case 'ArrowRight': {
				args.execCommands.bind(null, { code: 'right' })();
				break;
			}
			case 'ArrowUp': {
				args.execCommands.bind(null, { code: 'up' })();
				break;
			}
			case 'ArrowDown': {
				args.execCommands.bind(null, { code: 'down' })();
				break;
			}
			case 'Space': {
				args.execCommands.bind(null, { code: 'space' })();
				break;
			}
			default: {
				// ...
			}
		}
	}
}
