$(document).ready(function() {
	
	//API LINKS
    var mainURL = 'http://localhost:8080/';
    var advisorStudentListAPI = 'api/advisordashboard/';
	var studentInfoAPI = 'api/studentinfo/';
	var engClassAPI = '/api/preferences/english/';
	var mathClassAPI = '/api/preferences/math/';
	
	
	
	//Button list
	var $studentEdit = $('#studentEdit');
	var $newPlan = $('#newPlan');
	var $activePlan = $('#activePlan');
	var $inactivePlan = $('#inactivePlan');
	
	//Headder IDs
	var $mainHeader = $('h1#mainheader');
	var $headings = $('h2#headings');
	var $major = $('h2#major');
	var $transferCollege = $('h4#transferringcollege');
	var $studentID = $('h4#studentID');
	var $email = $('h4#email');
	
	/*sessionStorage.setItem('studentFirstName', 'Lana');
	sessionStorage.setItem('studentLastName', 'Parila');*/
	
	var fullName = sessionStorage.studentFirstName+" "+ sessionStorage.studentLastName;
	
	//Append all of the necessary Session storage to the list
	$mainHeader.html(fullName + "'s Dashboard");
	$headings.html(fullName);
	$major.html("Major: " + sessionStorage.studentMajorID);
	$transferCollege.html("Transfering College: " + sessionStorage.studentTransferID);
	$studentID.html("Student ID: " + sessionStorage.studentID);
	$email.html("Email: " + sessionStorage.studentEmail);
	
	//Leads to the Student Edit page
	$studentEdit.click(function(event){
		event.preventDefault();
		window.location.href = '../../../Student/studentEditPage.html';
	});
	//Goes to the create new plans page
	$newPlan.click(function(event){
		event.preventDefault();
		window.location.href = '../../../Student/Degree%20Plans/New%20Plans/new-plans.html';
	});
	//Goes to the active plans page schedule
	$activePlan.click(function(event){
		event.preventDefault();
		//Hardcoded the Plan type
		sessionStorage.setItem("planType", "1");
		window.location.href = '../../Advisor%20Dashboard/Advise%20Student%20Active%20Degree Plan/advise-degree-plans.html';
	});
	//Goes to the inactive plans page schedule
	$inactivePlan.click(function(event){
		event.preventDefault();
		//Hardcoded plan type
		sessionStorage.setItem("planType", "0");
		window.location.href = '../../Advisor%20Dashboard/Advise%20Student%20Active%20Degree Plan/advise-degree-plans.html';
	});
});