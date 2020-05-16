const drawCharacter = (context, partOfBody, index) => {
	context.save();

	context.fillStyle = index === 0 ? 'darkgreen' : partOfBody.color;
	context.fillRect(partOfBody.x, partOfBody.y, partOfBody.width, partOfBody.height);

	context.restore();
}

const drawPowerUp = (context, object, index) => {
	context.save();

	context.fillStyle = 'red';
	context.fillRect(object.x, object.y, object.width, object.height);

	context.restore();
}

export { drawCharacter, drawPowerUp };
