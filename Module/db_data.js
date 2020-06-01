const dbConnection = require("./db_connection");

async function saveStudentInfo(student_data) {
	insertStudentInfo(student_data);
	return null;
}

async function saveTestInfo(test_score_info) {
	insertTestScore(test_score_info);
	return null;
}

function insertStudentInfo(data) {
	let sql = "INSERT IGNORE INTO student (matrikel_nr,name,surname,email,institution,study_program,organisational_unit,matrikel_year) VALUES ?";
	let values = [];

	data.forEach((element, index) => {
		values.push([
			element.matrikel_nr.toString(),
			element.name,
			element.surname,
			element.email,
			element.institution,
			element.study_program,
			element.organisational_unit,
			element.matrikel_year.toString()

		])
	});


	dbConnection.connection.query(sql, [values], function (err, result) {
		if (err) throw err;
	});
	return null;
}

function insertTestScore(data) {
	let sql = "INSERT IGNORE INTO testScores (matrikel_nr,testName,date,length,trial,maxPoint,point,taskNumber,testID) VALUES ?";
	let values = [];
	for (let indx = 0; indx < data.length; indx++) {
		let info = data[indx];
		info.forEach((element) => {
			values.push([
				element.matrikel_nr,
				element.testName,
				element.date,
				element["length"],
				element.trial,
				element.maxPoint,
				element.point,
				element.taskNumber,
				element.testID,
			])
		})


	}
	dbConnection.connection.query(sql, [values], function (err, result) {
		if (err) throw err;
	});
	return null;
}

module.exports.saveStudentInfo = saveStudentInfo;
module.exports.saveTestInfo = saveTestInfo;