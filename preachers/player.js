/* Shared "Listen live" buttons for the preachers section — Spirit 88.3 FM stream */
(function(){
  var STREAM = 'https://stream.sunnygh.com/spirit883';
  var audio = document.getElementById('stream');
  if (!audio) { audio = document.createElement('audio'); audio.preload = 'none'; document.body.appendChild(audio); }
  var btns = document.querySelectorAll('[data-listen]');
  function sync(on){
    btns.forEach(function(b){
      b.classList.toggle('playing', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.querySelector('.lbl').textContent = on ? 'Pause' : 'Listen live';
    });
  }
  btns.forEach(function(b){
    b.addEventListener('click', function(){
      if (audio.paused) {
        b.querySelector('.lbl').textContent = 'Connecting…';
        audio.src = STREAM;
        audio.play().then(function(){ sync(true); })
          .catch(function(){ sync(false); b.querySelector('.lbl').textContent = 'Stream unavailable'; });
      } else {
        audio.pause(); audio.removeAttribute('src'); audio.load(); sync(false);
      }
    });
  });
})();
