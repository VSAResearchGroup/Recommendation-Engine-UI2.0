function myFunction(name) {
	if(name == 'transferringcollege') {
		document.getElementById('transcollegedropdown').classList.toggle("show");
	} else if(name == 'major') {
		document.getElementById('majordropdown').classList.toggle("show");
	} else if(name == 'timepreference') {
		document.getElementById('timeprefdropdown').classList.toggle("show");
	} else if(name == 'enrollment') {
		document.getElementById('enrollmentdropdown').classList.toggle("show");
	} else if(name == 'summer') {
		document.getElementById('summerdropdown').classList.toggle("show");
	} else if(name == 'quarter') {
		document.getElementById('quarterdropdown').classList.toggle("show");
	} else if(name == 'job') {
		document.getElementById('jobdropdown').classList.toggle("show");
	}
}

function myFunction2(buttonElement, nth) {
	var element = document.getElementsByTagName('button')[nth];
	$(element).text($(buttonElement).text());
}

window.onclick = function(event) {
	if(!event.target.matches('.dropdownbutton')) {
		var dropdown = document.getElementsByClassName('dropdown-content');
		var i;
		for (i = 0; i < dropdown.length; i++) {
			var option = dropdown[i];
			if(option.classList.contains('show')) {
				option.classList.remove('show');
			}
		}
	}
}
