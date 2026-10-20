(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const theme = ['light', 'dark', 'auto'].includes(savedTheme) ? savedTheme : 'auto';
  setTheme(theme, false);
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((className) => className.startsWith('theme-'))
    ?.replace('theme-', '') || 'auto';
  const themeButtons = [...document.querySelectorAll('.header__theme-menu-button')];
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const themeClass = [...button.classList].find((className) => className.includes('_type_'));
      const chosenTheme = themeClass.split('_type_')[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

function setTheme(theme, save = true) {
  document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-auto');
  document.documentElement.classList.add(`theme-${theme}`);
  if (save) localStorage.setItem('theme', theme);
}

function setActiveButton(buttons, theme) {
  buttons.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
    button.setAttribute('aria-pressed', 'false');
  });
  const activeButton = buttons.find((button) => button.classList.contains(`header__theme-menu-button_type_${theme}`));
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.setAttribute('disabled', '');
    activeButton.setAttribute('aria-pressed', 'true');
  }
}
