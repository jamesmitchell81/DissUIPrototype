var ipc = require('ipc');

var james = document.getElementById('james');
var body = document.body;

console.log(body);

james.onclick = function() {
	ipc.send('change-page', 'next.html');
}

body.ondragover = function(e) {
	e.preventDefault();
	var file = e.dataTransfer.files[0];

	if ( file.type === ('image/png' || 'image/jpg') ) {
		body.style.backgroundColor = "#0f0";
	} else {
		body.style.backgroundColor = "#f00";
	}

	console.log(file);
}

body.ondragleave = function() {
	body.style.backgroundColor = "#fff";
}

body.ondrop = function(e) {
	e.preventDefault();
}




