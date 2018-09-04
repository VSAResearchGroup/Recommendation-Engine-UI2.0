$(function(){
	var uniOptions = '';
	$.getJSON('uniNames.json', function(data){
		uniOptions+="<option value=''>	Please Click on A University	</option>"
		$.each(data, function(i, uni){
			uniOptions+="<option>"
			+uni.name+
			"</option>";
		});
		$('#uni').html(uniOptions);
	});
});