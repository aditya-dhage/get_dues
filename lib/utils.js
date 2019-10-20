const fs = require('fs');

// Read file
function readFile(filename){
	var contents = fs.readFileSync(filename, 'utf8').trim().split('\n');
	return contents;
}


// Validate row
function isValidRow(row){

	var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	if (row.length != 3){
		return false;
	} else if (row[0].trim().length<1 || row[1].trim().length<1 || row[2].trim().length<1){
		return false;
	} else if (format.test(row[0]) || format.test(row[1])){
		return false;
	} else if (row[2] <= 0){
		return false;
	} else if (isNaN(parseFloat(row[2]))){
		return false;
	} else {
		return true;
	}
}

// Summarise dues
function getSummary(contents){
	var summary = {};
	for (var i=0; i<contents.length; i++){
		var row = contents[i].split(',');
		if (!isValidRow(row)) {
			continue;
		}
		var borrower = row[0];
		var lender = row[1];
		var amount = parseFloat(row[2]).toFixed(2);

		if (borrower in summary){
			if (lender in summary[borrower]){
				summary[borrower][lender] = (parseFloat(summary[borrower][lender]) + parseFloat((amount))).toFixed(2);
			} else {
				summary[borrower][lender] = amount;
			}
		} else {
			var t = {};
			t[lender] = amount;
			summary[borrower] = t;
		}
	}
	return summary;
}

// Write output to file
function writeFile(summary){
	const fd = fs.openSync('output.csv', 'w')
	var borrowers = Object.keys(summary).sort();
	for (const borrower of borrowers){
		var lenders = Object.keys(summary[borrower]).sort();
		for (const lender of lenders){
			amount = summary[borrower][lender];
			fs.appendFileSync(fd, `${borrower},${lender},${amount}\n`, 'utf-8');
		}
	}
}

module.exports = {readFile, getSummary, writeFile}