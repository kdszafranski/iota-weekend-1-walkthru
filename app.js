$(document).ready(function() {
	var salaryTotal = 0.00;
	var empArray = [];

	$('#employeeForm').on('submit', function(event) {
		event.preventDefault();
		var values = {};
		var thisEmpSalary = 0.00;

		$.each($('#employeeForm').serializeArray(), function(i, field) {
			values[field.name] = field.value;
		});

		thisEmpSalary = parseFloat(values.empSalary); 
		salaryTotal += Math.round(thisEmpSalary / 12);
		values.empSalary = Math.round(thisEmpSalary);

		empArray.push(values);

		$('#employeeForm').find('input[type=text], input[type=number]').val('');
		$('#empFirstName').focus();
		
		updateSalary(salaryTotal);
		appendDom(values);
	});

	$('#container').on('click', '.removeEmployee', function() {
		var index = $(this).data().id;
		var employee = empArray[index];
		console.log("This Employee:", employee);

		salaryTotal -= Math.round(employee.empSalary / 12);
		updateSalary(salaryTotal);

		$(this).parent().remove();
	});

	function updateSalary(salary) {
		$('#salaryAmount').text('$ ' + salary);
	}


	function appendDom(empInfo) {
		$('#container').append('<div></div>');
		var $el = $('#container').children().last();
		$el.append('<p>' + empInfo.empFirstName + ' ' + empInfo.empLastName + '</p>');
		$el.append('<p>' + empInfo.empIDNumber + '</p>');
		$el.append('<p>' + empInfo.empJobTitle + '</p>');
		$el.append('<p>$' + empInfo.empSalary + '</p>');	

		$el.append('<button class="removeEmployee" data-id="' + 
			(empArray.length - 1) + '">Remove Me!</button>');

		

	}













});