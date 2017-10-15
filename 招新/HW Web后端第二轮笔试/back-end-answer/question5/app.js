const mongodb = require('mongodb');
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const host = 'localhost';
const port = process.env.PORT || 3000;
const mongodbClient = mongodb.MongoClient;
const dburl = 'mongodb://localhost:27017/student';


function Db (db) {
	this.db = db;
};
Db.prototype.coll = function (collname) {
	this.collection = this.db.collection(collname);
};
Db.prototype.insert = function (data, callback) {
	this.collection.insert(data, callback);
};
Db.prototype.find = function (_query, callback) {
	let query = _query || {};
	this.collection.find(query).toArray(callback);
};
Db.prototype.remove = function (_query, callback) {
	let query = _query;
	this.collection.remove(query, callback);
};
function fnServer (_db) {
	let db = _db;
	const server = http.createServer();
	server.on('request', (req, res) => {
		let examDb = new Db(db);
		examDb.coll('exam');
		if(req.url == '/favicon.ico') {
			res.end();
		}
		else if(req.url == '/') {
			res.end(fs.readFileSync('./index.html').toString());
		}
		else if(req.url == '/insert') {
			req.on('data', function (data) {
				let _data = querystring.parse(data.toString());
				console.log(_data);
				examDb.insert(_data, (err, result) => {
					if(err) return console.log(err);
					res.end('insert successful');
				});
			});
		}
		else if(req.url == '/find') {
			req.on('data', function (data) {
				let _data = querystring.parse(data.toString());
				examDb.find(_data, function (err, result) {
					if(err) return res.end('the database error');
					if(result.length == 0)
						return res.end('not exist the person');
					let score = result[0].score;
					res.end(`${_data.name}-${score}`);
				});
			});
		}
		else if(req.url == '/remove') {
			req.on('data', function (data) {
				let _data = querystring.parse(data.toString());
				examDb.remove(_data, function (err, result) {
					if(err) return res.end('remove failed');
					if(result.result.n) {
						res.end('remove successful');
					}
					else {
						res.end('not exist the person');
					}
				});
			});
		}
		else {
			res.end('the request path is wrong');
		}
	});
	server.listen(port, host, () => {
		console.log(`server run at http://${host}:${port}`);
	});
};

mongodbClient.connect(dburl, (err, db) => {
	if(err) return console.log(err);
	fnServer(db);
});