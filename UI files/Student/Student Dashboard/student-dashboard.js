function vaaDashSetActivePlanInfo() {
	var status = vaaSetActivePlanInfo();
	if (status == 1) {
		vaaDashPopulateDropDown();
		
	} else if (status == 0) {
		$('#dropdownbox').hide();
		
	}
	$('.degreeplanblock').css('margin-bottom', '1em');
}

function vaaDashPopulateDropDown() {
	var liElement, degreePlanOption, index;
	var activePlanInfo = JSON.parse(sessionStorage.getItem('studentActivePlanInfo'));
	var inactivePlansInfo = JSON.parse(sessionStorage.getItem('inactivePlanInfoArray'));
	index = 0;
	degreePlanOption = $('<a href="#"></a>').text(activePlanInfo.school + ' - ' + activePlanInfo.major + ' (Active)');
	liElement = $('<li></li>').append(degreePlanOption);
	$('#degree-plans-item').append(liElement);
	for (;index < inactivePlansInfo; index++) {
		degreePlanOption = $('<a href="#"></a>').text(inactivePlansInfo[index].school + ' - ' + inactivePlansInfo[index].major + ' (Inactive)');
		liElement = $('<li></li>').append(degreePlanOption);
		$('#degree-plans-item').append(liElement);
	}
}

//require title for plan in the DB
function vaaDashSetDegreeTitle() {
	$('#progress-title').text()
}

function vaaDashSetDegreeHeadings(degreeData) {
	var ulElement, liElement, courseHeader;
	var courseList = JSON.parse(sessionStorage.getItem('courseListArray'));
	var studentDegreeData = JSON.parse(sessionStorage.getItem(degreeData));
	for (courseHeader in courseList[0]) {
		liElement = $('<li></li>').text(courseHeader);
		$('.courselist-heading').append(liElement);
	}
	
	for (courseHeader in studentDegreeData[0]) {
		liElement = $('<li></li>').text(courseHeader);
		$('.courselist-heading').append(liElement);
	}
}

function vaaDashSetDegreeRows(degreeData) {
	var ulElement, liElement, iElement, courseRow, index, counter;
	var courseList = JSON.parse(sessionStorage.getItem('courseListArray'));
	var studentDegreeData = JSON.parse(sessionStorage.getItem(degreeData));
	index = 0;
	counter = 0;
	for (;index < studentDegreeData.length; index++) {
		
		while (courseList[counter].courseName != studentDegreeData[index].courseName) {
			counter++;
		}
		ulElement = $('<ul></ul>');
		ulElement.addClass('courserow');
		for (courseRow in courseList[counter]) {
		    liElement = $('<li></li>').text(courseRow);
		    ulElement.append(liElement);
	    }
	
	    for (courseRow in studentDegreeData[index]) {
			if (studentDegreeData[index].courseRow == 'completed') {
				iElement = $('<i></i>');
				iElement.addClass('courseCompleted fa fa-check');
				iElement.css('color', 'green');
				liElement = $('<li></li>').append(iElement);
				ulElement.append(liElement);
			} else if (studentDegreeData[index].courseRow == 'incomplete') {
				iElement = $('<i></i>');
				iElement.addClass('courseCompleted fa fa-check');
				iElement.css('color', 'red');
				liElement = $('<li></li>').append(iElement);
				ulElement.append(liElement);
			}
		    liElement = $('<li></li>').text(courseRow);
		    ulElement.append(liElement);
	    }
		counter = 0;
		$('#courselist').append(ulElement);
	}
}