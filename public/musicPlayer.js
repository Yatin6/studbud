let songSource = document.querySelectorAll(".song_Source")
let progress = document.getElementById("progress")
let playBtn = document.getElementById("playBtn")
let lastBtn = document.getElementById("lastBtn")
let nextBtn = document.getElementById("nextBtn")
let playTitle = document.getElementById("playTitle")
let songTitles = ["Justin Timberlake - Five hundred miles", "Tycho - Epoch", "Emancipator - Nevergreen"]

//initialize the first song's name and index to 0
playTitle.innerHTML = songTitles[0]
let index = 0
let currentSong = songSource[index]

// the user click on the "next" icon
nextBtn.addEventListener("click", nextSong)
function nextSong() {
  currentSong.pause() // pause the current song when skip to the next song
  currentSong.currentTime = 0 // set the next song's starting time to 0
  index += 1 //point to the next song
  if (index === songSource.length) { //point to the first song if the current song is the last song
    index = 0
  }
  currentSong = songSource[index]  //update the current song
  playTitle.innerHTML = songTitles[index] //update the current song's name
  currentSong.play()
  playBtn.classList.remove("icon-bofang") //replace the "play" button in the middle with "pause" as the song is playing now
  playBtn.classList.add("icon-zanting")
  return 0
}

// the user click on the "last" icon
lastBtn.addEventListener("click", lastSong)
function lastSong() {
  currentSong.pause() // pause the current song when go back to the last song
  currentSong.currentTime = 0 // set the next song's starting time to 0
  index -= 1  //point to the last song

  if (index === -1) {   //point to the last song if the current song is the first song
    index = songSource.length - 1
  }
  currentSong = songSource[index]  //update the current song
  playTitle.innerHTML = songTitles[index]  //update the current song's name
  currentSong.play()
  playBtn.classList.remove("icon-bofang")  //replace the "play" button in the middle with "pause" as the song is playing now
  playBtn.classList.add("icon-zanting")
  return 0
}

// the user click on the "pause" icon
playBtn.addEventListener("click", playpauseSwitch)
//pause the song if the song is playing, play the song if the song is pausing, and switch the icon icon between "pause" and "play" 
function playpauseSwitch() {
  if (currentSong.paused) {
    currentSong.play()
    playBtn.classList.remove("icon-bofang")
    playBtn.classList.add("icon-zanting")
  } else {
    currentSong.pause()
    playBtn.classList.add("icon-bofang")
    playBtn.classList.remove("icon-zanting")
  }
}

// set the progress bar, make it align with the time elpase
for (let i = 0; i < songSource.length; i++) {
  let currentSong = songSource[i]
  currentSong.ontimeupdate = function () {
    let currentTime = currentSong.currentTime
    current.innerHTML = timeFormat(currentTime)
    let duration = currentSong.duration
    prog = (currentTime * 100) / duration
    progress.style.setProperty("--progress", prog + "%")
  }
}

// display the time in miniute and second
function timeFormat(currentTime) {
  minutes = Math.floor(currentTime / 60)
  seconds = Math.floor(currentTime % 60)
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  return minutes + ":" + seconds
}
