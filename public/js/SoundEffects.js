export class SoundEffects {

	soundsRef = [];

	constructor() {
		let sounds = [
			{ name: 'apple-crunch', src: 'sounds/apple-crunch.wav' },
			{ name: 'moviment', src: 'sounds/moviment.wav' }
		];

		sounds.forEach(sound => {
			let element = document.createElement("audio");
			element.src = sound.src;
			element.setAttribute("preload", "auto");
			element.setAttribute("controls", "none");
			element.setAttribute("id", sound.name);
			element.style.display = "none";
			document.body.appendChild(element);
			this.soundsRef.push({ name: sound.name, ref: document.getElementById(`${sound.name}`) });
		});
	}

	reproduceSound(name) {
		let soundAux = this.soundsRef.find(sound => sound.name.includes(name));
		if(soundAux) soundAux.ref.play();
	}
}
