export class GameControls {

	constructor() {}

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
