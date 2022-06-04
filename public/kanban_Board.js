let submit = document.querySelectorAll(".submit")
let tasks = document.querySelector("#tasks")
let newTask = document.querySelectorAll(".add_Task")
let newBoard = document.querySelector("#add_Board")
let singleEle = document.querySelector(".copy .card_Individual_Elements")
let cardColumnCopy = document.querySelector(".copy")
let noWrap = document.querySelector("#no_Wrap")
let addCard = document.querySelector(".conceal_Add_copy")
var taskList = JSON.parse(localStorage.getItem("taskList")) || [] // Card information data
let titleList = JSON.parse(localStorage.getItem("titles")) || [] // title of each column
let rows = [] // a 2D array, the first dimension use to store the column index, and the second dimension stores the card information under that column

// seperae the data from the date input
function getDateValue(elements) {
  return elements.value.split("-")
}
let dropDownFlag = "none"
let dropDownTarget = null

/* page initialize
 * This block is responsible for fetching card storage data from localStorage on page load and rendering 
 *  it to achieve the effect that card data will not be lost when the page is refreshed
 * begin
 * */

// Initialize the card unique identification using a number
let indexNum = localStorage.getItem("index") || 0
localStorage.setItem("index", indexNum)
let cardIndex = Number(localStorage.getItem("index"))

initRow()
// Initialise the num of each column unique identification using a number
localStorage.setItem("card", localStorage.getItem("card") || 0)
let rowIndex = Number(localStorage.getItem("card"))

// Global functions: Once the user finishes filling the form by clicking the "tick" sign, 
// the card information data will be saved in localStorage
function addTask(id, name, year, month, day, hours, minutes, priority, status, rowNum) {
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
    rowNum: rowNum,
    datas: {
      stepList: [],
      linkList: [],
    },
  }
  taskList = rowsToList(rows)
  taskList.push(newTask)
  rows.find((item) => item.rowNum === Number(rowNum)).data.push(newTask)
  localStorage.setItem("taskList", JSON.stringify(taskList))
}

// When the user modify the information in the card, the data stored in the local storage will be changed correspondingly
function modifyTask(id, name, year, month, day, hours, minutes, priority, status, rowNum) {
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
    rowNum: rowNum,
  }
  for (let j = 0; j < taskList.length; j++) {
    if (Number(taskList[j].id) === Number(id)) {
      // console.log("is????")
      newTask.datas = taskList[j].datas
      taskList[j] = newTask
      break
    }
  }

  localStorage.setItem("taskList", JSON.stringify(taskList))
}

// Initialization function => card rendering from the obtained data in local storage to 
// generate a front-end card (all data in a column)
function initCards(taskDatas, rowIndex) {
  if (!taskDatas || taskDatas.length === 0) {
    return
  }
  var newColumn = cardColumnCopy.cloneNode(true)

  newColumn.querySelector(".card_num").innerHTML = rowIndex
  if (titleList.length !== 0) {
    newColumn.querySelector("h3").innerHTML = titleList.find((item) => {
      return Number(item.rowNum) === Number(rowIndex)
    }).title
  }
  newColumn.style.display = "block"
  noWrap.insertBefore(newColumn, newBoard)

  // generate a new card(including form and the card, the same logic of adding the task mentioned previously)
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
  // Initialising the input form
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

    // Initialising the card
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

    // Initialising the input form
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

  // newColumn.children[taskDatas.length].querySelector(".conceal_Add").style.display = "block"
  let newAddCard = addCard.cloneNode(true)
  newColumn.appendChild(newAddCard)
}

// initCards()

// Converts the one-dimensional array taskList in local storage into a two-dimensional array
// rows for easy handling of data in each column。Then, initialize each column of data: the initialization 
// logic is to execute an initcards function for each column cyclically according to the number of columns, 
// each time will generate one column of cards.
function initRow() {
  let rowDatas = JSON.parse(localStorage.getItem("taskList"))
  if (!rowDatas || rowDatas.length === 0) {
    return
  }

  let mapTemp = []
  let rowTemp = []
  for (let i = 0; i < rowDatas.length; i++) {
    if (rowTemp.indexOf(Number(rowDatas[i].rowNum)) === -1) {
      rowTemp.push(Number(rowDatas[i].rowNum))
      mapTemp.push({
        rowNum: Number(rowDatas[i].rowNum),
        data: [rowDatas[i]],
      })
    } else {
      for (let j = 0; j < mapTemp.length; j++) {
        if (mapTemp[j].rowNum === Number(rowDatas[i].rowNum)) {
          mapTemp[j].data.push(rowDatas[i])
          break
        }
      }
    }
  }
  console.log(rowTemp, "rows", mapTemp, taskList)
  let titleTemp = []
  titleList.forEach((item) => {
    if (rowTemp.indexOf(Number(item.rowNum)) !== -1) {
      // console.log(rowTemp.indexOf(Number(item.rowNum)))
      titleTemp.push(item)
      // console.log("????", titleTemp)
    }
  })
  console.log(titleTemp)
  titleList = titleTemp
  localStorage.setItem("titles", JSON.stringify(titleList))
  rows = mapTemp
  localStorage.setItem("card", Math.max(...rowTemp))
  mapTemp.forEach((item) => {
    initCards(item.data, item.rowNum)
  })
}

/*page initialize 
 *end 
 */

// Global function, rows is a card-column mapping (2-dimensional array), so we need to convert rows 
// to a 1-dimensional array to store it in localStorage
function rowsToList(rows) {
  // console.log(rows)
  let tempArr = []
  rows.forEach((item) => {
    // tempArr.push(item.data)
    item.data.forEach((item2) => {
      tempArr.push(item2)
    })
  })
  return tempArr
}

// click event of the card(including sumbitting the form, displaying the user 
// input data on the card and enable users to modify and delete the card )
noWrap.addEventListener("click", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  let targetInfo = target.parentNode.parentNode
  if (target.className.split(" ").includes("del")) {
    console.log("card row del", target.parentNode.querySelector(".card_num").innerHTML)
    // console.log(rows)
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].rowNum === Number(target.parentNode.querySelector(".card_num").innerHTML)) {
        // console.log(rows[i])
        rows.splice(i, 1)
        // console.log(rows)
        // console.log(rowsToList(rows))
        taskList = rowsToList(rows)
        localStorage.setItem("taskList", JSON.stringify(taskList))
        break
      }
    }
    targetInfo.remove()
  } else if (target.className === "iconfont tick") {
    // generate the card once the user click on the tick sign in the bottom of the input form
    console.log(target)
    let concealCard = targetInfo.parentNode.children[1]
    console.log(concealCard)
    console.log("-----", targetInfo.querySelector(".index_num"))

    // Get the card Id in its group
    console.log("cardId", targetInfo.parentNode.parentNode.querySelector(".card_num").innerHTML)
    // return
    let rowNum = Number(targetInfo.parentNode.parentNode.querySelector(".card_num").innerHTML)

    // Guaranteed card uniqueness
    let isNewFlag = true // check the card data whether already exist
    taskList.forEach((item) => {
      // console.log(item.id, targetInfo.querySelector(".index_num").innerHTML)
      if (Number(item.id) === Number(targetInfo.querySelector(".index_num").innerHTML)) {
        isNewFlag = false
      }
    })
    if (isNewFlag) {
      localStorage.setItem("index", targetInfo.querySelector(".index_num").innerHTML)
      // localStorage.setItem("card", rowNum)
    }
    console.log(isNewFlag)

    // get the data from the input form
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
      // Determine if it is a new card, if so, add the new data to localStorage, otherwise modify the corresponding data directly
      if (isNewFlag) {
        addTask(
          Number(targetInfo.querySelector(".index_num").innerHTML),
          taskName.value,
          year,
          month,
          day,
          estimateHour.value,
          estimateMin.value,
          priority.value,
          status.value,
          rowNum
        )
      } else {
        // Modify the old data in the localStorage directly and update
        modifyTask(
          Number(targetInfo.querySelector(".index_num").innerHTML),
          taskName.value,
          year,
          month,
          day,
          estimateHour.value,
          estimateMin.value,
          priority.value,
          status.value,
          rowNum
        )
      }

      console.log(taskList)
      // Once the card data is found from local storage, the card is rendered
      console.log("------", target.parentNode.parentNode.querySelector(".index_num").innerHTML)
      let taskData = taskList.find((item) => {
        return Number(item.id) === Number(target.parentNode.parentNode.querySelector(".index_num").innerHTML)
      })
      console.log(taskData)
      console.log("confirm", rows)
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
      target.parentNode.parentNode.style.display = "none" // Conceal the form
      concealCard.style.display = "block" // display the card
      let temp2 = target.parentNode.parentNode.parentNode.parentNode
      console.log(temp2.children[temp2.children.length - 1])
      if (isNewFlag) {
        let temp3 = addCard.cloneNode(true)
        temp2.children[temp2.children.length - 1].parentNode.appendChild(temp3)
      }
    }
  } else if (target.className === "plus") {
    // Add a new card after clicking the "+ Add Task" button
    console.log(target)
    var cloneCardDiv = singleEle.cloneNode(true)
    target.closest("#dragZone").appendChild(cloneCardDiv)
    target.parentNode.parentNode.remove()
    cardIndex++
    cloneCardDiv.querySelector(".index_num").innerHTML = cardIndex
    let newestForm = cloneCardDiv.children[0]
    newestForm.reset()
    newestForm.style.display = "flex"
    let newestCard = cloneCardDiv.children[1]
    newestCard.style.display = "none"
    doubleClick(cloneCardDiv.querySelector(".conceal_Card"))
  } else if (target.id === "task_Edit") {
    // edit the card
    console.log(target.parentNode.parentNode.parentNode)
    target.parentNode.parentNode.parentNode.parentNode.style.display = "none"
    target.parentNode.parentNode.parentNode.parentNode.parentNode.children[2].style.display = "none"
    target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].style.display = "flex"
  } else if (target.id === "task_Delete") {
    // delete the card(using the for loop to find the matched card)
    console.log("------", target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].querySelector(".index_num").innerHTML)
    let delId = target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].querySelector(".index_num").innerHTML
    for (let k = 0; k < taskList.length; k++) {
      if (Number(taskList[k].id) === Number(delId)) {
        taskList = [...taskList.slice(0, k), ...taskList.slice(k + 1, taskList.length)]
        for (let i = 0; i < rows.length; i++) {
          if (Number(rows[i].rowNum) === Number(taskList[k].rowNum)) {
            for (let j = 0; j < rows[i].data.length; j++) {
              if (Number(rows[i].data[j].id) === Number(delId)) {
                rows[i].data.splice(j, 1)
                break
              }
            }
          }
          break
        }
        console.log(rows)
        break
      }
    }

    console.log(taskList)
    localStorage.setItem("taskList", JSON.stringify(taskList))

    target.closest(".card_Individual_Elements").remove()
  } else if (target.id === "ellipse") {
    // Card editing menu
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
  }
})

// Hide card edit/delete operations by global clicking
document.addEventListener("click", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  if (target.id === "ellipse") {
    return ""
  } else {
    let dropDowns = document.querySelectorAll(".drop_Down")
    dropDowns.forEach((item) => {
      item.style.display = "none"
    })
  }
})

/*
 * Double-click events for cards
 * Pass parameters to the task page when the card is double-clicked
 * begin
 */

// Double click card event
console.log(document.querySelectorAll(".conceal_Card"))
document.querySelectorAll(".conceal_Card").forEach((item) => {
  doubleClick(item)
})

// assign the double click event to each card after the page loaded
function doubleClick(item) {
  item.addEventListener("dblclick", function (e) {
    // let ev = e || event
    // let target = ev.target || ev.srcElement
    // console.log(target)
    console.log(item.parentNode.querySelector(".index_num").innerHTML)
    const id = item.parentNode.querySelector(".index_num").innerHTML
    location.replace(`task.html?id=${id}`)
  })
}

/*
 * Card double click event
 * end
 */

// event of the card title, storing the title of each column in localStorage => rowTitle function
document.querySelectorAll(".card_Column_Name").forEach((item) => {
  rowTitle(item.querySelector("h3"))
})
function rowTitle(item) {
  item.addEventListener("blur", function () {
    console.log("rowTitle", item.innerHTML, item.parentNode.querySelector(".card_num").innerHTML)
    for (let i = 0; i < titleList.length; i++) {
      if (Number(titleList[i].rowNum) === Number(item.parentNode.querySelector(".card_num").innerHTML)) {
        titleList[i].title = item.innerHTML
        break
      }
    }
    console.log(titleList)
    localStorage.setItem("titles", JSON.stringify(titleList))
  })
}

// Add a new column with some initialization actions for adding events such as drag/double click etc
newBoard.addEventListener("click", function (event) {
  var newColumn = cardColumnCopy.cloneNode(true)
  // When adding a column, plus one to both card index and column index
  cardIndex++
  newColumn.querySelector(".index_num").innerHTML = cardIndex
  rowIndex++
  console.log(rowIndex)
  newColumn.querySelector(".card_num").innerHTML = rowIndex

  // drag event and double click event initialize
  doubleClick(newColumn.querySelector(".conceal_Card"))
  rowTitle(newColumn.querySelector("h3"))
  newColumn.addEventListener("dragover", dragOver)
  newColumn.addEventListener("dragenter", dragEnter)
  newColumn.addEventListener("dragleave", dragLeave)
  newColumn.addEventListener("drop", dragDrop)

  titleList.push({
    rowNum: rowIndex,
    title: newColumn.querySelector("h3").innerHTML,
  })
  rows.push({
    rowNum: rowIndex,
    data: [],
  })
  console.log("titleList", titleList)
  localStorage.setItem("titles", JSON.stringify(titleList))
  newColumn.style.display = "block"
  noWrap.insertBefore(newColumn, newBoard)
})

/*
 * Dragging and dropping function
 * The focus here is on handling the dragDrop and dragEnter events
 * the dragStart event gets the drag object for later operation
 * The dragEnter event indicates some card effects during the dragging process, such as showing the drag preview and other processing, including some data movement logic implementation.
 * dragDrop event means that the dragging is done, and the data after the dragging can be processed and stored to localStorage.
 * begin
 */

//drag function
function insertAfter(newNode, curNode) {
  curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling)
}
let dragged = null
let oldTarget = null
let dragTarget = null
noWrap.addEventListener("dragstart", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  // var dragTask = target.cloneNode(true)
  console.log(target)
  dragged = target
  console.log("----------", target, dragged.closest("#dragZone"))
  oldTarget = dragged.closest("#dragZone")
  target.style.opacity = 0.5
})

noWrap.addEventListener("dragend", function (e) {
  e.target.style.opacity = 1
})

let cardColumnAll = noWrap.querySelectorAll(".card_Column")
console.log(cardColumnAll)
cardColumnAll.forEach((item) => {
  item.addEventListener("dragover", dragOver)
  item.addEventListener("dragenter", dragEnter)
  item.addEventListener("dragleave", dragLeave)
  item.addEventListener("drop", dragDrop)
})

function dragDrop() {
  console.log("dragDrop", oldTarget, dragTarget.closest("#dragZone"))
  let newTarget = dragTarget.closest("#dragZone")
  function getTask(id, name, year, month, day, hours, minutes, priority, status, rowNum, datas) {
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
      rowNum: rowNum,
      datas: datas,
    }
    return newTask
  }
  // Update localStorage data based on the moved data
  function updateDatas(targetNode) {
    let temp = []
    let num = Number(targetNode.querySelector(".card_num").innerHTML)
    let targetDatas = targetNode.querySelectorAll(".card_Form")
    console.log("updateDatas", num, targetDatas)
    targetDatas.forEach((item) => {
      let taskName = item.querySelector("#Task")
      let dueDate = item.querySelector("#Date")
      let estimateHour = item.querySelector("#Hour")
      let estimateMin = item.querySelector("#Minute")
      let priority = item.querySelector("#Priority")
      let status = item.querySelector("#Status")
      id = item.querySelector(".index_num").innerHTML
      let datas = null
      for (let j = 0; j < taskList.length; j++) {
        if (Number(taskList[j].id) === Number(id)) {
          // console.log("is????")
          datas = taskList[j].datas
          // taskList[j] = newTask
          break
        }
      }
      if (taskName.value && dueDate.value && estimateHour.value && estimateMin.value && priority.value && status.value != "") {
        // ev.preventDefault()
        let due = getDateValue(dueDate)
        // console.log(dueDate.value)
        let year = due[0]
        let month = due[1]
        let day = due[2]
        // Updating data to localStorage for dragged cards(remove the card from the drastart column and add it to the drag tartget column)
        let tempTask = getTask(
          Number(item.querySelector(".index_num").innerHTML),
          taskName.value,
          year,
          month,
          day,
          estimateHour.value,
          estimateMin.value,
          priority.value,
          status.value,
          num,
          datas
        )
        // console.log(tempTask)
        temp.push(tempTask)
      }
    })
    console.log(temp)
    console.log(rows, "?????")
    for (let i = 0; i < rows.length; i++) {
      if (Number(rows[i].rowNum) === num) {
        rows[i].data = temp
        break
      }
    }
  }
  updateDatas(oldTarget)
  updateDatas(newTarget)
  console.log("rows", rows)
  let tempList = rowsToList(rows)
  console.log(tempList)
  localStorage.setItem("taskList", JSON.stringify(tempList))
}

function dragOver(e) {
  e.preventDefault()
  // console.log("dragOver")
}

function dragEnter(e) {
  if (e.target.closest(".card_Individual_Elements")) {
    console.log(
      "dragEnter?",
      e.target.closest(".card_Individual_Elements").querySelector(".index_num").innerHTML,
      e.target.closest("#dragZone").querySelector(".card_num").innerHTML
    )
    dragTarget = e.target.closest(".card_Individual_Elements")
    insertAfter(dragged, dragTarget)
  } else {
    console.log("dragEnter?", "title", e.target)
    if (e.target.className === "card_Column copy") {
      insertAfter(dragged, e.target.querySelector(".card_Column_Name"))
    }
  }
}

function dragLeave(e) {
  console.log("dragLeave!", e.target.closest(".card_Column"))
}

/*
 * drag function end
 */
