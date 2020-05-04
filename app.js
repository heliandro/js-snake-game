const express = require('express');
const app = express();

// serve static files
app.use('/', express.static(__dirname + '/public'));

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
