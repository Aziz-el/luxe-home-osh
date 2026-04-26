export function fmtPrice(n) {
  return new Intl.NumberFormat('ru-RU').format(n) + ' сом';
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✓' : '✕'} ${message}`;
  container.appendChild(toast);
  setTimeout(() => { 
    toast.style.opacity = '0'; 
    setTimeout(() => toast.remove(), 300); 
  }, 3000);
}
