$(document).ready(function(){
	//API Links
	//Second will be reserved for API that will return Advisor ID
	var mainURL = 'http://localhost:8080/';
	var advisorInfoAPI = '';
	
	//Fill the controlls with the advisor information.
	var fullName = sessionStorage.advFirstName+" "+ sessionStorage.advLastName;
	$('p#name').text(fullName);
	$('p#advID').text(sessionStorage.advID);
	$('p#email').text(sessionStorage.advEmail);
	
	/* Ajax for the API that gets the advisor data
	// Unlikely to use, since you do get the Info when you log in
	// But might be needed for other information
		$.ajax({
        url: mainURL+advisorInfoAPI+sessionStorage.advID,
        type:'GET',
        dataType:'json',
        success: function(advisorData){ //If the AJAX is successful
			$.each(studentData.recordset, function(index, studentItems)
            {
				sessionStorage.setItem('advFirstName', );
				sessionStorage.setItem('advLastName', );
				sessionStorage.setItem('advEmail', );
            });
			var fullName = sessionStorage.advFirstName+" "+ sessionStorage.advLastName;
			$('p#name').text(fullName);
			$('p#advID').text(sessionStorage.advID);
			$('p#email').text(sessionStorage.advEmail);
	
        },
        error: function(){ //Error in the AJAX call
            alert('Failure to retrieve student Values');
        }
		});*/

});