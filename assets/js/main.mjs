let milisec = 0;
let sec = 0;
let min = 0;
let hour = 0;

let display = document.getElementById("displayTimer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const lapButton = document.getElementById("lap");
let lapDisplay = document.getElementById("lapDisplay");

let isStart = false;
let timer;
let laps = [];

const displayButton = () => {
  startButton.classList.remove("initial");
};

const start = () => {
  if (!isStart) {
    startButton.innerHTML = '<i class="ri-pause-fill"></i>';
    startButton.style.padding = "7.5px 4px 3px 6px";
    lapButton.classList.remove('hidden')
    stopButton.classList.add('hidden')
    timer = setInterval(play, 10);
    isStart = true;
  } else {
    startButton.innerHTML = '<i class="ri-play-fill"></i>';
    startButton.style.padding = "7.5px 4px 3px 9px";
    stopButton.classList.remove("hidden");
    lapButton.classList.add('hidden')
    clearInterval(timer);
    isStart = false;
  }
  displayButton();
};
startButton.addEventListener("click", start);

const stop = () => {
  clearInterval(timer);
  lapDisplay.style.display = "none";
  display.style.fontSize = "5rem";
  lapButton.classList.add("hidden");
  stopButton.classList.add("hidden");
  startButton.classList.add("initial");
  startButton.innerHTML = '<i class="ri-play-fill"></i>';
  display.innerHTML = "00:00:00";
  laps = [];
  lapDisplay.innerHTML = "";
};
stopButton.addEventListener("click", stop);

const lap = () => {

    lapDisplay.style.display = "block";
    display.style.fontSize = "2rem";

  let currentTime = {
    hour: hour,
    min: min,
    sec: sec,
    milisec: milisec,
  };
  laps.push(currentTime);

  let lapTime;
  let intervalDiff;

  if (laps.length > 1) {
    let prevLap = laps[laps.length - 2];
    intervalDiff = calculateLapTime(prevLap, currentTime);
    lapTime = watch(currentTime);
  } else {
    intervalDiff = watch(currentTime);
    lapTime = intervalDiff;
  }

  let lapNumber = laps.length;

  let li = document.createElement("li");
  li.className = "lap-items";

  let spanLapNumber = document.createElement("span");
  spanLapNumber.className = "lapNumber";
  spanLapNumber.textContent = lapNumber > 9 ? lapNumber : `0${lapNumber}`;
  li.appendChild(spanLapNumber);

  let spanIntervalDiff = document.createElement("span");
  spanIntervalDiff.className = "lapInterval";
  spanIntervalDiff.textContent = `+ ${intervalDiff}`;
  li.appendChild(spanIntervalDiff);

  let spanLapTime = document.createElement("span");
  spanLapTime.className = "lapTime";
  spanLapTime.textContent = lapTime;
  li.appendChild(spanLapTime);

  lapDisplay.insertBefore(li, lapDisplay.firstChild);
  lapDisplay.scrollTop = 0;
  
};
lapButton.addEventListener("click", lap);

const calculateLapTime = (prev, current) => {
  let hourDiff = current.hour - prev.hour;
  let minDiff = current.min - prev.min;
  let secDiff = current.sec - prev.sec;
  let milisecDiff = current.milisec - prev.milisec;

  if (milisecDiff < 0) {
    milisecDiff += 100;
    secDiff -= 1;
  }
  if (secDiff < 0) {
    secDiff += 60;
    minDiff -= 1;
  }
  if (minDiff < 0) {
    minDiff += 60;
    hourDiff -= 1;
  }

  return (
    (hourDiff < 10 ? "0" + hourDiff : hourDiff) +
    ":" +
    (minDiff < 10 ? "0" + minDiff : minDiff) +
    ":" +
    (secDiff < 10 ? "0" + secDiff : secDiff) +
    "." +
    (milisecDiff < 10 ? "0" + milisecDiff : milisecDiff)
  );
};

const play = () => {
  display.innerHTML = watch();
  milisec++;
  if (milisec === 100) {
    milisec = 0;
    sec++;
  }
  if (sec === 60) {
    sec = 0;
    min++;
  }
  if (min === 60) {
    min = 0;
    hour++;
  }
};

const watch = (time) => {
  let h = time ? time.hour : hour;
  let m = time ? time.min : min;
  let s = time ? time.sec : sec;
  let ms = time ? time.milisec : milisec;

  return (
    (h < 10 ? "0" + h : h) +
    ":" +
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s) +
    "." +
    (ms < 10 ? "0" + ms : ms)
  );
};
