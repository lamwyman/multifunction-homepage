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
  console.log("called showGreetingMsg(x) on " + Date());
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

function clearWeather(){
  document.getElementById("weatherText").innerHTML = "";
  document.getElementById("wdhead").innerHTML = "<span aria-hidden='true' id='close' onclick='$('#weatherDetail').hide('slide',{direction:'right'},400);'>&times;</span>";
  document.getElementById("wd1").innerHTML = "";
  document.getElementById("wd2").innerHTML = "";
  document.getElementById("wd3").innerHTML = "";
  document.getElementById("wd4").innerHTML = "";
  document.getElementById("wd5").innerHTML = "";
}

function getWeather() {
  console.log("called getWeather() on " + Date());
  clearWeather();
  var location = "Kowloon, HK"; //change city variable dynamically as required
  var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c'";

  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function (data) {
    console.log(data);
    var city = data.query.results.channel.location.city;
    var temp = data.query.results.channel.item.condition.temp;
    var code = data.query.results.channel.item.condition.code;
    var forecast = data.query.results.channel.item.forecast;

    $('#weatherText').html(city + " " + temp + "°C" + " ");
    $('#weatherText').append("<i class='wi wi-yahoo-" + code + "'></i>");
    //code api
    //https://erikflowers.github.io/weather-icons/api-list.html

    $('#wdhead').append("<i class='wi wi-yahoo-" + code + "'></i>" + data.query.results.channel.item.condition.text + "<br>");
    $('#wdhead').append(data.query.results.channel.atmosphere.humidity + "<i class='wi wi-humidity'></i>");


    var tmp = ["#wd1", "#wd2", "#wd3", "#wd4", "#wd5"];
    for (var i = 0; i < 5; i++) {
      $(tmp[i]).append(forecast[i+1].day + " " + "<i class='wi wi-yahoo-" + forecast[i+1].code + "'></i><br>");
      $(tmp[i]).append("High: " + forecast[i+1].high + "°C" + "<br>");
      $(tmp[i]).append("Low: " + forecast[i+1].low + "°C" + "<br>");
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
    setInterval(function () {
      showGreetingMsg(username);
    }, 1000 * 60 * 60);
  }
}

$(document).ready(function () {
  // localStorage.removeItem("username"); //for testing
  getBackground();
  getTime();
  var t1 = setInterval(getTime, 1000 * 60 * 1);
  getWeather();
  setInterval(getWeather, 1000 * 60 * 60);
  getQuote();
  username = localStorage.getItem("username");
  if (username == null || username == "null" || username == "") {
    $("#greeting_name").fadeIn();
  } else {
    $("#search").fadeIn();
    showGreetingMsg(username);
    setInterval(function () {
      showGreetingMsg(username);
    }, 1000 * 60 * 60);
  }
});

$('#to-do-list').click(function () {
  if ($('#to-do-list-detail').is(':hidden')) {
    $('#to-do-list-detail').show('slide', {
      direction: 'left'
    }, 400);
  } else {
    $('#to-do-list-detail').hide('slide', {
      direction: 'left'
    }, 400);
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

function addTodo(event){ resetTodo();
  if(event.keyCode === 13){
    var todoItem = $('#add').val();
    var todoObj = {name: todoItem, status: "new"};
    var todoArray = [];

    //update localstorage
    if(JSON.parse(localStorage.getItem("todoArray"))==null){ 
      todoArray.push(todoObj);
    }else{
      todoArray = JSON.parse(localStorage.getItem("todoArray"));
      todoArray.push(todoObj);
    }
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
    
    createTodo(todoItem);

    //reset input box
    $('#add').val("");
    
    console.log(todoArray);
  }
}

function removeTodo(){
  //remove element

  //update localstorage
}

function createTodo(todoItem){
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  //checkbox.onchange = "isChecked(this)";
  checkbox.onchange = () => isChecked();
  checkbox.name = "todoCheckbox";
  //checkbox.value = todoItem;
  //checkbox.id = todoItem;
  
  var li = document.createElement('li')
  li.htmlFor = todoItem;
  li.setAttribute('name', todoItem);
  li.appendChild(document.createTextNode(todoItem));
  
  document.getElementById('todoList').appendChild(checkbox);
  document.getElementById('todoList').appendChild(li);

  var br = document.createElement('br');
  document.getElementById('todoList').appendChild(br);
}

function isChecked(){
  //get checkbox arr
  var inputType = document.getElementsByTagName('input');
  var checkboxArr = [];
  for(var i=0;i<inputType.length;i++){
    if(inputType[i].name == 'todoCheckbox')
      checkboxArr.push(inputType[i]);
  }
  //get li arr
  var liArr = document.getElementsByTagName('li');

  if(checkboxArr.length == liArr.length){ console.log('good');
    for(var i=0; i<checkboxArr.length;i++){
      //check checkboxArr which has checked properties
      if(checkboxArr[i].checked){     
        liArr[i].className = "finishedTodo";
      }else{
        liArr[i].className = "";
      }
    }
  }
}

function resetTodo(){
  localStorage.setItem("todoArray", null);  
}

