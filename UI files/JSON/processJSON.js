function setActivePlanParam(activePlanParam, sID) {
	activePlanParamObj = { "table":"StudyPlan", "StudentID":sID, "status":"active"};
	activePlanParam = JSON.stringify(activePlanParamObj);
	return activePlanParam;
}

function displayTable(xmlObj, activePlanObj, table) {
	var x;
	if(xmlObj.readyState == 4 && xmlObj.status == 200) {
		activePlanObj = JSON.parse(xmlObj.responseText);
		table += "<table border='1'>";
		table += "<tr><th>planId</th>";
		table += "<th>courseNumber</th>";
		table += "<th>courseID</th>";
		table += "<th>quarter</th>";
		table += "<th>year</th></tr>";
		for (x in activePlanObj) {
			table += "<tr><td>" + activePlanObj[x].planId + "</td>";
			table += "<td>" + activePlanObj[x].courseNumber + "</td>";
			table += "<td>" + activePlanObj[x].courseID + "</td>";
			table += "<td>" + activePlanObj[x].quarter + "</td>";
			table += "<td>" + activePlanObj[x].year + "</td></tr>";
		}
		table += "</table>";
	}
}

function sendActivePlanParam(xmlObj, activePlanParam, requestMethod, file, asyncStatus) {
	xmlObj.open(requestMethod, file, asyncStatus);
	xmlObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlObj.send(activePlanParam);
}