$(document).ready(function() {
	
	//API Links
	//Second will be reserved for API that will return Advisor ID
	var mainURL = 'http://localhost:8080/';
	var advisorInfoAPI = '';
	
	//Button Link
	$signIn = $('#loginbutton');

	
	//Textbox item
	$aid = document.getElementById('advID');
	
	$('#loginbutton').click(function(event) {
		event.preventDefault();
		sessionStorage.setItem("accountRole", "Advisor");
		
		//Comment this when AJAX call is created from here
		sessionStorage.setItem('advID', $aid.value);
		sessionStorage.setItem('advFirstName', 'Samuel');
		sessionStorage.setItem('advLastName', 'Elkson');
		sessionStorage.setItem('advEmail', 'sElkson@gmail.com');
		location.href = 'account.html';  // redirect to account page
		// To here
		
		
		/* Ajax for the API that gets the advisor data
		$.ajax({
        url: mainURL+advisorInfoAPI+$sid.value,
        type:'GET',
        dataType:'json',
        success: function(advisorData){ //If the AJAX is successful
			sessionStorage.setItem('advID', $aid.value);
			
			sessionStorage.setItem('advFirstName', advisorData.recordset[0].'place first name here' );
				sessionStorage.setItem('advLastName', advisorData.recordset[0].'place last name here');
				sessionStorage.setItem('advEmail', advisorData.recordset[0].'place email here');
			location.href = 'account.html';  // redirect to loading page
        },
        error: function(){ //Error in the AJAX call
            alert('Failure to retrieve Advisor data, Account may not exist');
        }
		});*/
	});
	
	
});