$(document).ready(function(){
	
	
	//API LINKS
    var mainURL = 'http://localhost:8080/';
    var uniAPI = 'api/preferences/colleges/';
    var degreeAPI = 'api/preferences/degrees/';
	var apostEdits = 'api/editaccountprefs';
	var spostEdits = 'api/editstudentprefs';
	
	//VAR ITEMS
	var role = sessionStorage.accountRole;
	var $uniOptions = $('#uni'); //ID for the drop down for Transferring University
    var $dgs = $('#stDegree'); // ID for the drop down for Degree options
	
	//SESSION STORAGE TEST DATA//
	/*
	sessionStorage.setItem('studentFirstName', 'Sara');
	sessionStorage.setItem('studentLastName', 'Smith');
	sessionStorage.setItem('studentID', '12345');
	sessionStorage.setItem('studentEmail', 'sSmith@gmail.com');
	sessionStorage.setItem('studentMajor', 'Computer Science');
	sessionStorage.setItem('studentDept', 'STEM');
	sessionStorage.setItem('studentJobType', '1');
	sessionStorage.setItem('studentEnrollmentType', '1');
	sessionStorage.setItem('studentTransfer', '1');
	//Comment out if not using//*/
	
	var fullName = sessionStorage.studentFirstName+" "+ sessionStorage.studentLastName;
	$('#nameF').append(sessionStorage.studentFirstName);
	$('#nameL').append(sessionStorage.studentLastName);
	$('#email').append(sessionStorage.studentEmail);
	$('select#jType').append(sessionStorage.studentJobType);
	$('select#eType').append(sessionStorage.studentEnrollmentType);
	
	
	
	
	//AJAX retrieve calls for degree and college listStyleType

	//First AJAX call University
    $.ajax({
        url: mainURL+uniAPI,
        type:'GET',
        dataType:'json',
        success: function(universityData){ //If the AJAX is successful
            //Default option set at the beginning
            $uniOptions.append('<option>    Please Click on A University    </option>');
            //For each function to go through each university
            $.each(universityData.recordset, function(index, university)
            {
                //Add item to the dropdown
                $uniOptions.push(university);
                $uniOptions.append('<option value="'+university.ID+'">'+university.Name+'</option>');
            });
            //Second AJAX call Major
            $.ajax({
                url: mainURL+degreeAPI,
                type:'GET',
                dataType:'json',
                success: function(degreeData){ //If the AJAX is successful
                    //Default option set at the beginning
                    $dgs.append('<option>    Please Click on A Degree    </option>');
                    //For each function to go through each university
                    $.each(degreeData.recordset, function(index, degree)
                    {
                        //Add item to the dropdown
                        $dgs.append('<option value="'+degree.id+'">'+degree.Name+'</option>');
                    });
                },
                error: function(){ //Error in the AJAX call
                    alert('Failure to retrieve Values');
                }
            });
        },
        error: function(){ //Error in the AJAX call
            alert('Failure to retrieve Values');
        }
    });
	
	$('select#transferCollege').append(sessionStorage.studentTransfer);
	$('select#degree').append(sessionStorage.studentMajor);
		
	$('#save').click(function(event) {
		event.preventDefault();
		
		$.ajax({
			url: mainURL+apostEdits,
			type:'PUT',
			dataType:'json',
			data:{'first_name':sessionStorage.studentFirstName, 
			'last_name':sessionStorage.studentLastName,
			'email': sessionStorage.studentEmail,
			'id': sessionStorage.studentID
			},
			success: function(studentData){ //If the AJAX is successful
				alert('Successful PUT for account');
			},
			error: function(){ //Error in the AJAX call
				alert('Failure to retrieve student Values');
			}
		});
		
	
		$.ajax({
			url: mainURL+spostEdits,
			type:'PUT',
			dataType:'json',
			data:{'MajorID':sessionStorage.studentMajor, 
			'JobTypeID':sessionStorage.studentJobType,
			'Status': sessionStorage.studentStatus,
			'TransferID': sessionStorage.studentTransfer,
			'id': sessionStorage.studentID
			},
			success: function(studentData){ //If the AJAX is successful
				alert('Successful PUT for account');
			},
			error: function(){ //Error in the AJAX call
				alert('Failure to retrieve student Values');
			}
		});	
		
		if(sessionStorage.accountRole === "Student")
		{
			window.location.href = 'account.html';
		}
		else if(sessionStorage.accountRole === "Advisor")
		{
			window.location.href = '../Advisor/Advise%20Student/Advisor%20Student%20View/advisor-student-view.html';
		}
		else
		{
			alert("Error: Role not given")
		}
		
	});
	
	
	
	


});