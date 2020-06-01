const file_reader = require('./file_reader');

async function getStudentDataFromXLS(path) {
	let rows = await file_reader.getRows(path);
	var student_list = [];

	rows.forEach((element, index) => {
		if (index != 0) {
			student_list.push({
				matrikel_nr: element[1],
				name: element[3],
				surname: element[2],
				email: element[5],
				institution: element[6],
				study_program: element[7],
				organisational_unit: '',
				matrikel_year: element[5].split("@")[1].split(".")[0].split("s")[1],

			})
		}
	});
	return student_list;

}

module.exports.getStudentDataFromXLS = getStudentDataFromXLS;