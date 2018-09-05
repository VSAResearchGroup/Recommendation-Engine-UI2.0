/*For the purpose of not having to do an API call each time,
Use the session storage variables in order to have them on have rather than
having to change them each each time.
*/
$(document).ready(function(){
	
	//Vars for the controls on html page
    var $uniOptions = $('#uni'); //ID for the drop down for Transferring University
    var $dgs = $('#major'); // ID for the drop down for Degree options
	var $jobType = $('#jobType'); // ID for the drop down for job type option
	var $creditPerQuarter = $('#creditPerQuarter');
	var $majorCreditPerQuarter = $('#majorCreditPerQuarter');
	var $startQuarter = $('#startQuarter');
	var $summerOption = $('#summerOption');
	var $engClass = $('#engClass');
	var $mathClass = $('#mathClass');
	var $timePref = $('#timePref');
	var $enrollType = $('#enrollType');
	
	
	//API LINKS
    var mainURL = 'http://localhost:8080/';
    var uniAPI = 'api/preferences/colleges/';
    var degreeAPI = 'api/preferences/degrees/';
	var postPrefData = '/api/plans/prefdata/';
    var engClassAPI = '/api/preferences/english/';
	var mathClassAPI = '/api/preferences/math/';
	
	//BUTTONS
	var $submitPrefs = $('#submitBtn');
    
	
	//Retrieves the necessary data for each controll from the database
	//TESTED: University and Major list 
	//UNTESTED: English Course and Math Course,
	//		REASON: API call would not generate the data. 
	//NOTE: Currently the ajax calls are nested, which slows down load time,
	//		There is likely a way to reduce the load time for each call,
	//		I could not find one due to time constraints.
	
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
					// English API call 
					$.ajax({
					url: mainURL+engClassAPI,
					type:'GET',
					dataType:'json',
					success: function(engData){ //If the AJAX is successful
                    //Default option set at the beginning
						$engClass.text(engData.recordset.course_number);
						$.ajax({
					url: mainURL+mathClassAPI,
					type:'GET',
					dataType:'json',
					success: function(mathData){ //If the AJAX is successful
                    //Default option set at the beginning
						$mathClass.text(mathData.recordset.course_number);
						
						
					
					
					},
					error: function(){ //Error in the AJAX call
						alert('Failure to retrieve ENG Values');
					}
					});
						
					
					
					},
					error: function(){ //Error in the AJAX call
						alert('Failure to retrieve ENG Values');
					}
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
	
	
    //Submission to the ParameterSet for plan generation
	//Sends a set of preferences to be submitted to the database.
	//UNTESTED
	//NOTE: Make sure that the table ParameterSet is updated before testing this call
	//NOTE: Please Also check and make sure about the description of status before generating
	//		The current one on POST is a default option I placed until it is tested properly
	$submitPrefs.click(function(event){
		event.preventDefault();
		$.ajax({
			url: mainURL + postPrefData,
			type: 'POST',
			data: { "MajorID": dgs.val(), "SchoolID": uniOptions.val(), "JobType": jobType.val(), "TotalQuarterCredits": creditPerQuarter.val(), "MajorQuarterCredits": majorCreditPerQuarter.val(), "EngCourseID": engClass.val(), "MathCourseID": mathClass.val(), "Status": "1", "SummerPreference": summerOption.val(), "EnrollmentType": enrollType.val() },
			success:function(result){
				alert('SUCCESS');
			},
			error: function(){
				 alert('Failure to POST Values');
			}
		});
	});
});