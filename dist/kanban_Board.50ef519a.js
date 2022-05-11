var taskList = [];
let submit = document.querySelectorAll('.submit');
let tasks = document.querySelector('#tasks');
let newTask = document.querySelectorAll('.add_Task');
let newBoard = document.querySelector('#add_Board');
let singleEle = document.querySelector('.card_Individual_Elements');
let cardColumnCopy = document.querySelector('.copy');
let dragTask = null;
let noWrap = document.querySelector('#no_Wrap');
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
// submit.forEach((item) => {
//   item.addEventListener('click', function (event) {
//     let concealCard = item.parentNode.parentNode.children[1];
//     let taskName = item.parentNode.querySelector('#Task');
//     let dueDate = item.parentNode.querySelector('#Date');
//     let estimateHour = item.parentNode.querySelector('#Hour');
//     let estimateMin = item.parentNode.querySelector('#Minute');
//     let priority = item.parentNode.querySelector('#Priority');
//     let status = item.parentNode.querySelector('#Status');
//     if (taskName.value && dueDate.value && estimateHour.value && estimateMin.value && priority.value && status.value != "") {
//       event.preventDefault();
//       let due = getDateValue(dueDate);
//       let year = due[0];
//       let month = due[1];
//       let day = due[2];
//       addTask(taskName.value, year, month, day, estimateHour.value, estimateMin.value, priority.value, status.value);
//       console.log(taskList);
//       let infoFirstRow = concealCard.querySelector('.info_First_Row span');
//       infoFirstRow.innerHTML = taskList[taskList.length - 1].name;
//       let leftWords = concealCard.querySelector('.left span');
//       leftWords.innerHTML = taskList[taskList.length - 1].date.year + "-" + taskList[taskList.length - 1].date.month + "-" + taskList[taskList.length - 1].date.day;
//       let midWords = concealCard.querySelector('.middle span');
//       midWords.innerHTML = taskList[taskList.length - 1].time.hours + "h" + " " + taskList[taskList.length - 1].time.minutes + "min";
//       let rightWords = concealCard.querySelector('.right span');
//       rightWords.innerHTML = taskList[taskList.length - 1].status;
//       switch (taskList[taskList.length - 1].priority) {
//         case "High":
//           concealCard.querySelector('.priority_Circle').style.backgroundColor = "#DD5454";
//           break;
//         case "Medium":
//           concealCard.querySelector('.priority_Circle').style.backgroundColor = "#F8DD50";
//           break;
//         case "Low":
//           concealCard.querySelector('.priority_Circle').style.backgroundColor = "#A3EA6B";
//       }
//       item.parentNode.style.display = "none";
//       concealCard.style.display = "block";
//       item.parentNode.parentNode.children[2].style.display = "block";
//     }
//   });
// });
function addTask(name, year, month, day, hours, minutes, priority, status) {
    let newTask1 = {
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
    };
    taskList.push(newTask1);
}
noWrap.addEventListener("click", function(ev) {
    ev = ev || event;
    var target = ev.target || ev.srcElement;
    if (target.className.split(' ').includes('del')) target.parentNode.parentNode.remove();
    else if (target.className === "iconfont tick") {
        console.log(target);
        let concealCard = target.parentNode.parentNode.parentNode.children[1];
        console.log(concealCard);
        let taskName = target.parentNode.parentNode.querySelector('#Task');
        let dueDate = target.parentNode.parentNode.querySelector('#Date');
        let estimateHour = target.parentNode.parentNode.querySelector('#Hour');
        let estimateMin = target.parentNode.parentNode.querySelector('#Minute');
        let priority = target.parentNode.parentNode.querySelector('#Priority');
        let status = target.parentNode.parentNode.querySelector('#Status');
        if (taskName.value && dueDate.value && estimateHour.value && estimateMin.value && priority.value && status.value != "") {
            ev.preventDefault();
            let due = getDateValue(dueDate);
            let year = due[0];
            let month = due[1];
            let day = due[2];
            addTask(taskName.value, year, month, day, estimateHour.value, estimateMin.value, priority.value, status.value);
            console.log(taskList);
            let infoFirstRow = concealCard.querySelector('.info_First_Row span');
            infoFirstRow.innerHTML = taskList[taskList.length - 1].name;
            let leftWords = concealCard.querySelector('.left span');
            leftWords.innerHTML = taskList[taskList.length - 1].date.year + "-" + taskList[taskList.length - 1].date.month + "-" + taskList[taskList.length - 1].date.day;
            let midWords = concealCard.querySelector('.middle span');
            midWords.innerHTML = taskList[taskList.length - 1].time.hours + "h" + " " + taskList[taskList.length - 1].time.minutes + "min";
            let rightWords = concealCard.querySelector('.right span');
            rightWords.innerHTML = taskList[taskList.length - 1].status;
            switch(taskList[taskList.length - 1].priority){
                case "High":
                    concealCard.querySelector('.priority_Circle').style.backgroundColor = "#DD5454";
                    break;
                case "Medium":
                    concealCard.querySelector('.priority_Circle').style.backgroundColor = "#F8DD50";
                    break;
                case "Low":
                    concealCard.querySelector('.priority_Circle').style.backgroundColor = "#A3EA6B";
            }
            target.parentNode.parentNode.style.display = "none";
            concealCard.style.display = "block";
            target.parentNode.parentNode.parentNode.children[2].style.display = "block";
        }
    } else if (target.className === "plus") {
        target.parentNode.parentNode.style.display = "none";
        var cloneCardDiv = singleEle.cloneNode(true);
        target.parentNode.parentNode.parentNode.parentNode.appendChild(cloneCardDiv);
        let newestForm = cloneCardDiv.children[0];
        newestForm.reset();
        newestForm.style.display = "flex";
        let newestCard = cloneCardDiv.children[1];
        newestCard.style.display = "none";
        let newAdd = cloneCardDiv.children[2];
        newAdd.style.display = "none";
    }
});
function redirect() {
    location.replace("task.html");
}
// newTask.forEach((newItem) => {
//   newItem.addEventListener('click', function (event) {
//     newItem.style.display="none";
//     var cloneCardDiv = singleEle.cloneNode(true);
//     newItem.parentNode.parentNode.parentNode.parentNode.appendChild(cloneCardDiv);
//     // let newestForm = cloneCardDiv.children[0];
//     // newestForm.style.display = "flex";
//     // let newestCard = cloneCardDiv.children[1];
//     // newestCard.style.display = "none";
//     // let newAdd = cloneCardDiv.children[2];
//     // newAdd.style.display = "none";
//     // newestForm.reset();
//     event.preventDefault();
//   });
// });
newBoard.addEventListener('click', function(event) {
    var newColumn = cardColumnCopy.cloneNode(true);
    newColumn.style.display = "block";
    noWrap.insertBefore(newColumn, newBoard);
});
//drag function
noWrap.addEventListener('dragstart', function(ev) {
    ev = ev || event;
    var target = ev.target || ev.srcElement;
    if (target.className === "conceal_Card") {
        // setTimeout(() => {
        //   target.style.display = "none";
        // }, 0);
        target.addEventListener("dragend", function() {
            dragTask = null;
        // setTimeout(() => {
        //   target.style.display = "block";
        // }, 0);
        });
        var cardColumnAll1 = noWrap.querySelectorAll('.card_Column');
        cardColumnAll1.forEach((cardColumnAll)=>{
            cardColumnAll.addEventListener("dragover", dragOver);
            cardColumnAll.addEventListener("dragenter", dragEnter);
            cardColumnAll.addEventListener("dragleave", dragLeave);
            cardColumnAll.addEventListener("drop", function() {
                cardColumnAll.insertBefore(target, cardColumnAll.lastElementChild);
            });
        });
    }
});
//   let cardInformation = noWrap.querySelectorAll('.card_Information');
//   cardInformation.forEach((cardInformation) => {
//     cardInformation.addEventListener("dragstart", dragStart);
//     cardInformation.addEventListener("dragend", dragEnd);
//   });
//   let cardColumnAll=noWrap.querySelectorAll('.card_Column');
//   cardColumnAll.forEach((cardColumnAll) => {
//   cardColumnAll.addEventListener("dragover", dragOver);
//   cardColumnAll.addEventListener("dragenter", dragEnter);
//   cardColumnAll.addEventListener("dragleave", dragLeave);
//   cardColumnAll.addEventListener("drop", dragDrop);
// });
// });
// function dragStart() {
//   dragTask = this;
//   console.log("dragStart");
// }
// function dragEnd() {
//   dragTask = null;
//   console.log("dragEnd");
// }
function dragOver(e) {
    e.preventDefault();
    console.log("dragOver");
}
function dragEnter() {
    console.log("dragEnter");
}
function dragLeave() {
    console.log("dragLeave");
} // function dragDrop() {
 //   this.appendChild(dragTask);
 //   console.log("dragDrop");
 // }

//# sourceMappingURL=kanban_Board.50ef519a.js.map
