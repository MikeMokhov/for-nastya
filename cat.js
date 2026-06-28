(function () {
  'use strict';

  function hasCat(el) {
    return el.querySelector('.ginger-cat') || el.querySelector('.ginger-cat-img');
  }

  function mount(id) {
    var el = document.getElementById(id);
    if (!el || hasCat(el)) return;
    if (el.textContent.trim()) return;
    el.innerHTML =
      '<img src="images/cat-detailed.svg?v=15" alt="" class="ginger-cat-img" width="480" height="320">';
    el.style.opacity = '1';
    el.style.display = 'block';
  }

  function mountAll() {
    mount('envelope-cat');
    mount('hero-cat');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
