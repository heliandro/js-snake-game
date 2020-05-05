export class GameControls {

	constructor() {
		this.btnDpad = document.querySelector('#gameCommands #buttons #btnDpad');
		this.btnStart = document.querySelector('#gameCommands #buttons #btnStart');
	}

	btnDpadFns = (args) => {
		if (args.event.srcEvent.layerX >= 45 && args.event.srcEvent.layerX <= 95
			&& args.event.srcEvent.layerY >= 0 && args.event.srcEvent.layerY <= 45
		) {
			args.execCommands.bind(null, { code: 'up' })();
		} else if (args.event.srcEvent.layerX >= 45 && args.event.srcEvent.layerX <= 95
			&& args.event.srcEvent.layerY >= 95 && args.event.srcEvent.layerY <= 140
		) {
			args.execCommands.bind(null, { code: 'down' })();
		} else if (args.event.srcEvent.layerX >= 0 && args.event.srcEvent.layerX <= 45
			&& args.event.srcEvent.layerY >= 45 && args.event.srcEvent.layerY <= 95
		) {
			args.execCommands.bind(null, { code: 'left' })();
		} else if (args.event.srcEvent.layerX >= 95 && args.event.srcEvent.layerX <= 140
			&& args.event.srcEvent.layerY >= 45 && args.event.srcEvent.layerY <= 95
		) {
			args.execCommands.bind(null, { code: 'right' })();
		}
	}

	btnStartFns = (args) => {
		args.event.preventDefault();
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
