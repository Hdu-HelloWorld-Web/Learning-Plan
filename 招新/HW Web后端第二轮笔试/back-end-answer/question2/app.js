const http = require('http');
const fs = require('fs');
const host = 'localhost';
const port = process.env.PORT || 3000;
const server = http.createServer();
server.on('request', (req, res) => {
	// console.log(pathname);

	if(req.url == '/favicon.ico') {
		res.end();
	}
	else if(req.url == '/') {
		res.end(fs.readFileSync('./index.html').toString());
	}
});
server.listen(port, host, () => {
	console.log(`server run at http://${host}:${port}`);
});