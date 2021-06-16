const mysql = require('mysql');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'delivery'
});

conn.connect(function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Db is connected');
	}
});

module.exports = conn;