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

function clearWeather() {
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
      $(tmp[i]).append(forecast[i + 1].day + " " + "<i class='wi wi-yahoo-" + forecast[i + 1].code + "'></i><br>");
      $(tmp[i]).append("High: " + forecast[i + 1].high + "°C" + "<br>");
      $(tmp[i]).append("Low: " + forecast[i + 1].low + "°C" + "<br>");
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

var taskInput = document.getElementById("new-task"); //Add a new task.

var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {

  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbx
  //label
  var label = document.createElement("label"); //label
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button"); //edit button

  //button.delete
  var deleteButton = document.createElement("button"); //delete button

  label.innerText = taskString;

  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";



  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask = function (ele) {
  if (event.key === 'Enter' && ele.value != "") {

    console.log("Add Task...");

    //Create a new list item with the text from the #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
  }
}

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
  console.log("AJAX Request");
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}