(function () {
  var svg =
    '<svg class="ginger-cat" viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg">' +
    '<g class="cat-yarn"><circle cx="330" cy="210" r="38" fill="#ffb6c1"/>' +
    '<circle cx="330" cy="210" r="38" fill="none" stroke="#d63384" stroke-width="2" opacity="0.35"/>' +
    '<path d="M302 195 Q330 175 358 195" fill="none" stroke="#ff69b4" stroke-width="2.5" opacity="0.5"/>' +
    '<path d="M310 220 Q330 200 350 225" fill="none" stroke="#ff69b4" stroke-width="2" opacity="0.4"/></g>' +
    '<g class="cat-body"><ellipse cx="180" cy="200" rx="95" ry="55" fill="#e87b15"/>' +
    '<ellipse cx="180" cy="205" rx="85" ry="45" fill="#f5922a"/>' +
    '<path d="M130 195 Q145 180 160 195" stroke="#b85a0a" stroke-width="4" fill="none" opacity="0.45"/>' +
    '<path d="M155 210 Q170 195 185 210" stroke="#b85a0a" stroke-width="4" fill="none" opacity="0.4"/>' +
    '<path d="M190 215 Q205 200 220 215" stroke="#b85a0a" stroke-width="4" fill="none" opacity="0.4"/></g>' +
    '<g class="cat-head"><circle cx="115" cy="155" r="52" fill="#e87b15"/>' +
    '<circle cx="115" cy="160" r="46" fill="#f5922a"/>' +
    '<g class="cat-ear cat-ear-left"><polygon points="75,115 88,75 105,118" fill="#e87b15"/>' +
    '<polygon points="80,115 88,85 100,118" fill="#ffb6c1"/></g>' +
    '<g class="cat-ear cat-ear-right"><polygon points="125,118 142,78 158,115" fill="#e87b15"/>' +
    '<polygon points="130,118 142,88 152,115" fill="#ffb6c1"/></g>' +
    '<ellipse class="cat-eye cat-eye-left" cx="98" cy="150" rx="7" ry="9" fill="#3d2314"/>' +
    '<ellipse class="cat-eye cat-eye-right" cx="132" cy="150" rx="7" ry="9" fill="#3d2314"/>' +
    '<circle cx="100" cy="147" r="2.5" fill="white"/><circle cx="134" cy="147" r="2.5" fill="white"/>' +
    '<ellipse cx="115" cy="168" rx="5" ry="4" fill="#ffb6c1"/>' +
    '<path d="M115 172 L108 180 M115 172 L122 180" stroke="#b85a0a" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="70" y1="158" x2="40" y2="152" stroke="#b85a0a" stroke-width="1.5" opacity="0.6"/>' +
    '<line x1="70" y1="165" x2="38" y2="168" stroke="#b85a0a" stroke-width="1.5" opacity="0.6"/>' +
    '<line x1="160" y1="158" x2="190" y2="152" stroke="#b85a0a" stroke-width="1.5" opacity="0.6"/>' +
    '<line x1="160" y1="165" x2="192" y2="168" stroke="#b85a0a" stroke-width="1.5" opacity="0.6"/></g>' +
    '<g class="cat-tail"><path d="M260 195 Q310 150 340 120 Q355 100 348 85" stroke="#e87b15" stroke-width="22" fill="none" stroke-linecap="round"/>' +
    '<path d="M260 195 Q310 150 340 120 Q355 100 348 85" stroke="#f5922a" stroke-width="16" fill="none" stroke-linecap="round"/></g>' +
    '<g class="cat-paws"><ellipse cx="145" cy="248" rx="18" ry="12" fill="#e87b15"/>' +
    '<ellipse cx="210" cy="248" rx="18" ry="12" fill="#e87b15"/>' +
    '<g class="cat-paw-play"><ellipse cx="268" cy="195" rx="16" ry="14" fill="#e87b15"/>' +
    '<ellipse cx="268" cy="198" rx="12" ry="10" fill="#ffb6c1" opacity="0.5"/></g></g></svg>';

  function mount(id) {
    var el = document.getElementById(id);
    if (el && !el.querySelector('.ginger-cat')) {
      el.innerHTML = svg;
      el.style.opacity = '1';
      el.style.display = 'block';
    }
  }

  function mountAll() {
    mount('envelope-cat');
    mount('hero-cat');
    var card = document.querySelector('.hero-card');
    if (card && !document.getElementById('hero-cat')) {
      var div = document.createElement('div');
      div.id = 'hero-cat';
      div.className = 'hero-cat';
      div.style.opacity = '1';
      div.style.display = 'block';
      div.innerHTML = svg;
      card.insertBefore(div, card.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
  window.mountGingerCat = mountAll;
})();
