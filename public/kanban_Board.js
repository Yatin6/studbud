var taskList = JSON.parse(localStorage.getItem("taskList")) || [] // 卡片数据
// let taskSet = new Set()
let submit = document.querySelectorAll(".submit")
let tasks = document.querySelector("#tasks")
let newTask = document.querySelectorAll(".add_Task")
let newBoard = document.querySelector("#add_Board")
let singleEle = document.querySelector(".copy .card_Individual_Elements")
let cardColumnCopy = document.querySelector(".copy")
let dragTask = null
let noWrap = document.querySelector("#no_Wrap")
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
  return elements.value.split("-")
}
let dropDownFlag = "none"
let dropDownTarget = null

// 初始化卡片唯一标识id
let indexNum = localStorage.getItem("index") || 0
localStorage.setItem("index", indexNum)
let cardIndex = Number(localStorage.getItem("index")) + 1
document.querySelector(".index_num").innerHTML = cardIndex

/*
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
*/

function addTask(name, year, month, day, hours, minutes, priority, status) {
  let newTask = {
    id: cardIndex,
    name: name,
    date: {
      year: year,
      month: month,
      day: day,
    },
    time: {
      hours: hours,
      minutes: minutes,
    },
    priority: priority,
    status: status,
  }
  // let temp = taskSet
  // taskSet.add(Data.now())
  // if()
  taskList.push(newTask)
  localStorage.setItem("taskList", JSON.stringify(taskList))
}

// 卡片数据更改
function modifyTask(id, name, year, month, day, hours, minutes, priority, status) {
  let newTask = {
    id: id,
    name: name,
    date: {
      year: year,
      month: month,
      day: day,
    },
    time: {
      hours: hours,
      minutes: minutes,
    },
    priority: priority,
    status: status,
  }
  for (let j = 0; j < taskList.length; j++) {
    if (Number(taskList[j].id) === Number(id)) {
      // console.log("is????")
      taskList[j] = newTask
      break
    }
  }
  // console.log("modify taskList", taskList, newTask)
  // taskList.push(newTask)
  localStorage.setItem("taskList", JSON.stringify(taskList))
}

// 初始化函数
function initCards() {
  console.log(JSON.parse(localStorage.getItem("taskList")))
  let taskDatas = JSON.parse(localStorage.getItem("taskList"))

  if (!taskDatas) {
    return
  }

  var newColumn = cardColumnCopy.cloneNode(true)
  newColumn.querySelector(".card_Column_Name").children[0].innerHTML = "History"
  newColumn.style.display = "block"
  noWrap.insertBefore(newColumn, newBoard)

  // 初始化卡片
  let concealCard = newColumn.querySelector(".conceal_Card")
  let temp = taskDatas[0]
  newColumn.querySelector(".index_num").innerHTML = temp.id
  let infoFirstRow = concealCard.querySelector(".info_First_Row span")
  infoFirstRow.innerHTML = temp.name
  let leftWords = concealCard.querySelector(".left span")
  leftWords.innerHTML = temp.date.year + "-" + temp.date.month + "-" + temp.date.day
  let midWords = concealCard.querySelector(".middle span")
  midWords.innerHTML = temp.time.hours + "h" + " " + temp.time.minutes + "min"
  let rightWords = concealCard.querySelector(".right span")
  rightWords.innerHTML = temp.status
  switch (temp.priority) {
    case "High":
      concealCard.querySelector(".priority_Circle").style.backgroundColor = "#DD5454"
      break
    case "Medium":
      concealCard.querySelector(".priority_Circle").style.backgroundColor = "#F8DD50"
      break
    case "Low":
      concealCard.querySelector(".priority_Circle").style.backgroundColor = "#A3EA6B"
  }
  newColumn.querySelector(".card_Form").style.display = "none"
  newColumn.querySelector(".conceal_Card").style.display = "block"
  // 初始化表单
  let newForm = newColumn.querySelector(".card_Form")
  // console.log(newForm)
  newForm.querySelector("#Task").value = temp.name
  // console.log(`${temp.date.year}-${temp.date.month}-${temp.date.day}`)
  newForm.querySelector("#Date").value = `${temp.date.year}-${temp.date.month}-${temp.date.day}`
  newForm.querySelector("#Hour").value = temp.time.hours
  newForm.querySelector("#Minute").value = temp.time.minutes
  newForm.querySelector("#Priority").value = temp.priority
  newForm.querySelector("#Status").value = temp.status

  for (let i = 1; i < taskDatas.length; i++) {
    console.log(taskDatas[i])
    let cloneCardDiv = singleEle.cloneNode(true)
    newColumn.appendChild(cloneCardDiv)

    // 初始化卡片
    let concealCard = cloneCardDiv.querySelector(".conceal_Card")
    let temp = taskDatas[i]
    cloneCardDiv.querySelector(".index_num").innerHTML = temp.id
    let infoFirstRow = concealCard.querySelector(".info_First_Row span")
    infoFirstRow.innerHTML = temp.name
    let leftWords = concealCard.querySelector(".left span")
    leftWords.innerHTML = temp.date.year + "-" + temp.date.month + "-" + temp.date.day
    let midWords = concealCard.querySelector(".middle span")
    midWords.innerHTML = temp.time.hours + "h" + " " + temp.time.minutes + "min"
    let rightWords = concealCard.querySelector(".right span")
    rightWords.innerHTML = temp.status
    switch (temp.priority) {
      case "High":
        concealCard.querySelector(".priority_Circle").style.backgroundColor = "#DD5454"
        break
      case "Medium":
        concealCard.querySelector(".priority_Circle").style.backgroundColor = "#F8DD50"
        break
      case "Low":
        concealCard.querySelector(".priority_Circle").style.backgroundColor = "#A3EA6B"
    }
    cloneCardDiv.querySelector(".card_Form").style.display = "none"
    cloneCardDiv.querySelector(".conceal_Card").style.display = "block"

    // 初始化表单
    let newForm = cloneCardDiv.querySelector(".card_Form")
    // console.log(newForm)
    newForm.querySelector("#Task").value = temp.name
    // console.log(`${temp.date.year}-${temp.date.month}-${temp.date.day}`)
    newForm.querySelector("#Date").value = `${temp.date.year}-${temp.date.month}-${temp.date.day}`
    newForm.querySelector("#Hour").value = temp.time.hours
    newForm.querySelector("#Minute").value = temp.time.minutes
    newForm.querySelector("#Priority").value = temp.priority
    newForm.querySelector("#Status").value = temp.status
  }

  newColumn.children[taskDatas.length].querySelector(".conceal_Add").style.display = "block"
}

initCards()

noWrap.addEventListener("click", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  let targetInfo = target.parentNode.parentNode
  if (target.className.split(" ").includes("del")) {
    targetInfo.remove()
  } else if (target.className === "iconfont tick") {
    // 卡片输入数据确定，生成卡片
    console.log(target)
    let concealCard = targetInfo.parentNode.children[1]
    console.log(concealCard)
    console.log("-----", targetInfo.querySelector(".index_num"))
    // 保证卡片唯一
    let isNewFlag = true // 卡片数据是否已经存在
    taskList.forEach((item) => {
      // console.log(item.id, targetInfo.querySelector(".index_num").innerHTML)
      if (Number(item.id) === Number(targetInfo.querySelector(".index_num").innerHTML)) {
        isNewFlag = false
      }
    })
    if (isNewFlag) {
      localStorage.setItem("index", targetInfo.querySelector(".index_num").innerHTML)
    }
    console.log(isNewFlag)
    // ------end
    let taskName = targetInfo.querySelector("#Task")
    let dueDate = targetInfo.querySelector("#Date")
    let estimateHour = targetInfo.querySelector("#Hour")
    let estimateMin = targetInfo.querySelector("#Minute")
    let priority = targetInfo.querySelector("#Priority")
    let status = targetInfo.querySelector("#Status")
    if (taskName.value && dueDate.value && estimateHour.value && estimateMin.value && priority.value && status.value != "") {
      ev.preventDefault()
      let due = getDateValue(dueDate)
      console.log(dueDate.value)
      let year = due[0]
      let month = due[1]
      let day = due[2]
      // 新卡片时添加数据至localStorage
      if (isNewFlag) {
        addTask(taskName.value, year, month, day, estimateHour.value, estimateMin.value, priority.value, status.value)
      } else {
        // 老数据的localStorage更新
        modifyTask(
          Number(targetInfo.querySelector(".index_num").innerHTML),
          taskName.value,
          year,
          month,
          day,
          estimateHour.value,
          estimateMin.value,
          priority.value,
          status.value
        )
      }

      console.log(taskList)
      // 找到编辑对应的储存数据
      console.log("------", target.parentNode.parentNode.querySelector(".index_num").innerHTML)
      let taskData = taskList.find((item) => {
        return Number(item.id) === Number(target.parentNode.parentNode.querySelector(".index_num").innerHTML)
      })
      console.log(taskData)
      let infoFirstRow = concealCard.querySelector(".info_First_Row span")
      infoFirstRow.innerHTML = taskData.name
      let leftWords = concealCard.querySelector(".left span")
      leftWords.innerHTML = taskData.date.year + "-" + taskData.date.month + "-" + taskData.date.day
      let midWords = concealCard.querySelector(".middle span")
      midWords.innerHTML = taskData.time.hours + "h" + " " + taskData.time.minutes + "min"
      let rightWords = concealCard.querySelector(".right span")
      rightWords.innerHTML = taskData.status
      switch (taskData.priority) {
        case "High":
          concealCard.querySelector(".priority_Circle").style.backgroundColor = "#DD5454"
          break
        case "Medium":
          concealCard.querySelector(".priority_Circle").style.backgroundColor = "#F8DD50"
          break
        case "Low":
          concealCard.querySelector(".priority_Circle").style.backgroundColor = "#A3EA6B"
      }
      target.parentNode.parentNode.style.display = "none" // 表单隐藏
      concealCard.style.display = "block" // 卡片显示
      // target.parentNode.parentNode.parentNode.children[2].style.display = "block" // 卡片添加显示
      let temp2 = target.parentNode.parentNode.parentNode.parentNode
      console.log(temp2.children[temp2.children.length - 1])
      temp2.children[temp2.children.length - 1].children[2].style.display = "block" // 卡片添加显示2
      // console.log(target.parentNode.parentNode.parentNode.parentNode.children[target.parentNode.parentNode.parentNode.parentNode.children.length - 1]);
      // target.parentNode.parentNode.parentNode.querySelector('.card_Information').style.display='block'
    }
  } else if (target.className === "plus") {
    // 添加新卡片
    target.parentNode.parentNode.style.display = "none"
    var cloneCardDiv = singleEle.cloneNode(true)
    target.parentNode.parentNode.parentNode.parentNode.appendChild(cloneCardDiv)
    // console.log(cloneCardDiv);
    cardIndex++
    localStorage.setItem("index", cardIndex)
    cloneCardDiv.querySelector(".index_num").innerHTML = cardIndex
    let newestForm = cloneCardDiv.children[0]
    newestForm.reset()
    newestForm.style.display = "flex"
    let newestCard = cloneCardDiv.children[1]
    newestCard.style.display = "none"
    let newAdd = cloneCardDiv.children[2]
    newAdd.style.display = "none"
  } else if (target.id === "task_Edit") {
    console.log(target.parentNode.parentNode.parentNode)
    // return
    target.parentNode.parentNode.parentNode.parentNode.style.display = "none"
    target.parentNode.parentNode.parentNode.parentNode.parentNode.children[2].style.display = "none"
    target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].style.display = "flex"
  } else if (target.id === "task_Delete") {
    // let id = target.parentElement.getAttribute('data-id');
    // let index = taskListArray.findIndex(task => task.id === Number(id));
    // removeItemFromArray(taskListArray, index)
    target.parentNode.parentNode.parentNode.remove()
  } else if (target.id === "ellipse") {
    // dropDownFlag = 'block'
    // console.log('ellipse test');
    // if(dropDownFlag === 'none'){
    //   dropDownFlag = 'block'
    // }else{
    //   dropDownFlag = 'none'
    // }
    // dropDownTarget = target.parentNode.parentNode.querySelector('.drop_Down')
    // console.log(dropDownTarget);
    // dropDownTarget.style.display = dropDownFlag;

    let tempTarget = target.parentNode.parentNode.querySelector(".drop_Down")
    let flag = tempTarget.style.display
    console.log(flag)
    if (flag === "none" || flag === "") {
      flag = "block"
    } else {
      flag = "none"
    }
    console.log(flag)
    tempTarget.style.display = flag
    // target.addEventListener
  }
})

document.addEventListener("click", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  // if(dropDownFlag === 'block'){
  //   dropDownFlag = 'none'
  // }
  console.log("quanju test")
  if (target.id === "ellipse") {
    return ""
  } else {
    // if(dropDownTarget){
    //   if(dropDownFlag==='block'){
    //     dropDownFlag = 'none'
    //     dropDownTarget.style.display = dropDownFlag
    //   }
    //   // console.log('test222')
    // }
    let dropDowns = document.querySelectorAll(".drop_Down")
    dropDowns.forEach((item) => {
      // console.log(item)
      item.style.display = "none"
    })
  }
})

function redirect() {
  location.replace("task.html")
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

// 添加新的一列卡片
newBoard.addEventListener("click", function (event) {
  var newColumn = cardColumnCopy.cloneNode(true)
  newColumn.style.display = "block"
  noWrap.insertBefore(newColumn, newBoard)
})

//drag function
noWrap.addEventListener("dragstart", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  var dragTask = target.cloneNode(true)
  if (target.className === "conceal_Card") {
    setTimeout(() => {
      target.style.display = "none"
    }, 0)
    target.addEventListener("dragend", function () {
      dragTask = null
      setTimeout(() => {
        target.style.display = "block"
      }, 0)
    })
    var cardColumnAll = noWrap.querySelectorAll(".card_Column")
    cardColumnAll.forEach((cardColumnAll) => {
      cardColumnAll.addEventListener("dragover", dragOver)
      cardColumnAll.addEventListener("dragenter", dragEnter)
      cardColumnAll.addEventListener("dragleave", dragLeave)
      cardColumnAll.addEventListener("drop", function () {
        cardColumnAll.insertBefore(dragTask, cardColumnAll.lastElementChild)
        target.remove()
      })
    })
  }
})

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
  e.preventDefault()
  console.log("dragOver")
}

function dragEnter() {
  this.style.border = "1px dashed #ccc"
  console.log("dragEnter")
}

function dragLeave() {
  this.style.border = "none"
  console.log("dragLeave")
}

// function dragDrop() {
//   this.appendChild(dragTask);
//   console.log("dragDrop");
// }
