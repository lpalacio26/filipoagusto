// Function to play audio from Git repository
function playAudio(audioSrc, audioName) {
  const audioPlayer = document.getElementById("audioPlayer");
  document.getElementById("audioTitle").innerHTML =
    "now playing... <br>" + audioName;

  // Set the source of the audio player to the provided URL
  audioPlayer.src = audioSrc;
  playPauseButton.innerHTML = "&#10074;&#10074;"; // Pause symbol


  // Play the audio
  audioPlayer.play();
  typeWriter("now playing . . .<br>" + audioName, "audioTitle");
}




// Function to pause audio
function pauseAudio() {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.pause();
}

// JavaScript for music player

// Get references to elements
const audioPlayer = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const volumeControl = document.getElementById("volumeControl");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

// Play/pause functionality
playPauseButton.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;"; // Pause symbol
  } else {
    audioPlayer.pause();
    playPauseButton.innerHTML = "&#9658;"; // Play symbol
  }
});

// Update volume
volumeControl.addEventListener("input", function () {
  audioPlayer.volume = volumeControl.value / 100;
});

// Update progress bar
audioPlayer.addEventListener("timeupdate", function () {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
  if (audioPlayer.currentTime == audioPlayer.duration) {
    playPauseButton.innerHTML = "&#9658;"; // Play symbol
  }

  // Update current time and duration
  currentTime.textContent = formatTime(audioPlayer.currentTime);
  duration.textContent = formatTime(audioPlayer.duration);
});

// Format time (mm:ss)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Update audio position on progress bar click
progressBar.addEventListener("click", function (e) {
  const progressWidth = this.offsetWidth;
  const clickX = e.offsetX;
  const percent = clickX / progressWidth;
  const newTime = percent * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
});
