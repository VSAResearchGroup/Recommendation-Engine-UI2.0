$(document).ready(function() {
	
	//API LINKS
    var mainURL = 'http://localhost:8080/';
    var advisorStudentListAPI = 'api/advisordashboard/';
	var studentInfoAPI = 'api/studentinfo/';
	var engClassAPI = '/api/preferences/english/';
	var mathClassAPI = '/api/preferences/math/';
	
	
	var num = 0;
	var $adviseBtn = $('#adviseBtn');
	$.ajax({
        url: mainURL+advisorStudentListAPI+sessionStorage.advID,
        type:'GET',
        dataType:'json',
        success: function(studentData){ //If the AJAX is successful
            //For each function to go through each university
            $.each(studentData.recordset, function(index, student)
            {
				num++;
                $('#studentlist').append("<ul class = 'studentrow'><li>"+student.StudentID+"</li><li>"+student.first_name+" "+student.last_name+"</li><li><Button value = '"+student.StudentID+"' class='advise-button'>Advise</Button></li></ul>");
            });
           
           
        },
        error: function(){ //Error in the AJAX call
            alert('Failure to retrieve Values of all students');
        }
    });
	
	$(document).on("click", '.advise-button', function(event) {
		event.preventDefault();
		$sid = this.value;
		$.ajax({
        url: mainURL+studentInfoAPI+$sid,
        type:'GET',
        dataType:'json',
        success: function(studentData){ //If the AJAX is successful
			//The API retrieves the data in a set of 3
			//Rather than iterate through the copied data
			//Just get the first elemnet like you would an array
			sessionStorage.setItem('studentFirstName', studentData.recordset[0].first_name);
			sessionStorage.setItem('studentLastName', studentData.recordset[0].last_name);
			sessionStorage.setItem('studentID', $sid);
			sessionStorage.setItem('studentEmail', studentData.recordset[0].email);
			sessionStorage.setItem('studentMajorID', studentData.recordset[0].MajorID);
			sessionStorage.setItem('studentDeptID', studentData.recordset[0].DepartmentID);
			sessionStorage.setItem('studentJobType', studentData.recordset[0].JobTypeID);
			sessionStorage.setItem('studentStatus', studentData.recordset[0].Status);
			sessionStorage.setItem('studentTransferID', studentData.recordset[0].TransferID);
			window.location.href = '../Advise%20Student/Advisor%20Student%20View/advisor-student-view.html';
        },
        error: function(){ //Error in the AJAX call
            alert('Failure to retrieve student Values');
        }
		});
	});
});