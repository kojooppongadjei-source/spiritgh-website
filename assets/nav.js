/* Mobile menu toggle, shared by every page on spiritgh.com */
(function(){
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-menu');
  if (!btn || !menu) return;
  function set(open){
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function(){ set(!menu.classList.contains('open')); });
  menu.addEventListener('click', function(e){ if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); btn.focus(); } });
  document.addEventListener('click', function(e){ if (menu.classList.contains('open') && !e.target.closest('nav')) set(false); });
  window.addEventListener('resize', function(){ if (window.innerWidth > 900) set(false); });
})();
