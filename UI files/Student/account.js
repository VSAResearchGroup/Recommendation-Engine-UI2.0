$(document).ready(function(){

	/* Test data
	sessionStorage.setItem('studentFirstName', 'Sara');
	sessionStorage.setItem('studentLastName', 'Smith');
	sessionStorage.setItem('studentID', '12345');
	sessionStorage.setItem('studentEmail', 'sSmith@gmail.com');
	sessionStorage.setItem('studentMajor', 'Computer Science');
	sessionStorage.setItem('studentDept', 'STEM');
	sessionStorage.setItem('studentJobType', 'Part Time Job');
	sessionStorage.setItem('studentTransfer', 'University of Washington Bothell');
	*/
	
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