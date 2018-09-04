/* READ THIS BEFORE ADDING/CHANGING/DELETING ANYTHING:
   Any javascript function used by multple webpages goes here.
   Naming style for function names are as follow to keep codes maintainable,
   and to keep it from conflicting with other js libraries:
   vaa[your function name] such as vaaSetActivePlanInfo
   for java function that apply to a specific web page in their respective folder, please 
   name it the following way:
   vaa[page title][your css name] such as vaaDashSet???
   List of page titles:
   student dashboard - dash
   degree plans - degs
   active degree - deg
   inactive degree - deg
   explore plans - exps
   
   Something to note:
   - when naming your function, please choose the most sensible naming for maintainability
*/

function vaaSetActivePlanInfo() {
	var status = 1;
	//This is to check if student has an active plan or not
	if (sessionStorage.getItem('jsonActivePlanID') == -1) {
	    status = 0;	
	}
	if (status == 1) {
		var activePlanInfo = JSON.parse(sessionStorage.getItem('studentActivePlanInfo'));
		//should be replace by active plan name
		var activePlanLink = $('<a id="activedegreelink"></a>').text(activePlanInfo.school + ' - ' + activePlanInfo.major);
		activePlanLink.attr('href', '../Degree%20Plans/Active%20Degree%20Plan/active-degree-table.html');
		$('.degreeplanblock').children('#major').html(activePlanLink);
		$('.degreeplanblock').children('#transferringcollege').text('Transferring College: ' + activePlanInfo.school);
		$('.degreeplanblock').children('#intendedmajor').text('Intended Major: ' + activePlanInfo.major);
		$('.degreeplanblock').children('#degree').text('Degree: ' + activePlanInfo.degree);
	} else if (status == 0) {
		$('.degreeplanblock').children('#planTitle').text('No Active Plan yet?');
		$('.degreeplanblock').children('#direction').text('You can start by doing one of the following:');
		var paragraph1 = $('<li></li>').text("Go to 'Explore Plans' tab on the top. From there, you can create your degree plans that suit to your needs according to major, school that you intend on transferring to, and other options. Once a plan is created, you can submit it for your advisor's approval and if needed, you can meet with the advisor to discuss your newly created plan.");
		var paragraph2 = $('<li></li>').text("If you are unsure how to create a proper degree plans or would like to meet with the advisor first, you can always make an appointment with the advisor and create a smart degree plan that will facilitate your academic career. The help section on the top left shows where and how you can start making an appointment with your advisor!");
		$('.degreeplanblock').children('#directionlist').append(paragraph1, paragraph2);
	}
	return status;
}