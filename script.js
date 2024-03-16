const win = document.getElementById('window');
const header = document.getElementById('header');
const headerTitle = document.getElementById('header-title');
const textPercentage = document.getElementById('text-percentage');
const progressBar = document.getElementById('progress-bar');

let pos = [0, 0, 0, 0];
let visible = false;
let innerFocus = false;

(async () => {
  let fromYear = document.getElementById('from-year');
  let toYear = document.getElementById('to-year');
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
  let rawPercentage = current / diff * 100;
  let percentage = Math.floor(rawPercentage);

  progressBar.style.setProperty('--percentage', `${rawPercentage}%`);
  headerTitle.textContent = `${percentage}% 완료`;
  textPercentage.textContent = `${percentage}% 완료`;
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
}

function closeWin() {
  visible = false;
  innerFocus = false;
  win.classList.toggle('visible', visible);
}

win.oncontextmenu = (e) => {
  e.preventDefault();
};

document.onmousedown = (e) => {
  innerFocus = win.contains(e.target);
  setFocus(innerFocus);
};

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

header.onmousedown = (e) => {
  let tag = e.target.tagName;
  if (tag == 'BUTTON' || tag == 'IMG') return;
  e.preventDefault();
  pos[0] = win.offsetLeft;
  pos[1] = win.offsetTop;
  pos[2] = e.clientX;
  pos[3] = e.clientY;
  document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
  document.onmousemove = (e) => {
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
};