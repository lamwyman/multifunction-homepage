function getTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
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
}
function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

function showGreetingMsg(){
	var today = new Date();
	var hour = today.getHours();
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

$(document).ready(function() {
	showGreetingMsg();
	var t2 = setInterval(getTime, 500);
	var t1 = setInterval(showGreetingMsg, 1000 * 60 * 60);
	var city = "Kowloon, HK";
    var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
    //change city variable dynamically as required
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function(data){
     console.log(data);
     $('#weather_text').html("Temperature in " + city + " is " + data.query.results.channel.item.condition.temp + "°C");
    });

	$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
		$("#quote").append(a[0].content + "<p>— " + a[0].title + "</p>")
	  });
	$('body').css('background-image', 'url('+"https://source.unsplash.com/"+screen.width+"x"+screen.height+')');
});