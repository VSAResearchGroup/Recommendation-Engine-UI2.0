$(document).ready(function(){
	//array of td ids
	var tableID = ['#aut01', '#aut02', '#aut03','#aut04', '#aut05', '#win01', '#win02', '#win03', '#win04', '#win05', '#spr01', '#spr02', '#spr03', '#spr04', '#spr05', '#sum01', '#sum02','#sum03','#sum04','#sum05', '#aut06', '#aut07', '#aut08','#aut09', '#aut10', '#win06', '#win07', '#win08', '#win09', '#win10', '#spr06', '#spr07', '#spr08', '#spr09', '#spr10', '#sum06', '#sum07','#sum08','#sum09','#sum10'];
	
	//JSON Arrays for given schedule
	var quarterList = [];
	var yearList = [];
	var courseList = [];
	
	//JSON Arrays for updated schedule
	var uQuarterList = [];
	var uYearList = [];
	var uCourseList = [];
	
	//API LINKS
    var mainURL = 'http://localhost:8080/';
	var savePlanAPI = 'api/plans/saveplan'
	
	if(sessionStorage.planType === '1')
	{
		var studentPlan = 'api/plans/displayactive/'+sessionStorage.studentID+'/1';
	}
	if(sessionStorage.planType === '0')
	{
		var studentPlan = 'api/plans/displayinactive/'+sessionStorage.studentID+'/3';
	}
	
	//This AJAX call will give the list of all of the course of the specified plan
	$.ajax({
			url: mainURL+studentPlan,
			type:'GET',
			dataType:'json',
			success: function(planData){ //If the AJAX is successful
				//alert('Successful');
				$.each(planData.recordset, function(index, planClass)
				{
					//alert(planClass.QuarterID+' '+planClass.YearID+' '+ planClass.CourseID);
					quarterList.push(planClass.QuarterID);
					yearList.push(planClass.YearID);
					courseList.push(planClass.CourseID);
		
				});
				
				//Get the starting and ending year
				var minYear = yearList[0];
				var maxYear = yearList[yearList.length-1];
				//Get the starting quarter
				var startQuarter = quarterList[0];
				//Call function to set the years on the table and the header IDs
				setAllYears(minYear, maxYear, startQuarter)
				//Create the schedule
				createSchedule(quarterList, yearList, courseList)
				//Save the new schedule created
				$('#save').click(function(event) {
					event.preventDefault();
					updateSchedule(tableID, uQuarterList, uYearList, uCourseList)
					for(i = 0; i < uCourseList.length; i++)
					{
						patchUpdate(uQuarterList[i], uYearList[i], uCourseList[i]);
					}
				});
				
			},
			error: function(){ //Error in the AJAX call
				alert('Failure to retrieve student Values');
			}
		});
		
		function patchUpdate(uQuarter, uYear, uCourse)
		{
			//Send in the new plan to be patched into the list
			$.ajax({
					url: mainURL+savePlanAPI,
					type:'PATCH',
					dataType:'json',
					data:{"QuarterID" : uQuarter, "YearID": uYearList, "CourseID": uCourseList, "PlanID": "1"},
					success: function(data){
						//alert('success' + uCourseList);
					},
					error: function()
					{
						alert('Failur to PATCH ' + uCourseList);
					}
							
				});
		}
		
		//Go through the table ID to get the new locations of each class and store them
		function updateSchedule(tableID, uQuarterList, uYearList, uCourseList)
		{
			uQuarterList.length = 0;
			uYearList.length = 0;
			uCourseList.length = 0;
			for(i = 0; i < tableID.length; i++)
			{
				//Look inside the td cell for a div element
				$foundDiv = $(tableID[i]).children('div');
				if($foundDiv.attr('value') === undefined)
				{
				
				}
				else
				{
					//check the header of the colunm for the year
					var $year = $(tableID[i]).closest('table').find('th').eq($(tableID[i]).index());
					uQuarterList.push($(tableID[i]).attr('value'));
					uYearList.push($year.val());
					uCourseList.push($foundDiv.attr('value'));
				}
			}
		}
		//Fill the table with the course list
		function createSchedule(quarterList, yearList, courseList)
		{
			var idIndex = 0;
				for(i = 0; i < quarterList.length; i++)
				{
					while(quarterList[i] != $(tableID[idIndex]).attr('value'))
					{
						idIndex++
						if(idIndex > tableID.length)
						{
							break;
						}
					}
					
					$(tableID[idIndex]).append('<div value ="'+ courseList[i] +'" class="redips-drag">Class '+ courseList[i] +'</div>');
					idIndex++;
				}
				redips.init();
		}
		
		//Set the values and the years for thr headers of the table
		function setAllYears(minY, maxY, sQuarter)
		{
			if(sQuarter == '1')
			{
				var minYInt = parseInt(minY)
				$('#autH01').val(minY);
				$('#winH01').val(minYInt+1);
				$('#sprH01').val(minYInt+1);
				$('#sumH01').val(minYInt+1);
				
				$('#autH02').val(minYInt+1);
				$('#winH02').val(maxY);
				$('#sprH02').val(maxY);
				$('#sumH02').val(maxY);
				
				$('#autH01').append(minY);
				$('#winH01').append(minYInt+1);
				$('#sprH01').append(minYInt+1);
				$('#sumH01').append(minYInt+1);
				
				$('#autH02').append(minYInt+1);
				$('#winH02').append(maxY);
				$('#sprH02').append(maxY);
				$('#sumH02').append(maxY);
			}
			else if((sQuarter == '2') || (sQuarter == '3')|| (sQuarter == '4'))
			{
				var minYInt = parseInt(minY)
				$('#autH01').val(minYInt-1);
				$('#winH01').val(minY);
				$('#sprH01').val(minY);
				$('#sumH01').val(minY);
				
				$('#autH02').val(minY);
				$('#winH02').val(maxY);
				$('#sprH02').val(maxY);
				$('#sumH02').val(maxY);
				
				$('#autH01').append(minYInt-1);
				$('#winH01').append(minY);
				$('#sprH01').append(minY);
				$('#sumH01').append(minY);
				
				$('#autH02').append(minY);
				$('#winH02').append(maxY);
				$('#sprH02').append(maxY);
				$('#sumH02').append(maxY);
			}
		}
	
});


// create container needed for methods below
var redips = {};

// initialization
redips.init = function () {
    // Access to the library 
    var rd = REDIPS.drag;
    // initialization
    rd.init();
    // Hover Color
    rd.hover.colorTd = '#9BB3DA';
}


//Event listener for the initialization

if (window.addEventListener) {
    window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
    window.attachEvent('onload', redips.init);
}

