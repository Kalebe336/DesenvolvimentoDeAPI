(function () {
  const STORAGE_KEY = 'vitaprev.theme';

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.dataset.theme = 'dark';
    } else {
      delete root.dataset.theme;
    }

    const btnClaro = document.querySelector('[data-theme-value="light"]');
    const btnEscuro = document.querySelector('[data-theme-value="dark"]');

    if (btnClaro) btnClaro.setAttribute('aria-pressed', theme !== 'dark' ? 'true' : 'false');
    if (btnEscuro) btnEscuro.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;

    // Se o usuário nunca escolheu, respeitar preferência do SO
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  function initToggle() {
    const btnClaro = document.querySelector('[data-theme-value="light"]');
    const btnEscuro = document.querySelector('[data-theme-value="dark"]');

    if (btnClaro) btnClaro.addEventListener('click', function () { setTheme('light'); });
    if (btnEscuro) btnEscuro.addEventListener('click', function () { setTheme('dark'); });

    applyTheme(getPreferredTheme());
  }

  document.addEventListener('DOMContentLoaded', initToggle);
})();

