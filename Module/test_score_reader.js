const file_reader = require('./file_reader');

async function getTestScoresFromPath(scorePaths) {
	var testInfo_list = [];
	let xlsxFiles = await file_reader.getXlsxFileFromDir(scorePaths);

	for (let indx = 0; indx < xlsxFiles.length; indx++) {
		let testInfo = await getTestDataFromXlsx(xlsxFiles[indx]);
		testInfo_list.push(testInfo);
	}

	return testInfo_list;


}

async function getTestDataFromXlsx(path) {
	let rows = await file_reader.getRows(path);
	let cols = await file_reader.switchRowCol(rows);
	let test_score = [];
	let countTask = 0;

	for (let c = 0; c < 9; c++) {
		let col = cols[c];
		var row = 0;

		if ((col[0] === null) && (col[1].startsWith("Matriculation number"))) {
			row = 2;
			while ((col[row] !== null) && (row < col.length)) {
				let obj_student = {
					matrikel_nr: col[row],
				};
				await test_score.push(obj_student);
				row = row + 1;
			}
		}

		if ((col[0] != null) && (col[0].startsWith("Test"))) {
			test_score.forEach((element) => {
				element.testName = col[0].replace(/Test:\s*/g, '');
			})

			if ((col[col.length - 1] === null) && (col[col.length - 2].startsWith("Identifier"))) {
				console.log("came to collect test id");
				test_score.forEach((element) => {
					element.testID = col[col.length - 2].replace(/Identifier:\s*/g, '');
				})
			}

			if ((col[0] != null) && (col[1].startsWith("Date"))) {
				row = 2;
				test_score.forEach((element) => {
					element.date = col[row];
					row++;
				})
			}
		}
		if ((col[0] === null) && (col[1].startsWith("Length (sec.)"))) {
			row = 2;
			test_score.forEach((element) => {
				element.length = col[row];
				row++;
			})
		}
		if (col[0] === null && (col[1].includes("Trial"))) {
			row = 2;
			test_score.forEach((element) => {
				element.trial = col[row];
				row++;
			})
		}

		if (col[0] != null && (col[0].startsWith("Max. points"))) {
			test_score.forEach((element) => {
				element.maxPoint = col[0].replace(/Max. points:\s*/g, '');;
			})
			if ((col[1].startsWith("Points"))) {
				row = 2
				test_score.forEach((element) => {
					element.point = col[row];
					row++;
				})
			}

		}
	}

	cols.forEach((element) => {
		if (element[0] != null && element[0].startsWith("Task")) {
			countTask = countTask + 1;
		}
	})

	test_score.forEach((element) => {
		element.taskNumber = countTask;
	})

	return test_score;
}



module.exports.getTestScoresFromPath = getTestScoresFromPath;
