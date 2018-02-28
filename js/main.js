var username = "";

function getTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	h = checkTime(h);
	m = checkTime(m);
	document.getElementById('time').innerHTML = h + ":" + m;
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var curWeekDay = days[today.getDay()];
	var curDay = today.getDate();
	var curMonth = months[today.getMonth()];
	var curYear = today.getFullYear();
	var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
	document.getElementById("date").innerHTML = date;
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}

function showGreetingMsg(name) {
	var today = new Date();
	var hour = today.getHours();

	var msg;
	if (hour >= 0 && hour < 12) {
		msg = "Good morning, ";
	} else if (hour >= 12 && hour < 18) {
		msg = "Good afternoon, ";
	} else if (hour >= 18) {
		msg = "Good evening, ";
	}
	document.getElementById('greetmsg').innerHTML = msg + name;
}

function getWeather() {
	var location = "Kowloon, HK"; //change city variable dynamically as required
	var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c'";

	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function (data) {
		console.log(data);
		var city = data.query.results.channel.location.city;
		var temp = data.query.results.channel.item.condition.temp;
		var code = data.query.results.channel.item.condition.code;
		var forecast = data.query.results.channel.item.forecast;

		$('#weatherText').html(city + " " + temp + "°C" + " ");
		$('#weatherText').append("<i class='wi wi-yahoo-"+code+"'></i>");
		//code api
		//https://erikflowers.github.io/weather-icons/api-list.html

		$('#wdhead').append("<i class='wi wi-yahoo-"+code+"'></i>" + data.query.results.channel.item.condition.text + "<br>");
		$('#wdhead').append(data.query.results.channel.atmosphere.humidity+"<i class='wi wi-humidity'></i>");


		var tmp = ["#wd1","#wd2","#wd3","#wd4","#wd5"];
		for(var i=0;i<5; i++){
			$(tmp[i]).append(forecast[i].day + " " + "<i class='wi wi-yahoo-"+forecast[i].code+"'></i><br>");
			$(tmp[i]).append("High: " + forecast[i].high + "°C" + "<br>");
			$(tmp[i]).append("Low: " + forecast[i].low + "°C" + "<br>");
		}

	});
}

function getQuote() {
	$.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function (a) {
		$("#quote").append(a[0].content + "<p>— " + a[0].title + "</p>")
	});
}

function getBackground() {
	$('body').css('background-image', 'url(' + "https://source.unsplash.com/" + screen.width + "x" + screen.height + ')');
}

function get_greeting_name(ele) {
	if (event.key === 'Enter') {
		localStorage.setItem("username", document.getElementById('name_input').value);
		username = localStorage.getItem("username");
		document.getElementById('greeting_name').remove();
		$("#search").fadeIn();
		showGreetingMsg(username);
		var t2 = setInterval(showGreetingMsg(username), 1000 * 60 * 1);
	}
}

function get_list_item(){
	//to-do: get list item from localstorage and createElement("li");
}
function add_to_do_item(ele) {
	if (event.key === 'Enter') {
		localStorage.setItem("username", document.getElementById('name_input').value);
		username = localStorage.getItem("username");
		document.getElementById('greeting_name').remove();
		$("#search").fadeIn();
		showGreetingMsg(username);
		var t2 = setInterval(showGreetingMsg(username), 1000 * 60 * 1);
	}
	var li = document.createElement("li");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === '') {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(span);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.style.display = "none";
		}
	}
}

function to_do_create_close_button() {
	// Create a "close" button and append it to each list item
	var myNodelist = document.getElementsByTagName("LI");
	var i;
	for (i = 0; i < myNodelist.length; i++) {
		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		myNodelist[i].appendChild(span);
	}
}

function to_do_close_current_item(ele) {
	// Click on a close button to hide the current list item
	var close = document.getElementsByClassName("close");
	var i;
	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.style.display = "none";
		}
	}
}

function to_do_item_checked(ele) {
	// Add a "checked" symbol when clicking on a list item
	var list = document.querySelector('ul');
	list.addEventListener('click', function (ev) {
		if (ev.target.tagName === 'LI') {
			ev.target.classList.toggle('checked');
		}
	}, false);
}

$(document).ready(function () {
	// localStorage.removeItem("username"); //for testing
	to_do_create_close_button();
	getBackground();
	getTime();
	var t1 = setInterval(getTime, 1000 * 60 * 1);
	getWeather();
	getQuote();
	username = localStorage.getItem("username");
	if (username == null || username == "null" || username == "") {
		$("#greeting_name").fadeIn();
	} else {
		$("#search").fadeIn();
		showGreetingMsg(username);
		var t2 = setInterval(showGreetingMsg(username), 1000 * 60 * 1);
	}
});

$('#weather').click(function () {
	if ($('#weatherDetail').is(':hidden')) {
		$('#weatherDetail').show('slide', {
			direction: 'right'
		}, 400);
	} else {
		$('#weatherDetail').hide('slide', {
			direction: 'right'
		}, 400);
	}
});