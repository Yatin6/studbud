let submit = document.querySelectorAll(".submit")
let tasks = document.querySelector("#tasks")
let newTask = document.querySelectorAll(".add_Task")
let newBoard = document.querySelector("#add_Board")
let singleEle = document.querySelector(".copy .card_Individual_Elements")
let cardColumnCopy = document.querySelector(".copy")
let noWrap = document.querySelector("#no_Wrap")
let addCard = document.querySelector(".conceal_Add_copy")
var taskList = JSON.parse(localStorage.getItem("taskList")) || [] // Card information data
let titleList = JSON.parse(localStorage.getItem("titles")) || [] // 标题数据
let rows = [] // 卡片映射数据 => 已处理后的数据

// seperae the data from the date input
function getDateValue(elements) {
  return elements.value.split("-")
}
let dropDownFlag = "none"
let dropDownTarget = null

/*page initialize
 * 本块负责对页面加载时从localStorage中获取卡片储存数据并进行渲染，达到页面刷新卡片数据不丢失的效果
 * begin
 * */
// 初始化卡片唯一标识id
let indexNum = localStorage.getItem("index") || 0
localStorage.setItem("index", indexNum)
let cardIndex = Number(localStorage.getItem("index"))


initRow()
// 初始化每一列的num
localStorage.setItem("card", localStorage.getItem("card") || 0)
let rowIndex = Number(localStorage.getItem("card"))

// 全局函数：添加卡片，同时将数据存储至localStorage
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
  // console.log(rowsToList(rows))
  localStorage.setItem("taskList", JSON.stringify(taskList))
}

// 卡片数据更改，同时对localStorage数据进行修改
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

// 初始化函数 => 将得到的数据进行卡片渲染，生成前端卡片（一列中的数据）
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

  // newColumn.children[taskDatas.length].querySelector(".conceal_Add").style.display = "block"
  let newAddCard = addCard.cloneNode(true)
  newColumn.appendChild(newAddCard)
}

// initCards()

// 初始化每一列数据：初始化逻辑为对每一列执行一个initCard函数，调用一次initCard函数就生成一列的卡片，
// 所以后面会根据列的数量循环调用initCard函数
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
  console.log(rowTemp, "rows", mapTemp)
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

/*page initialize end */

// 全局函数，rows为卡片与列的映射关系（二维数组），需将rows转化为一维数组形式才可存储至localStorage
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

// click event
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
    // 卡片输入数据确定，生成卡片
    console.log(target)
    let concealCard = targetInfo.parentNode.children[1]
    console.log(concealCard)
    console.log("-----", targetInfo.querySelector(".index_num"))

    // todo: 得到卡片所在组的cardId
    console.log("cardId", targetInfo.parentNode.parentNode.querySelector(".card_num").innerHTML)
    // return
    let rowNum = Number(targetInfo.parentNode.parentNode.querySelector(".card_num").innerHTML)

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
      // localStorage.setItem("card", rowNum)
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
          status.value,
          rowNum
        )
      }

      console.log(taskList)
      // 找到编辑对应的储存数据
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
      target.parentNode.parentNode.style.display = "none" // 表单隐藏
      concealCard.style.display = "block" // 卡片显示
      // target.parentNode.parentNode.parentNode.children[2].style.display = "block" // 卡片添加显示
      let temp2 = target.parentNode.parentNode.parentNode.parentNode
      console.log(temp2.children[temp2.children.length - 1])
      // temp2.children[temp2.children.length - 1].children[2].style.display = "block" // 卡片添加显示2
      if (isNewFlag) {
        let temp3 = addCard.cloneNode(true)
        temp2.children[temp2.children.length - 1].parentNode.appendChild(temp3)
      }
    }
  } else if (target.className === "plus") {
    // 添加新的卡片
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
    // 卡片编辑
    console.log(target.parentNode.parentNode.parentNode)
    // return
    target.parentNode.parentNode.parentNode.parentNode.style.display = "none"
    target.parentNode.parentNode.parentNode.parentNode.parentNode.children[2].style.display = "none"
    target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].style.display = "flex"
  } else if (target.id === "task_Delete") {
    // 卡片删除
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
    // 卡片编辑菜单？
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

// 全局点击后隐藏卡片edit/delete操作
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

/*****
 * 卡片的双击事件
 * 为卡片双击时能讲参数传给task页面做准备
 * begin
 * */
// 双击卡片事件
console.log(document.querySelectorAll(".conceal_Card"))
document.querySelectorAll(".conceal_Card").forEach((item) => {
  doubleClick(item)
})

// 初始化双击事件
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

/****
 * 卡片双击事件
 * end
 * */

// 卡片标题事件，将每一列的标题存储至localStorage中 => rowTitle函数
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

// 添加新的一列，其中包括了一些初始化操作，需要为其添加拖拽/双击等事件
newBoard.addEventListener("click", function (event) {
  var newColumn = cardColumnCopy.cloneNode(true)
  // 添加一列时，需要将其中的卡片num(对应id)进行更改 => +1
  cardIndex++
  newColumn.querySelector(".index_num").innerHTML = cardIndex
  rowIndex++
  console.log(rowIndex)
  newColumn.querySelector(".card_num").innerHTML = rowIndex

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

/****
 * 拖拽
 * 这里面重点便是dragDrop和dragEnter两个事件的处理
 * dragStart事件可以获取到拖拽对象，供后面操作
 * dragEnter事件表示拖拽过程中的一些卡片效果，例如展示拖拽预览之类的处理，包括一些数据的移动逻辑实现
 * dragDrop事件触发时表示拖拽已完成，可以将拖拽之后的数据进行处理后将其存储至localStorage
 * 结合其他拖拽事件便可实现卡片的拖拽功能，其中包括一些细节方面的处理，就不一一展开讲解了
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
  // 根据移动后的数据更新localStorage数据
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
        // 新卡片时添加数据至localStorage
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
