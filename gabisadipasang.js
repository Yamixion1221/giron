  // Dark mode toggle
    const btn = document.getElementById('darkModeToggle');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if(document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
    if(localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }

    // Tab navigation
    const tabs = document.querySelectorAll('nav button.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        // deactivate all tabs & panes
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // activate current tab & pane
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        tabPanes[idx].classList.add('active');
      });

      // Keyboard navigation (optional)
      tab.addEventListener('keydown', e => {
        let newIndex = null;
        if(e.key === 'ArrowRight') newIndex = (idx + 1) % tabs.length;
        if(e.key === 'ArrowLeft') newIndex = (idx - 1 + tabs.length) % tabs.length;
        if(newIndex !== null) {
          tabs[newIndex].focus();
          tabs[newIndex].click();
          e.preventDefault();
        }
      });
    });
