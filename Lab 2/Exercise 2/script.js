const audio = document.getElementById("myAudio");
const video = document.getElementById("myVideo");
const audioTimeDisplay = document.getElementById("audioTime");
const videoTimeDisplay = document.getElementById("videoTime");

audio.ontimeupdate = function() {
    audioTimeDisplay.innerText = Math.floor(audio.currentTime);
};

video.ontimeupdate = function() {
    videoTimeDisplay.innerText = Math.floor(video.currentTime);
};