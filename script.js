const win = document.getElementById('window');
const header = document.getElementById('header');
const headerTitle = document.getElementById('header-title');
const textPercentage = document.getElementById('text-percentage');

let pos = [0, 0, 0, 0];
let visible = true;
let innerFocus = true;

(async () => {
  let fromYear = document.getElementById('from-year');
  let toYear = document.getElementById('to-year');
  let yearNow = new Date().getFullYear();
  let yearThen = yearNow + 1;
  fromYear.textContent = `${yearNow}년`;
  fromYear.href = `https://namu.wiki/w/${yearNow}%EB%85%84`;
  toYear.textContent = `${yearThen}년`;
  toYear.href = `https://namu.wiki/w/${yearThen}%EB%85%84`;

  let diff = getStartOf(yearThen) - getStartOf(yearNow);
  let current = Date.now() - getStartOf(yearNow);
  let percentage = Math.floor(current / diff * 100);

  headerTitle.textContent = `${percentage}% 완료`;
  textPercentage.textContent = `${percentage}% 완료`;
})();

function getStartOf(year) {
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function toggle() {
  visible = !visible;
  win.classList.toggle('visible', visible);
}

win.oncontextmenu = (e) => {
  e.preventDefault();
};

document.onmousedown = (e) => {
  innerFocus = win.contains(e.target);
  win.classList.toggle('focused', innerFocus);
};

window.onfocus = () => {
  win.classList.toggle('focused', innerFocus);
};

window.onblur = () => {
  win.classList.toggle('focused', false);
};

header.onmousedown = (e) => {
  e.preventDefault();
  pos[2] = e.clientX;
  pos[3] = e.clientY;
  document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
  document.onmousemove = (e) => {
    e.preventDefault();
    pos[0] = pos[2] - e.clientX;
    pos[1] = pos[3] - e.clientY;
    pos[2] = e.clientX;
    pos[3] = e.clientY;
    win.style.left = `${win.offsetLeft - pos[0]}px`;
    win.style.top = `${win.offsetTop - pos[1]}px`;
  };
};