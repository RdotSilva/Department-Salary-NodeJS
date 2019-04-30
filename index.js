const fs = require('fs');

fs.readFile('load_salaries.txt', 'utf8', (err, data) => {
	// Read data from file. Split the data at every ( and turn into an array.
	const arrayData = data.split('(');

	const splitArray = [];
	for (let i = 0; i < arrayData.length; i++) {
		// Loop through array and push items into a new array splitting at the ,
		splitArray.push(arrayData[i].split(','));
	}

	// Represents employees who are currently working.
	const currentlyEmployed = "'9999-01-01')";

	const currentEmployees = [];
	for (let i = 0; i < splitArray.length; i++) {
		// Add employee to new array only if they are currently employed
		if (splitArray[i][3] === currentlyEmployed) {
			currentEmployees.push(splitArray[i]);
		}
	}

	// Clean up array (remove '\r\n' from arrays)
	for (let i = 0; i < currentEmployees.length; i++) {
		currentEmployees[i].pop();
	}

	var totalSalary = 0;
	for (var i = 0; i < currentEmployees.length; i++) {
		// Add the salary of each current employee together.
		totalSalary += parseInt(currentEmployees[i][1]);
	}

	// Print total salaries paid out. This is only for CURRENT employees.
	console.log('The total amount paid out by the company is: $' + totalSalary);
});
