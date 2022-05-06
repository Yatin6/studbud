var taskList = [];
let taskName = document.querySelector('#Task');
let dueDate = document.querySelector('#Date');
let estimateHour = document.querySelector('#Hour');
let estimateMin = document.querySelector('#Minute');
let priority = document.querySelector('#Priority');
let status = document.querySelector('#Status');
let submit = document.querySelector('.submit');
let tasks = document.querySelector('#tasks');

// Question 1: here, I want to reduce repetitive steps above by function. 
// But...the tricky thing is the parameter of the querySelector is a string. 
// I don't know how to pass the variable id to it.

// function getValue(id){
//   return document.querySelector("'#"+id+"'");
// }
// let taskName= getValue(Task);
// console.log(taskName);


// seperae the data from the date input
function getDateValue(elements) {
  return elements.value.split("-");
}

submit.addEventListener('click', function (event) {
  let due = getDateValue(dueDate);
  let year = due[0];
  let month = due[1];
  let day = due[2];
  addTask(taskName.value, year, month, day, estimateHour.value, estimateMin.value, priority.value, status.value);
  console.log(taskList);
  let infoFirstRow = document.querySelector('.info_First_Row span');
  infoFirstRow.innerHTML = taskList[taskList.length-1].name;
  let leftWords = document.querySelector('.left span');
  leftWords.innerHTML = taskList[taskList.length-1].date.year + "-" + taskList[taskList.length-1].date.month + "-" + taskList[taskList.length-1].date.day;
  let midWords = document.querySelector('.middle span');
  midWords.innerHTML = taskList[taskList.length-1].time.hours + "h" + " " + taskList[taskList.length-1].time.minutes + "min";
  let rightWords = document.querySelector('.right span');
  rightWords.innerHTML = taskList[taskList.length-1].status;
  switch (taskList[taskList.length-1].priority) {
    case "High":
      document.querySelector('.priority_Circle').style.backgroundColor = "#DD5454";
      break;
    case "Medium":
      document.querySelector('.priority_Circle').style.backgroundColor = "#F8DD50";
      break;
    case "Low":
      document.querySelector('.priority_Circle').style.backgroundColor = "#A3EA6B";
  }
  document.querySelector('.card_Form').style.display = "none";
  document.querySelector('.task_Information').style.display = "block";
  event.preventDefault();
});

function addTask(name, year, month, day, hours, minutes, priority, status) {
  let newTask = {
    name: name,
    date: {
      year: year,
      month: month,
      day: day
    },
    time: {
      hours: hours,
      minutes: minutes
    },
    priority: priority,
    status: status
  }
  taskList.push(newTask);
}
