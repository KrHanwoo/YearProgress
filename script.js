const win = document.getElementById('window');
const header = document.getElementById('header');

let pos = [0, 0, 0, 0];
let visible = true;
let innerFocus = true;

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