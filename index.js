const dbConnection = require('./Module/db_connection');
const student_reader = require('./Module/student_reader');
const test_score_reader = require('./Module/test_score_reader');

const db_data = require('./Module/db_data')

const student_list = './Upload/members.xlsx';
const test_score_path = './Upload/Tests';

async function main() {
	await dbConnection.connectDB();

	let student_data = await student_reader.getStudentDataFromXLS(student_list);
	await db_data.saveStudentInfo(student_data);

	let test_score_data = await test_score_reader.getTestScoresFromPath(test_score_path);
	await db_data.saveTestInfo(test_score_data);

	await dbConnection.disconnectDB();
};

main();