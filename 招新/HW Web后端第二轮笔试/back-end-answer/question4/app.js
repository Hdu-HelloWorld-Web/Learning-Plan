const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const host = 'localhost';
const port = process.env.PORT || 3000;
const server = http.createServer();
server.on('request', (req, res) => {
	if(req.url == '/favicon.ico') {
		res.end();
	}
	else if(req.url == '/') {
		res.end(fs.readFileSync('./index.html').toString());
	}
	else if(req.url == '/judge') {
		req.on('data', (data) => {
			let student = querystring.parse(data.toString());
			if(student.score < 0 || student.score > 100) {
				res.end('your input is error');
			}
			else {
				if (student.score >= 90) {
					res.end(`best-${student.name}`);
				}
				else if (student.score >= 85) {
					res.end(`better-${student.name}`);
				}
				else if (student.score >= 60) {
					res.end(`good-${student.name}}`);
				}
				else {
					res.end(`bad-${student.name}`);
				}
			}
		});
	}
	else {
		res.end('the request path is error');
	}
});
server.listen(port, host, () => {
	console.log(`server run at http://${host}:${port}`);
});