import './toast.css';

let ToastWrap = null;
let count = 0;

function Toast(props) {
  if (!ToastWrap) {
    // 单例模式
    ToastWrap = document.createElement('div');
    ToastWrap.setAttribute('class', 'ax-toast');
    document.body.append(ToastWrap);
  }

  ToastWrap.style.display = 'flex';
  let id = '' + Date.now() + count++;
  let toast = document.createElement('div');
  toast.setAttribute('id', id);
  toast.innerHTML = `<i class="ax-toast__icon">${ props.type === 'success' ? '✓' : '!'}`
  ToastWrap.append(toast);
  setTimeout(() => {
    document.getElementById(id).remove();
    ToastWrap.style.display = 'none';
  }, props.duration || 2000)
}

export default Toast;