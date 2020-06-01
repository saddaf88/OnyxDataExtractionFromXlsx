const myDB = require('mysql');
const myDBConfig = {
	host: "localhost",
	user: "root",
	password: "password123456",
	database: "OnyxTest"
}

const connection = myDB.createConnection(myDBConfig);

function connectDB() {
	connection.connect(function (error) {
		if (error) {
			console.log("Error!!")
		} else {
			console.log("Database connected!!");
		}
	})
}

async function disconnectDB() {
	await connection.end();
	console.log("Database Disconnected!!");
}

module.exports.connection = connection;
module.exports.connectDB = connectDB;
module.exports.disconnectDB = disconnectDB;