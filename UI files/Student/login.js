$(document).ready(function() {
	
	//API Links
	var mainURL = 'http://localhost:8080/';
	var studentInfoAPI = 'api/studentinfo/';
	
	//Button Link
	$signIn = $('#loginbutton');
	
	//Radio Vars
	$advRadio = $('#adv');
	$stuRadio = $('#stu');
	
	//Textbox item
	$sid = document.getElementById('studentID');
	
	//AJAX call to recieve all of the student data
	$('#loginbutton').click(function(event) {
		event.preventDefault();
		alert($sid.value);
		sessionStorage.setItem("accountRole", "Student");
		$.ajax({
        url: mainURL+studentInfoAPI+$sid.value,
        type:'GET',
        dataType:'json',
        success: function(studentData){ //If the AJAX is successful
			$.each(studentData.recordset, function(index, studentItems)
            {
				//Set all of the values for the student
				sessionStorage.setItem('studentFirstName', studentItems.first_name);
				sessionStorage.setItem('studentLastName', studentItems.last_name);
				sessionStorage.setItem('studentID', $sid.value);
				sessionStorage.setItem('studentEmail', studentItems.email);
				sessionStorage.setItem('studentMajorID', studentItems.MajorID);
				sessionStorage.setItem('studentDeptID', studentItems.DepartmentID);
				sessionStorage.setItem('studentJobType', studentItems.JobTypeID);
				sessionStorage.setItem('studentStatus', studentItems.Status);
				sessionStorage.setItem('studentTransferID', studentItems.TransferID);
            });
			location.href = 'loading.html';  // redirect to loading page
        },
        error: function(){ //Error in the AJAX call
            alert('Failure to retrieve student Values');
        }
		});
	});
	
	
});