(() => {
  const root = document.documentElement;
  const mobilePanel = document.querySelector('#mobile-panel');
  const mobileToggle = document.querySelector('#mobile-toggle');

  const setTheme = theme => {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  };
  setTheme(localStorage.getItem('theme') || 'light');

  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });

  const setDirection = direction => {
    root.dir = direction;
    localStorage.setItem('dir', direction);
  };
  setDirection(localStorage.getItem('dir') || 'ltr');
  document.querySelectorAll('[data-direction-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      setDirection(root.dir === 'rtl' ? 'ltr' : 'rtl');
    });
  });

  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    mobileToggle.textContent = isOpen ? '×' : '☰';
  });

  document.querySelectorAll('[data-submenu-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const submenu = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = submenu.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
      const submenu = link.closest('.mobile-submenu');
      if (submenu) {
        submenu.classList.add('is-open');
        const toggle = document.querySelector(`[aria-controls="${submenu.id}"]`);
        toggle?.setAttribute('aria-expanded', 'true');
      }
    }
  });
  if (currentPage === 'client.html' || currentPage === 'admin.html') {
    document.querySelector('#dashboard-trigger')?.classList.add('is-active');
  }

  mobilePanel?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobilePanel.classList.remove('is-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      mobileToggle?.setAttribute('aria-label', 'Open navigation');
      if (mobileToggle) mobileToggle.textContent = '☰';
    });
  });
})();
