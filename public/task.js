var taskList = JSON.parse(localStorage.getItem("taskList")) || [] // card data

let intervalTimes = 1
// obtain the card according the index number 
let params = location.search
  .slice(1, location.search.length)
  .split("&")
  .map((item) => {
    return item.split("=")
  })

let taskData = null
for (let i = 0; i < taskList.length; i++) {
  if (Number(taskList[i].id) === Number(params[0][1])) {
    taskData = taskList[i]
    break
  }
}
console.log(params[0][1], taskData)

let stepList = taskData.datas.stepList // subtask steps data
let linkList = taskData.datas.linkList // reading list link information data

let linkIsNew = true
let linkEditIndex = -1
let stepIsNew = true

if (linkList.length === 0) {
  linkList.push({
    num: 0,
    title: "Reference Articles",
    data: [],
  })
  // localStorage.setItem("linkList", JSON.stringify(linkList))
  localStorage.setItem("taskList", JSON.stringify(taskList))
}
initLinkWrap()

let addSubtasksButton = document.querySelector(".add_Subtasks_Button")
let addSubtasks = document.querySelector(".add_Subtasks")
let stepCard = document.querySelector(".subtask_Circle")
let referenceList = document.querySelectorAll(".reference_List")

console.log("task begin", taskList)

/*
 * Card data acquisition and initialisation
 * begin
 */

// Change the title of the task page
document.querySelector(".title").querySelector("h2").innerHTML = taskData.name

// Set time
duration = 25 * 60
console.log(duration)

let timeCountDown = document.querySelector(".countdown")
// Time: convert the Total minutes into minutes: seconds
function formateTime(times) {
  let minutes = Math.floor(times / 60)
  let seconds = Number(times % 60)
  return {
    minutes,
    seconds,
  }
}

// Time rendering
function changeTime(arg) {
  let temp = formateTime(arg)
  console.log(temp)
  timeCountDown.innerHTML = `${String(temp.minutes).length < 2 ? "0" + temp.minutes : temp.minutes}:${
    String(temp.seconds).length < 2 ? "0" + temp.seconds : temp.seconds
  }`
}
changeTime(duration)

/*
 * Card data acquisition and initialisation
 * end
 */

/*
 * Timer
 * begin
 */
let time = null
// let timePause = true

document.querySelector("#start_time").addEventListener("click", function () {
  if (duration === 0) {
    return
  }
  // When the timer starts, it counts down and then automatically moves on to the next pomodoro stage when run out of time.
  if (!time) {
    document.querySelector("#start_time").classList.remove("icon-bofang")
    document.querySelector("#start_time").classList.add("icon-zanting")
    time = setInterval(function () {
      if (duration === 0) {
        alert("time out")
        clearInterval(time)
        time = null
        document.querySelector("#reset_time").click()
        return
      }
      duration--
      changeTime(duration)
    }, 1000)
  } else {
    clearInterval(time)
    document.querySelector("#start_time").classList.add("icon-bofang")
    document.querySelector("#start_time").classList.remove("icon-zanting")
    time = null
  }
})

// the event after clicking on the "skip" icon 
document.querySelector("#reset_time").addEventListener("click", function () {
  intervalTimes++
  if (intervalTimes % (settingTime.interval * 2 + 2) === 0) {
    console.log("long break")
    document.querySelector("button[data-time='long_break']").click()
  } else if (intervalTimes % 2 === 1) {
    console.log("study")
    document.querySelector("button[data-time='study']").click()
  } else {
    console.log("short break")
    document.querySelector("button[data-time='short_break']").click()
  }
})

// study/short break/long break click events
document
  .querySelector(".timer_Buttons")
  .querySelectorAll("button")
  .forEach((item) => {
    item.onclick = function () {
      document
        .querySelector(".timer_Buttons")
        .querySelectorAll("button")
        .forEach((item2) => {
          item2.classList.remove("clicked")
        })
      item.classList.add("clicked")
      console.log(item.attributes["data-time"].value)
      duration = settingTime[item.attributes["data-time"].value] * 60
      changeTime(duration)
      clearInterval(time)
      document.querySelector("#start_time").classList.add("icon-bofang")
      document.querySelector("#start_time").classList.remove("icon-zanting")
      time = null
      document.querySelector("#start_time").click()
    }
  })

  // Setting events
let settingTime = {
  study: 25,
  short_break: 5,
  long_break: 15,
  interval: 4,
}

// study = 25 min
// short break = 5 min
// long break = 30 min
// interval = 4
let setting = document.querySelector(".time_setting")
document.querySelector(".timer_Middle").querySelector("i").onclick = function () {
  setting.style.display = "block"
  setting.querySelector("#study").value = settingTime.study
  setting.querySelector("#short_break").value = settingTime.short_break
  setting.querySelector("#long_break").value = settingTime.long_break
  setting.querySelector("#interval").value = settingTime.interval
}

setting.querySelector("#cancel").onclick = function () {
  setting.style.display = "none"
}
setting.querySelector("#save").onclick = function () {
  settingTime.study = Number(setting.querySelector("#study").value)
  settingTime.short_break = Number(setting.querySelector("#short_break").value)
  settingTime.long_break = Number(setting.querySelector("#long_break").value)
  settingTime.interval = Number(setting.querySelector("#interval").value)
  console.log(settingTime.study, settingTime.short_break, settingTime.long_break, settingTime.interval)
  setting.style.display = "none"
  intervalTimes = 1
  document.querySelector("button[data-time='study']").click()
  document.querySelector("#start_time").click()
}
/*
 * timer
 * end
 */

// step edit/delete
function initStepEditWrap() {
  document.querySelectorAll(".add_Subtasks > .task_step").forEach((item, index) => {
    // delete step event
    item.querySelector("#task_Delete").parentNode.onclick = function (e) {
      console.log(e.target.closest(".task_step"), index)
      stepList.splice(index, 1)
      // localStorage.setItem("stepList", JSON.stringify(stepList))
      localStorage.setItem("taskList", JSON.stringify(taskList))
      initStepCard()
      e.target.closest(".task_step").remove()
      initStepEditWrap()
    }

    // edit step event
    item.querySelector("#task_Edit").parentNode.onclick = function (e) {
      let newSubtask = document.createElement("li")
      newSubtask.classList.add("task_step")
      newSubtask.style.marginBottom = "5px"
      newSubtask.style.marginLeft = "20px"
      let input = document.createElement("input")
      input.type = "text"
      input.maxLength = "15"
      input.value = e.target.closest(".task_step").querySelector(".wrap").innerHTML
      // input.required=true;
      newSubtask.append(input)
      input.style.width = "80%"
      input.style.padding = "2px 4px"
      let submit = document.createElement("input")
      submit.type = "submit"
      submit.innerText = "Done"
      newSubtask.append(submit)
      submit.style.position = "absolute"
      submit.style.right = "8px"
      submit.value = "done"
      submit.onclick = function () {
        let inputValue = input.value
        if (inputValue.trim() === "") {
          return
        }
        // stepList.push(inputValue)
        stepList.splice(index, 1, inputValue)
        initStepCard()
        // localStorage.setItem("stepList", JSON.stringify(stepList))
        localStorage.setItem("taskList", JSON.stringify(taskList))
        if (stepList.length === 1) {
          initStepCard()
        }
        let subtaskName = document.createElement("span")
        subtaskName.innerHTML = inputValue
        subtaskName.style.display = "inline-block"
        subtaskName.style.width = "80%"
        subtaskName.style.position = "relative"
        subtaskName.style.top = "4px"
        subtaskName.setAttribute("class", "wrap")
        newSubtask.replaceChild(subtaskName, input)
        let newEdit = document.querySelector(".editWrap").cloneNode(true)
        newSubtask.replaceChild(newEdit, submit)
        // submit.style.display = "none"
        // submit.parentNode.insertBefore(newEdit, submit)
        newEdit.querySelector("#ellipse").onclick = function (e) {
          // let editTarget = e.target.closest(".link")
          newEdit.querySelector(".drop_Down").style.display = newEdit.querySelector(".drop_Down").style.display === "none" ? "block" : "none"
        }
      }

      addSubtasks.insertBefore(newSubtask, e.target.closest(".task_step"))
      e.target.closest(".task_step").remove()
    }
  })
}


// Showing and hiding the add subtask box
document.querySelector(".subtask_Icon").addEventListener("click", function (e) {
  // e.preventDefault()
  addSubtasks.style.display = addSubtasks.style.display === "none" ? "block" : "none"
})

/*
 * step initializagtion
 * begin
 */ 
// render the step data stored in the local storage on the page
function initStep() {
  if (stepList.length === 0) {
    return
  }
  stepList.forEach((value, index) => {
    console.log(value, index)
    let newSubtask = document.createElement("li")
    newSubtask.classList.add("task_step")
    newSubtask.style.marginBottom = "5px"
    newSubtask.style.marginLeft = "20px"
    let input = document.createElement("input")
    input.type = "text"
    input.maxLength = "15"
    // input.required=true;
    newSubtask.append(input)
    input.style.width = "80%"
    input.style.padding = "2px 4px"
    let submit = document.createElement("input")
    submit.type = "submit"
    submit.innerText = "Done"
    newSubtask.append(submit)
    submit.style.position = "absolute"
    submit.style.right = "8px"
    submit.value = "done"
    input.value = value
    let inputValue = input.value

    let subtaskName = document.createElement("span")
    subtaskName.innerHTML = inputValue
    subtaskName.style.display = "inline-block"
    subtaskName.style.width = "80%"
    subtaskName.style.position = "relative"
    subtaskName.style.top = "4px"
    subtaskName.setAttribute("class", "wrap")
    newSubtask.replaceChild(subtaskName, input)
    let newEdit = document.querySelector(".editWrap").cloneNode(true)
    newSubtask.replaceChild(newEdit, submit)
    newEdit.querySelector("#ellipse").onclick = function (e) {
      newEdit.querySelector(".drop_Down").style.display = newEdit.querySelector(".drop_Down").style.display === "none" ? "block" : "none"
    }

    addSubtasks.insertBefore(newSubtask, addSubtasksButton)
  })
}
initStep()
initStepEditWrap()


// diplay the subtask by order on the big circle
function initStepCard() {
  if (stepList.length === 0) {
    stepCard.querySelector(".step_details").innerHTML = "Add subtasks first"
    return
  }
  stepCard.querySelector(".step_details").innerHTML = stepList[0]
}
initStepCard()

// complete button click event
document
  .querySelector(".subtask_Circle")
  .querySelector("button")
  .addEventListener("click", function () {
    console.log("stepCard click")

    if (stepList.length === 0) {
      alert("Please add steps first! (click on the icon next to the task name)")
      stepCard.querySelector(".step_details").innerHTML = "Add subtasks first"
      return
    }
    stepList.shift()
    localStorage.setItem("taskList", JSON.stringify(taskList))
    addSubtasks.querySelector("li").remove()
    stepCard.querySelector(".step_details").innerHTML = stepList[0] ? stepList[0] : "Add subtasks first"
  })

/*
 * step initialization
 * end
 */

// Adding step event
let subtasksArr = []
addSubtasksButton.addEventListener("click", function () {
  let newSubtask = document.createElement("li")
  newSubtask.classList.add("task_step")
  newSubtask.style.marginBottom = "5px"
  newSubtask.style.marginLeft = "20px"
  let input = document.createElement("input")
  input.type = "text"
  input.maxLength = "15"
  newSubtask.append(input)
  input.style.width = "80%"
  input.style.padding = "2px 4px"
  let submit = document.createElement("input")
  submit.type = "submit"
  submit.innerText = "Done"
  newSubtask.append(submit)
  submit.style.position = "absolute"
  submit.style.right = "8px"
  submit.value = "done"
  submit.addEventListener("click", function () {
    let inputValue = input.value
    if (inputValue.trim() === "") {
      return
    }
    stepList.push(inputValue)
    localStorage.setItem("taskList", JSON.stringify(taskList))
    if (stepList.length === 1) {
      initStepCard()
    }
    let subtaskName = document.createElement("span")
    subtaskName.innerHTML = inputValue
    subtaskName.style.display = "inline-block"
    subtaskName.style.width = "80%"
    subtaskName.style.position = "relative"
    subtaskName.style.top = "4px"
    subtaskName.setAttribute("class", "wrap")
    newSubtask.replaceChild(subtaskName, input)
    let newEdit = document.querySelector(".editWrap").cloneNode(true)
    newSubtask.replaceChild(newEdit, submit)
    newEdit.querySelector("#ellipse").onclick = function (e) {
      newEdit.querySelector(".drop_Down").style.display = newEdit.querySelector(".drop_Down").style.display === "none" ? "block" : "none"
    }
    initStepEditWrap()
  })
  addSubtasks.insertBefore(newSubtask, addSubtasksButton)
})

/****************** reading list page code below ********************/


/*
 * add Link switch (display the add link input form page when the user click on "Add Link" button and hide the task page)
 * begin
 */

let form = document.querySelector("form")
let addLinkWrap = document.querySelector(".add_link_wrap")

function insertAfter(newNode, curNode) {
  curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling)
}

let referenceListTarget = null

// initialize the reading list events(delete the category and add a new link)
function initReferenceList() {
  // delete the whole reading list category when clicking on the cross icon and update the data in local storage
  referenceList.forEach((item) => {
    item
      .querySelector(".ref_Top")
      .querySelector("i")
      .addEventListener("click", function () {
        let num = Number(item.querySelector(".link_num").innerHTML)
        for (let i = 0; i < linkList.length; i++) {
          if (linkList[i].num === num) {
            linkList.splice(i, 1)
            break
          }
        }
        localStorage.setItem("taskList", JSON.stringify(taskList))
        console.log(num)
        item.remove()
      })

    // switch the task page and add link form visibility between none and block
    item
      .querySelector(".add_Link")
      .querySelector("a")
      .addEventListener("click", function () {
        referenceListTarget = item
        form.reset()
        let taskWrap = document.querySelector("#task_content")
        console.log(taskWrap.style.display, addLinkWrap.style.display)
        taskWrap.style.display = taskWrap.style.display === "none" ? "block" : "none"
        addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"
        addLinkWrap.querySelector(".back").onclick = function () {
          taskWrap.style.display = taskWrap.style.display === "none" ? "block" : "none"
          addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"
        }
      })
  })
}
initReferenceList()

/*
 * add Link switch
 * end
 */


/*
 * add_link
 * begin
 */

// reference generation function
addLinkWrap.querySelector('#reference').addEventListener("click", function (e) {
  e.preventDefault()
  if (form.querySelector("#note").value.trim() === "" || form.querySelector("#URL").value.trim() === "") {
    return
  }
  let obj = {
    note: form.querySelector("#note").value.trim(),
    url: form.querySelector("#URL").value.trim(),
    title: form.querySelector("#title").value.trim(),
    author: {
      iname: form.querySelector("#iname").value.trim(),
      lname: form.querySelector("#lname").value.trim(),
    },
    year: form.querySelector("#year").value.trim(),
    web: form.querySelector("#webname").value.trim(),
  }
  alert(obj.author.lname+","+" "+obj.author.iname.charAt(0).toUpperCase()+". "+"("+obj.year+"). "+ obj.title+". "+obj.web+". "+ obj.url)
})

// Add a new link to the task page after the user presses the save button and save it to the local storage
addLinkWrap.querySelector("#linksave").addEventListener("click", function (e) {
  e.preventDefault()
  // console.log(document.querySelector("form"))

  if (form.querySelector("#note").value.trim() === "" || form.querySelector("#URL").value.trim() === "") {
    return
  }
  let obj = {
    note: form.querySelector("#note").value.trim(),
    url: form.querySelector("#URL").value.trim(),
    title: form.querySelector("#title").value.trim(),
    author: {
      iname: form.querySelector("#iname").value.trim(),
      lname: form.querySelector("#lname").value.trim(),
    },
    year: form.querySelector("#year").value.trim(),
    web: form.querySelector("#webname").value.trim(),
  }
  console.log(obj)
  console.log(Number(referenceListTarget.querySelector(".link_num").innerHTML), linkList)
  // add the new link to the category it belongs to
  for (let i = 0; i < linkList.length; i++) {
    if (linkList[i].num === Number(referenceListTarget.querySelector(".link_num").innerHTML)) {
      if (linkIsNew) {
        linkList[i].data.push(obj)
      } else {
        console.log(linkEditIndex)
        linkList[i].data.splice(linkEditIndex, 1, obj)
      }
      break
    }
  }
  // update the local storage data
  localStorage.setItem("taskList", JSON.stringify(taskList))
  // render the new list data
  let newNode = document.createElement("div")
  newNode.classList.add("link")
  let newLink = document.createElement("a")
  newLink.href = "http://" + obj.url
  newLink.target = "_blank"
  newLink.innerHTML = obj.note
  console.log(newLink.attributes["href"], newLink)
  let newEdit = document.querySelector(".editWrap").cloneNode(true)
  newEdit.querySelector("#ellipse").onclick = function (e) {
    let editTarget = e.target.closest(".link")
    editTarget.querySelector(".drop_Down").style.display = editTarget.querySelector(".drop_Down").style.display === "none" ? "block" : "none"
  }
  newNode.append(newLink)
  console.log(newNode)
  newNode.append(newEdit)
  if (linkIsNew) {
    referenceListTarget.insertBefore(newNode, referenceListTarget.querySelector(".add_Link"))
  } else {
    referenceListTarget.replaceChild(newNode, referenceListTarget.querySelectorAll(".link")[linkEditIndex])
  }
  document.querySelector("#task_content").style.display = document.querySelector("#task_content").style.display === "none" ? "block" : "none"
  addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"
  initEditWrap()
})

function addLink() {
  console.log("addLink")
}

/*
 * add_link
 * end
 */


/*
 * add a new link category
 * begin
 */
function newLinkWrap() {
  document.querySelector(".new_Category").addEventListener("click", function () {
    let newRefLinkWrap = document.querySelector(".copy").cloneNode(true)
    newRefLinkWrap.querySelector(".link_num").innerHTML = linkList[linkList.length - 1].num + 1
    newRefLinkWrap.classList.remove("copy")
    document.querySelector("#task_content").insertBefore(newRefLinkWrap, document.querySelector(".copy"))
    linkList.push({
      num: Number(newRefLinkWrap.querySelector(".link_num").innerHTML),
      title: newRefLinkWrap.querySelector("h3").innerHTML,
      data: [],
    })
    // update the local storage link category data
    localStorage.setItem("taskList", JSON.stringify(taskList))
    cateRowTitle(newRefLinkWrap.querySelector(".ref_Top"))
    // open all the links under the category when click on the "open all" button
    newRefLinkWrap.querySelector(".ref_Top").querySelector("a").onclick = function () {
      console.log("open all")
      newRefLinkWrap.querySelectorAll(".link").forEach((item3) => {
        item3.querySelector("a").click()
        console.log(item3.querySelector("a").href)
      })
    }
    // initialize the events for the new link category has just been generated 
    newRefLinkWrap
      .querySelector(".ref_Top")
      .querySelector("i")
      .addEventListener("click", function () {
        let num = Number(newRefLinkWrap.querySelector(".link_num").innerHTML)
        for (let i = 0; i < linkList.length; i++) {
          if (linkList[i].num === num) {
            linkList.splice(i, 1)
            break
          }
        }
        localStorage.setItem("taskList", JSON.stringify(taskList))
        console.log(num)
        newRefLinkWrap.remove()
      })

    newRefLinkWrap
      .querySelector(".add_Link")
      .querySelector("a")
      .addEventListener("click", function () {
        referenceListTarget = newRefLinkWrap
        form.reset()
        let taskWrap = document.querySelector("#task_content")
        console.log(taskWrap.style.display, addLinkWrap.style.display)
        taskWrap.style.display = taskWrap.style.display === "none" ? "block" : "none"
        addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"

        addLinkWrap.querySelector(".back").onclick = function () {
          taskWrap.style.display = taskWrap.style.display === "none" ? "block" : "none"
          addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"
        }
      })
  })
}
newLinkWrap()

/*
 * add a new link category
 * end
 */

// get the data from the local storage and render the reading list section on the task page
function initLinkWrap() {
  linkList.forEach((item) => {
    let newRefLinkWrap = document.querySelector(".copy").cloneNode(true)
    newRefLinkWrap.querySelector(".link_num").innerHTML = item.num
    newRefLinkWrap.querySelector("h3").innerHTML = item.title
    newRefLinkWrap.classList.remove("copy")
    item.data.forEach((item2) => {
      let newNode = document.createElement("div")
      // newNode.style.width = "100%"
      newNode.classList.add("link")
      let newLink = document.createElement("a")
      newLink.href = "http://" + item2.url
      newLink.target = "_blank"
      newLink.innerHTML = item2.note
      let newEdit = document.querySelector(".editWrap").cloneNode(true)
      newEdit.querySelector("#ellipse").onclick = function (e) {
        let editTarget = e.target.closest(".link")
        editTarget.querySelector(".drop_Down").style.display = editTarget.querySelector(".drop_Down").style.display === "none" ? "block" : "none"
      }
      newNode.append(newLink)
      newNode.append(newEdit)
      newRefLinkWrap.insertBefore(newNode, newRefLinkWrap.querySelector(".add_Link"))
    })

    newRefLinkWrap.querySelector(".ref_Top").querySelector("a").onclick = function () {
      console.log("open all")
      newRefLinkWrap.querySelectorAll(".link").forEach((item3) => {
        item3.querySelector("a").click()
        console.log(item3.querySelector("a").href)
      })
    }
    document.querySelector("#task_content").insertBefore(newRefLinkWrap, document.querySelector(".copy"))
  })
}

// link edit/delete
function initEditWrap() {
  document.querySelectorAll(".reference_List").forEach((item) => {
    // delete link event(the delete button in the ellipse)
    item.querySelectorAll("#task_Delete").forEach((item2, index) => {
      item2.parentNode.onclick = function (e) {
        console.log(e.target.closest(".link"), e.target.closest(".reference_List"), index)
        for (let i = 0; i < linkList.length; i++) {
          if (linkList[i].num === Number(e.target.closest(".reference_List").querySelector(".link_num").innerHTML)) {
            console.log(linkList[i].data)
            linkList[i].data.splice(index, 1)
            localStorage.setItem("taskList", JSON.stringify(taskList))
            break
          }
        }
        e.target.closest(".link").remove()
        initEditWrap()
      }
    })

    // edit link event(in the ellipse)
    item.querySelectorAll("#task_Edit").forEach((item2, index) => {
      item2.parentNode.onclick = function (e) {
        // e.preventDefault()
        referenceListTarget = e.target.closest(".reference_List")
        linkIsNew = false
        linkEditIndex = index
        form.reset()
        let taskWrap = document.querySelector("#task_content")
        console.log(taskWrap.style.display, addLinkWrap.style.display)
        // swtich page content
        taskWrap.style.display = taskWrap.style.display === "none" ? "block" : "none"
        addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"

        addLinkWrap.querySelector(".back").onclick = function () {
          taskWrap.style.display = taskWrap.style.display === "none" ? "block" : "none"
          addLinkWrap.style.display = addLinkWrap.style.display === "none" ? "block" : "none"
        }

        let datas = null
        for (let i = 0; i < linkList.length; i++) {
          if (linkList[i].num === Number(e.target.closest(".reference_List").querySelector(".link_num").innerHTML)) {
            console.log(linkList[i].data[index])
            datas = linkList[i].data[index]
            break
          }
        }
        // display the old data in the form
        console.log(e.target.closest(".reference_List"), datas)
        form.querySelector("#note").value = datas.note
        form.querySelector("#URL").value = datas.url
        form.querySelector("#title").value = datas.title
        form.querySelector("#year").value = datas.year
        form.querySelector("#webname").value = datas.web
        form.querySelector("#iname").value = datas.author.iname
        form.querySelector("#lname").value = datas.author.lname
        return
      }
    })
  })
}
initEditWrap()

// Hide the popup menu after global click
document.addEventListener("click", function (ev) {
  ev = ev || event
  var target = ev.target || ev.srcElement
  if (target.id === "ellipse") {
    return ""
  } else {
    let dropDowns = document.querySelectorAll(".drop_Down")
    dropDowns.forEach((item) => {
      // console.log(item)
      item.style.display = "none"
    })
  }
})

// When the category title is changed, the corresponding localStorage title data will be changed
document.querySelectorAll(".ref_Top").forEach((item) => {
  cateRowTitle(item)
})
function cateRowTitle(item) {
  let cateTitle = item.querySelector("h3")
  cateTitle.addEventListener("blur", function () {
    console.log("cateTitle", cateTitle.innerHTML, item.querySelector(".link_num").innerHTML)
    for (let i = 0; i < linkList.length; i++) {
      if (Number(linkList[i].num) === Number(item.querySelector(".link_num").innerHTML)) {
        linkList[i].title = cateTitle.innerHTML
        break
      }
    }
    console.log(linkList)
    // localStorage.setItem("linkList", JSON.stringify(linkList))
    localStorage.setItem("taskList", JSON.stringify(taskList))
  })
}