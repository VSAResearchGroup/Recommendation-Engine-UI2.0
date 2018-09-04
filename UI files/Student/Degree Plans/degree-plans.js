function vaaDegsSetActivePlanInfo() {
	var status = vaaSetActivePlanInfo();
	if (status == 0) {
		$('.degreeplanblock button').remove();
		$('#currentcollege').remove();
	} else if (status == 1) {
		//$('.degreeplanblock').css('position', 'relative');
	}
}

function vaaDegsSetInactivePlanInfo() {
	var inactivePlans = JSON.parse(localStorage.getItem('inactivePlanInfoArray'));
	var status = 1;
	if (inactivePlans.length == 0) {
		status = 0;
    }
	if (status == 0) {
		$('#inactiveplanheading').html('<b>There are currently no inactive plan created.</b>');
	} else if (status == 1) {
		$('#inactiveplanheading').html('<b>Plan Details:</b>');
		var index = 0;
		var inactivePlanLink, removeIcon, cloneIcon, properties;
		var divElement, liElement;
		for (;index < inactivePlans.length; index++) {
			if (index == 12) {  // number of inactive plans should be <= 12 (business logic)
				break;
			}
			inactivePlanLink = $('<a></a>').text(inactivePlans[index].parameterSet.school + ' - ' + inactivePlans[index].parameterSet.major);

			inactivePlanLink.attr('href', './Active%20Degree%20Plan/active-degree-table.html');
			inactivePlanLink.addClass('inactiveplanname');
		
			removeIcon = $('<button></button>').text('Delete');
			removeIcon.addClass('button properties deleteButton');
			removeIcon.css('margin-right', '1em');
		
			cloneIcon = $('<button></button>').text('Clone');
			cloneIcon.addClass('button properties cloneButton');
			cloneIcon.css('margin-right', '1em');
		
			properties = $('<button></button>').text('Properties');
			properties.addClass('button properties propertiesButton');
		
			divElement = $('<div style="width:100%"></div>').append(inactivePlanLink, removeIcon, cloneIcon, properties);
			liElement = $('<li></li>').append(divElement);
			$('#inactiveplanlist').append(liElement);
		}	
		localStorage.setItem('numOfInactivePlan', '' + inactivePlans.length);
		$('.degreeplanblock').css('margin-bottom', '2em');
		$('.degreeplanblock').css('position', 'relative');
	}
}

function setInactivePlanStatusString() {
	var statusString = localStorage.getItem('inactivePlanRetrieved');
	if (statusString == undefined ) {
		var count = 0;
		var inactivePlans = JSON.parse(localStorage.getItem('inactivePlanArray'));
		statusString = '';
		for (;count < inactivePlans.length; count++) {
			statusString += '0';
		}
		localStorage.setItem('inactivePlanRetrieved', statusString);
	}
}

function setInactivePlanCopyCount() {
	var countString = localStorage.getItem('inactivePlanCount');
	if (countString == undefined ) {
		localStorage.setItem('inactivePlanCount', localStorage.getItem('inactivePlanRetrieved')); //start out with 0 values
	}
}