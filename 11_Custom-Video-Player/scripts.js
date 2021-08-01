/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenBtn = player.querySelector(".screen__button");
const iconBtn = player.querySelector(".icon__button");

/* Build out functions */

// 影片播放或暫停
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

//依據影片播放或暫停去改變icon ui
function updateButton() {
  const icon = this.paused
    ? ` <i class="fas fa-play"></i>`
    : `<i class="fas fa-pause"></i>`;
  toggle.innerHTML = icon;

  const iconVideo = this.paused ? ` <i class="fas fa-play"></i>` : ``;
  iconBtn.innerHTML = iconVideo;
}

//快進及快退， 讓video的curentTime =+ data-skip 的時間
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//video 的 volume 及 playbackRate 的值進行修改
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//進度條ui及顏色調整
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  progressBar.style.background = "#ff0000";
}

//更改影片播放位置
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//request fullscreen
function fullscreen() {
  video.requestFullscreen();
}

/* Hook up the event listeners */

//針對影片播放暫停做處理
video.addEventListener("click", togglePlay); //點擊影片執行togglePlay
toggle.addEventListener("click", togglePlay); //下方toggle點擊執行togglePlay
video.addEventListener("play", updateButton); //監聽影片播放執行按鈕畫面
video.addEventListener("pause", updateButton); //監聽影片暫停執行按鈕畫面

//當影片current time 有更新時，則出發timeupdate事件，進行進度條ui呈現
video.addEventListener("timeupdate", handleProgress);

//針對快進/慢進做處理
skipButtons.forEach((button) => button.addEventListener("click", skip));

//針對音量、速度滑動條進行處理
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

//針對進度條做處理，按著滑鼠 mousedown 時是 true,放開滑鼠 mouseup 則為 false
let mousedown = false;
progress.addEventListener("click", scrub); //點擊進行條執行scrub
progress.addEventListener("mousemove", (e) => mousedown && scrub(e)); //如果mousedown=true，則執行scrub
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

//針對全螢幕做處理
fullscreenBtn.addEventListener("click", fullscreen);
