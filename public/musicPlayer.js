let songSource = document.querySelectorAll(".song_Source")
console.log(songSource)
let progress = document.getElementById("progress")
let playBtn = document.getElementById("playBtn")
let lastBtn = document.getElementById("lastBtn")
let nextBtn = document.getElementById("nextBtn")
let playTitle = document.getElementById("playTitle")
let songTitles = [
    'Justin Timberlake - Five hundred miles',
    'Tycho - Epoch',
    'Emancipator - Nevergreen'
]
playTitle.innerHTML = songTitles[0]

let index = 0
let currentSong = songSource[index]
nextBtn.addEventListener("click", nextSong)
function nextSong() {
    console.log("下一首之前", currentSong)
    currentSong.pause() // 将点击下一首时播放的歌曲暂停
    currentSong.currentTime = 0 // 重置歌曲时间为0
    index += 1
    // console.log(index, songSource.length)
    // if(index==songSource.length-1){
    //     index=0;
    // }
    if (index === songSource.length) {
        index = 0
    }
    // console.log(index)
    currentSong = songSource[index]
    console.log("下一首之后", currentSong)
    playTitle.innerHTML = songTitles[index]
    currentSong.play()
    playBtn.classList.remove("icon-bofang")
    playBtn.classList.add("icon-zanting")
    return 0
}

lastBtn.addEventListener("click", lastSong)

function lastSong() {
    console.log("上一首之前", currentSong)
    currentSong.pause() // 将点击上一首时播放的歌曲暂停
    currentSong.currentTime = 0 // 重置歌曲时间为0
    index -= 1

    if (index === -1) {
        index = songSource.length - 1
    }
    // console.log(index)
    currentSong = songSource[index]
    console.log("上一首之后", currentSong)
    playTitle.innerHTML = songTitles[index]
    currentSong.play()
    playBtn.classList.remove("icon-bofang")
    playBtn.classList.add("icon-zanting")
    return 0
}

playBtn.addEventListener("click", playpauseSwitch)

// currentSong.onplay = function () {
//   playBtn.classList.remove("icon-bofang")
//   playBtn.classList.add("icon-zanting")
// }

// currentSong.onpause = function () {
//   playBtn.classList.add("icon-bofang")
//   playBtn.classList.remove("icon-zanting")
// }

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

function timeFormat(currentTime) {
    minutes = Math.floor(currentTime / 60)
    seconds = Math.floor(currentTime % 60)
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    return minutes + ":" + seconds
}
