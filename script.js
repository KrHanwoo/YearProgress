const $ = (id) => document.getElementById(id);

const win = $('window');
const header = $('header');
const headerTitle = $('header-title');
const textPercentage = $('text-percentage');
const progressBar = $('progress-bar');

let pos = [0, 0, 0, 0];
let visible = false;
let innerFocus = false;
let initial = true;
let rawPercentage;

(async () => {
  let fromYear = $('from-year');
  let toYear = $('to-year');
  let yearNow = new Date().getFullYear();
  let yearThen = yearNow + 1;
  fromYear.textContent = `${yearNow}년`;
  fromYear.href = `https://namu.wiki/w/${yearNow}%EB%85%84`;
  toYear.textContent = `${yearThen}년`;
  toYear.href = `https://namu.wiki/w/${yearThen}%EB%85%84`;

  let inWidth = window.innerWidth;
  let inHeight = window.innerHeight;
  let width = win.offsetWidth;
  let height = win.offsetHeight;
  win.style.left = `${(inWidth - width) / 2}px`;
  win.style.top = `${(inHeight - height) / 2}px`;

  updateProgress();
  setInterval(updateProgress, 1000);
})();

function updateProgress() {
  let yearNow = new Date().getFullYear();
  let yearThen = yearNow + 1;

  let startTime = getStartOf(yearNow);
  let endTime = getStartOf(yearThen);

  let diff = endTime - startTime;
  let current = Date.now() - startTime;
  rawPercentage = current / diff * 100;
  let percentage = Math.floor(rawPercentage);

  setCssPercentage();
  headerTitle.textContent = `${percentage}% 완료`;
  textPercentage.textContent = `${percentage}% 완료`;
}

function setCssPercentage() {
  if (initial) return;
  progressBar.style.setProperty('--percentage', `${rawPercentage}%`);
}

function getStartOf(year) {
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function openWin() {
  visible = true;
  innerFocus = true;
  win.classList.toggle('visible', visible);
  setFocus(true);
  initial = false;
  setCssPercentage();
}

function closeWin() {
  visible = false;
  innerFocus = false;
  win.classList.toggle('visible', visible);
}

win.oncontextmenu = (e) => {
  e.preventDefault();
};

let evtFocus = (e) => {
  innerFocus = win.contains(e.target);
  setFocus(innerFocus);
};

document.onmousedown = evtFocus;
document.ontouchstart = evtFocus;

window.onfocus = () => {
  win.classList.toggle('focused', innerFocus);
  setFocus(innerFocus);
};

window.onblur = () => {
  win.classList.toggle('focused', false);
  setFocus(false);
};

function setFocus(flag) {
  win.classList.toggle('focused', flag);
  Array.from(document.getElementsByClassName('unfocusable')).forEach(x => {
    x.classList.toggle('unfocused', !flag);
  });
}

let evtDrag = (e) => {
  let tag = e.target.tagName;
  if (tag == 'BUTTON' || tag == 'IMG') return;
  e.preventDefault();
  pos[0] = win.offsetLeft;
  pos[1] = win.offsetTop;
  pos[2] = e.clientX;
  pos[3] = e.clientY;
  let evtCancel = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  };
  document.onmouseup = evtCancel;
  document.ontouchend = evtCancel;
  let evtMove = (e) => {
    e.preventDefault();
    let width = win.offsetWidth;
    let height = win.offsetHeight;

    let left = pos[0] + e.clientX - pos[2];
    let top = pos[1] + e.clientY - pos[3];

    left = Math.max(0, Math.min(left, window.innerWidth - width));
    top = Math.max(0, Math.min(top, window.innerHeight - height - 1));

    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
  };
  document.onmousemove = evtMove;
  document.ontouchmove = evtMove;
  
};

header.onmousedown = evtDrag;
header.ontouchstart = evtDrag;
