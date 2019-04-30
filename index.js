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

	fs.readFile('load_dept_emp.txt', 'utf8', (err, data) => {
		// Read data from file. Split the data at every ( and turn into an array.
		const departmentArray = data.split('(');
		const newDepartmentArray = [];
		for (let i = 0; i < departmentArray.length; i++) {
			// Loop through array and push items into a new array splitting at the ,
			newDepartmentArray.push(departmentArray[i].split(','));
		}

		// Represents employees who are currently working.
		const currentlyEmployeed = "'9999-01-01')";
		const currentEmployeesByDepartment = [];
		for (let i = 0; i < newDepartmentArray.length; i++) {
			if (newDepartmentArray[i][3] === currentlyEmployeed) {
				currentEmployeesByDepartment.push(newDepartmentArray[i]);
			}
		}
		// Clean up array (remove '\r\n' from arrays)
		for (let i = 0; i < currentEmployeesByDepartment.length; i++) {
			currentEmployeesByDepartment[i].pop();
		}

		// Employees 10035-10039 removed
		const extraEmployees = currentEmployeesByDepartment.splice(-5, 5);

		// Compare both arrays and create new array with employee, salary, department.
		const departmentWithSalaries = [];
		for (let i = 0; i < currentEmployeesByDepartment.length; i++) {
			if (currentEmployees[i] !== undefined) {
				if (
					currentEmployees[i][0] ===
					currentEmployeesByDepartment[i][0]
				) {
					departmentWithSalaries.push([
						currentEmployees[i][0],
						currentEmployees[i][1],
						currentEmployeesByDepartment[i][1]
					]);
				}
			}
		}

		// Department salary totals
		let marketing = 0,
			finance = 0,
			humanResources = 0,
			production = 0,
			development = 0,
			qualityManagement = 0,
			sales = 0,
			research = 0,
			customerService = 0;

		for (let i = 0; i < departmentWithSalaries.length; i++) {
			const department = departmentWithSalaries[i][2];
			switch (department) {
				case "'d001'":
					marketing =
						marketing + parseInt(departmentWithSalaries[i][1]);
				case "'d002'":
					finance = finance + parseInt(departmentWithSalaries[i][1]);
				case "'d003'":
					humanResources =
						humanResources + parseInt(departmentWithSalaries[i][1]);
				case "'d004'":
					production =
						production + parseInt(departmentWithSalaries[i][1]);
				case "'d005'":
					development =
						development + parseInt(departmentWithSalaries[i][1]);
				case "'d006'":
					qualityManagement =
						qualityManagement +
						parseInt(departmentWithSalaries[i][1]);
				case "'d007'":
					sales = sales + parseInt(departmentWithSalaries[i][1]);
				case "'d008'":
					research =
						research + parseInt(departmentWithSalaries[i][1]);
				case "'d009'":
					customerService =
						customerService +
						parseInt(departmentWithSalaries[i][1]);
			}
		}
		console.log(
			'Marketing: $' + marketing,
			'Finance: $' + finance,
			'Human Resources: $' + humanResources,
			'Production: $' + production,
			'Development: $' + development,
			'Quality Management: $' + qualityManagement,
			'Sales: $' + sales,
			'Research: $' + research,
			'Customer Service: $' + customerService
		);
	});
});
