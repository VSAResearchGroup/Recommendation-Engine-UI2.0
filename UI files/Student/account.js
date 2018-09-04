$(document).ready(function(){
	
	
	/*
				sessionStorage.setItem('studentFirstName', studentItems.first_name);
				sessionStorage.setItem('studentLastName', studentItems.last_name);
				sessionStorage.setItem('studentID', $sid.value);
				sessionStorage.setItem('studentEmail', studentItems.email);
				sessionStorage.setItem('studentMajorID', studentItems.MajorID);
				sessionStorage.setItem('studentDeptID', studentItems.DepartmentID);
				sessionStorage.setItem('studentJobType', studentItems.JobTypeID);
				sessionStorage.setItem('studentStatus', studentItems.Status);
				sessionStorage.setItem('studentTransferID', studentItems.TransferID);
	
	
	
	*/
	
	/* Test data*/
	sessionStorage.setItem('studentFirstName', 'Sara');
	sessionStorage.setItem('studentLastName', 'Smith');
	sessionStorage.setItem('studentID', '12345');
	sessionStorage.setItem('studentEmail', 'sSmith@gmail.com');
	sessionStorage.setItem('studentMajor', 'Computer Science');
	sessionStorage.setItem('studentDept', 'STEM');
	sessionStorage.setItem('studentJobType', 'Part Time Job');
	sessionStorage.setItem('studentTransfer', 'University of Washington Bothell');
	
	
	var fullName = sessionStorage.studentFirstName+" "+ sessionStorage.studentLastName;
	$('p#name').append(fullName);
	$('p#sid').append(sessionStorage.studentID);
	$('p#degree').append(sessionStorage.studentMajor);
	$('p#email').append(sessionStorage.studentEmail);
	$('p#transferCollege').append(sessionStorage.studentTransfer);
	$('p#jType').append(sessionStorage.studentJobType);
	
	$('#edit').click(function(event) {
		event.preventDefault();
		
		window.location.href = 'StudentEditPage.html';
		
	});
	
	
});