const http = require('http');
const server = http.createServer();
const port = process.env.PORT || 3000;
const host = 'localhost';
server.on('request', (req, res) => {
	console.log(req.url);
	if(req.url != '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello World');
	}
});
server.listen(port, host, () => {
	console.log(`server run at http://${host}:${port}`);
});