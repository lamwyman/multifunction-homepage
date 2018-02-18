function getTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	ShowGreetingMsg(h); 
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
	
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var curWeekDay = days[today.getDay()];
	var curDay = today.getDate();
	var curMonth = months[today.getMonth()];
	var curYear = today.getFullYear();
	var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
	document.getElementById("date").innerHTML = date;
	
	var t = setTimeout(getTime, 5);
}
function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

function ShowGreetingMsg(hour){
	var username = "poor guy";
	var msg;
	if(hour>=0 && hour<=11){
		msg = "Good Morning, ";
	}else if(hour>=12 && hour<=18){
		msg = "Good Afternoon, ";
	}else {
		msg = "Good Evening, ";
	}

	document.getElementById('greetmsg').innerHTML = msg + username;
}