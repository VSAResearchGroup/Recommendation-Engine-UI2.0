function printTab() {
	var nav, navLen, i, text;
	nav = ["Student Dashboard", "Degree Plans", "Explore Plans"];
	navLen = nav.length;
	text = "<ul>";
	for (i = 0; i < navLen; i++) {
		text += "<li>" + nav[i] + "</li>";
	}
	text += "</ul>";
	return text;
}

/*1.User clicks on active degree plan link (link implemented)
2.send an AJAX request to ask for the student's active degree plan (???)
3.send another AJAX request to ask for the whole list of courses
3.create table object
4.create a single status column
4.parse the response text when the response is back
5.turn all the cell into a cell objects
6.add all the cell into the column
7.create necessary columns and add them to the table
7.adds all the cell to their respective column*/
  
/*var courseObjects = JSON.parse(xmlObj.responseText);*/
/*var courseListObjects = JSON.parse(xmlObj.responseText);*/
		
function constructTable(courseObjects, courseListObjects, row) {
    //initialize variables
	var cellIndex = 0;
	//create a temp column
	var tempColumn = new columnObject('', 0);
	
	for (;cellIndex < courseObjects.length; cellIndex++) {
	    statusArray[courseObjects[cellIndex].courseID] = 1;
		var cell = new cellObject(courseObjects[cellIndex]);  //add course object to cell object
		if (maxYear == 0) {
		    maxYear = courseObjects[cellIndex].year;
		}
		else if (maxYear != 0 && minYear == 0) {
		    minYear = Math.min(maxYear, courseObjects[cellIndex].year);
		} else {
		    compare(maxYear, minYear, courseObjects[cellIndex].year); //get max/min year
		}
		tempColumn.pushCellObject(cell);    //add cell object to column object
	}
	cellIndex = 0;
	for (;cellIndex < 1460; cellIndex++) {  //fill undefined gap
		if (typeof statusArray[cellIndex] === 'undefined') {
			statusArray[cellIndex] = 0;
		}
	}
	numOfYear = maxYear - minYear + 1;
	cellIndex = 0;
	for (;cellIndex < numOfYear; cellIndex++) {   //add all necessary column
		activeDegreeTable.pushColumnObject(new columnObject('Fall', maxYear-numOfYear+1+cellIndex));
		activeDegreeTable.pushColumnObject(new columnObject('Winter', maxYear-numOfYear+1+cellIndex));
		activeDegreeTable.pushColumnObject(new columnObject('Spring', maxYear-numOfYear+1+cellIndex));
		activeDegreeTable.pushColumnObject(new columnObject('Summer', maxYear-numOfYear+1+cellIndex));
	}
	cellIndex = 0;
	var tempCellObject;
	var columnIndex;
	for (;cellIndex < tempColumn.cellArray.length; cellIndex++) {
		columnIndex = 0;
		for (;columnIndex < activeDegreeTable.columnArray.length; columnIndex++) {
			if (activeDegreeTable.columnArray[columnIndex].quarter == tempColumn.cellArray[cellIndex].course.quarter && 
			activeDegreeTable.columnArray[columnIndex].year == tempColumn.cellArray[cellIndex].course.year) {
				activeDegreeTable.columnArray[columnIndex].pushCellObject(tempColumn.cellArray[cellIndex]);
				break;
			}
		}
	}
	columnIndex = 0;
	for (;columnIndex < activeDegreeTable.columnArray.length; columnIndex++) {
	    while (activeDegreeTable.columnArray[columnIndex].cellArray.length < row) {
		    var emptyCourse = {
				"planId": -1,
				"courseNumber": "",
				"courseID": -1,
				"quarter": "",
				"year": -1
			}
			var emptyCell = new cellObject(emptyCourse);
			activeDegreeTable.columnArray[columnIndex].pushCellObject(emptyCell);
		}
	}
}

function displayTable(table, initial, row) {
	var columnIndex = 0;
	var rowIndex;
	for (;columnIndex < activeDegreeTable.columnArray.length / 4; columnIndex++) {
		initial += '<table class="degreetable">';
		initial+= '<tr>';
		initial+= '<th>' + activeDegreeTable.columnArray[columnIndex*4].year + ' Fall</th>';
		initial+= '<th>' + activeDegreeTable.columnArray[columnIndex*4+1].year + ' Winter</th>';
		initial+= '<th>' + activeDegreeTable.columnArray[columnIndex*4+2].year + ' Spring</th>';
		initial+= '<th>' + activeDegreeTable.columnArray[columnIndex*4+3].year + ' Summer</th>';
		initial+= '<tr>';
		rowIndex = 0;
		for (;rowIndex < row; rowIndex++) {
			initial+= '<tr>';
			initial+= '<td>' + activeDegreeTable.columnArray[columnIndex*4].cellArray[rowIndex].course.courseNumber + '</td>';
			initial+= '<td>' + activeDegreeTable.columnArray[columnIndex*4+1].cellArray[rowIndex].course.courseNumber + '</td>';
			initial+= '<td>' + activeDegreeTable.columnArray[columnIndex*4+2].cellArray[rowIndex].course.courseNumber + '</td>';
			initial+= '<td>' + activeDegreeTable.columnArray[columnIndex*4+3].cellArray[rowIndex].course.courseNumber + '</td>';
			initial+= '</tr>';
		}
		initial += '</table>';
		
		initial += '<table class="tableborder">';
		initial += '<tr>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '</tr>';
		initial += '</table>';
		
		initial += '<table class="placeholder">';
		initial += '<tr>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '</tr>';
		initial += '<tr>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '<td></td>';
		initial += '</tr>';
		initial += '</table>';
	}
	
	return initial;
}

function compare(num1, num2, num3) {
    maxYear = Math.max(num1, num2, num3);
    minYear = Math.min(num1, num2, num3);
}
	  
function tableObject() {
    this.columnArray = [];
    this.pushColumnObject = function (columnObj) {
	    this.columnArray.push(columnObj);
	}
}

function columnObject(quarter, year) {
    this.cellArray = [];
    this.quarter = quarter;
    this.year = year;
    /*this.update = function (?) {
    	???
    }
    this.addInputBox = function (?) {
    	???
    }
    this.columnSort = function (?) {
	    ???
    }*/
    this.pushCellObject = function (cellObj) {
    	this.cellArray.push(cellObj);
    }
    this.addCellObject = function (cellObj) {
    	this.cellArray[cellObj.course.courseid] = cellObj;
    }
    this.popCellObject = function() {
	    return this.cellArray.pop();
    }
    this.removeCellObject = function () {
    }
}

function cellObject(courseObj) {
	this.course = courseObj;
	//this.xIcon = removeObject;
	//this.undoIcon = undoObject;
	//this.inputBox = inputObject;
	this.addCourse = function (newCourse) {
		this.course = newCourse;
	}
	/*this.removeCourse = function (?) {
		???
	}
	this.showObject = function (?) {
		???
	}
	this.hideObject = function (?) {
		???
	}*/
}	  