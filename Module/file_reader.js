const readXlsxFile = require('read-excel-file/node');
const path = require('path');
const fs = require('fs');

function getRows(path) {
	return readXlsxFile(path).then((rows) => { return rows });
}

function switchRowCol(row) {
	///console.log("Switch");
	let column = [];
	let res = []
	for (let c = 0; c < row[0].length; c++) {
		column = [];
		for (let r = 0; r < row.length; r++) {
			column.push(row[r][c]);
		}
		res.push(column);
	}
	return res;
}

async function getXlsxFileFromDir(path) {
	let dirCont = await searchRecursive(path, 'xlsx');
	return dirCont;
}

var searchRecursive = function (dir, pattern) {
	let results = [];
	fs.readdirSync(dir).forEach(function (dirInner) {
		dirInner = path.resolve(dir, dirInner);
		let stat = fs.statSync(dirInner);

		if (stat.isDirectory()) {
			results = results.concat(searchRecursive(dirInner, pattern));
		}

		if (stat.isFile() && dirInner.endsWith(pattern)) {
			results.push(dirInner);
		}
	});

	return results;
};

module.exports.getRows = getRows;
module.exports.getXlsxFileFromDir = getXlsxFileFromDir;
module.exports.switchRowCol = switchRowCol;
