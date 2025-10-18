// Full interactions: preloader with animated logo, offcanvas menu, modal report with counters, scroll reveal, counters, typewriter, tilt, ripple, progress bar
(function(){
  // Helper selectors
  var $ = function(sel, ctx){ return (ctx||document).querySelector(sel); };
  var $$ = function(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); };

  /* ---------- PRELOADER: typewriter + glow ---------- */
  var pre = $('#preloader');
  var pretext = document.querySelector('.prelogo-text');
  var preStr = pretext.dataset.text || pretext.getAttribute('data-text') || 'IPhub';
  function preloadTypeAndGlow(){
    pretext.textContent = '';
    var i = 0;
    function step(){
      if(i <= preStr.length){
        pretext.textContent = preStr.slice(0, i);
        i++;
        pretext.classList.add('show');
        setTimeout(step, 120);
      }
    }
    step();
  }
  // Hide preloader after load
  window.addEventListener('load', function(){
    // ensure typewriter runs first then hide
    preloadTypeAndGlow();
    setTimeout(function(){ pre.classList.add('hidden'); pre.setAttribute('aria-hidden','true'); }, 1400);
  });

  /* ---------- Off-canvas menu ---------- */
  var burger = $('#burger');
  var off = $('#offcanvas');
  var overlay = $('#overlay');
  var offClose = $('.offcanvas-close');
  function openOff(){ off.classList.add('open'); overlay.hidden = false; setTimeout(function(){ overlay.classList.add('show'); },10); off.setAttribute('aria-hidden','false'); burger.classList.add('open'); burger.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
  function closeOff(){ off.classList.remove('open'); overlay.classList.remove('show'); setTimeout(function(){ overlay.hidden = true; },250); off.setAttribute('aria-hidden','true'); burger.classList.remove('open'); burger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
  burger && burger.addEventListener('click', function(){ if(off.classList.contains('open')) closeOff(); else openOff(); });
  offClose && offClose.addEventListener('click', closeOff);
  overlay && overlay.addEventListener('click', closeOff);
  $$('.offcanvas-nav a').forEach(function(a){ a.addEventListener('click', closeOff); });

  /* ---------- Scroll progress bar ---------- */
  var prog = $('#scrollProgress');
  window.addEventListener('scroll', function(){ var h = document.documentElement.scrollHeight - window.innerHeight; var perc = (window.scrollY / (h || 1)) * 100; prog.style.width = perc + '%'; });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = $$('.reveal, .card, .person, .hero-illustration');
  var io = new IntersectionObserver(function(entries){ entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('show'); io.unobserve(en.target); } }); }, {threshold:0.15});
  revealEls.forEach(function(el){ io.observe(el); });

  /* ---------- Counters (for any .counter) ---------- */
  var counters = $$('.counter');
  var counterIo = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting){ var el = entry.target; var to = +el.dataset.target || 0; var dur = 1400; var startTime = null; function step(ts){ if(!startTime) startTime = ts; var prog = Math.min((ts - startTime)/dur,1); el.textContent = Math.floor(prog * to); if(prog<1) requestAnimationFrame(step); else el.textContent = to; } requestAnimationFrame(step); counterIo.unobserve(el); } }); }, {threshold:0.6});
  counters.forEach(function(c){ counterIo.observe(c); });

  /* ---------- Modal (Instant Report) ---------- */
  var modal = $('#modal');
  var openReport = $('#openReport');
  var modalClose = $('.modal-close');
  var modalOverlay = $('.modal-overlay');
  function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; // ensure counters inside modal animate
    $$('.report-num').forEach(function(el){ el.textContent = '0'; counterIo.observe(el); }); }
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  openReport && openReport.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
  modalClose && modalClose.addEventListener('click', closeModal);
  modalOverlay && modalOverlay.addEventListener('click', closeModal);

  /* ---------- Typewriter for hero title (if present) ---------- */
  $$('.typewrite').forEach(function(el){ var txt = el.dataset.text || el.getAttribute('data-text') || ''; var i=0; function tick(){ if(i<=txt.length){ el.textContent = txt.slice(0,i); i++; setTimeout(tick,36); } } tick(); });

  /* ---------- Tilt (3D) for .tilt elements ---------- */
  $$('.tilt').forEach(function(card){ card.addEventListener('mousemove', function(e){ var rect = card.getBoundingClientRect(); var x = e.clientX - rect.left; var y = e.clientY - rect.top; var cx = rect.width/2; var cy = rect.height/2; var dx = (x - cx) / cx; var dy = (y - cy) / cy; var tiltX = (dy * 6).toFixed(2); var tiltY = (dx * -6).toFixed(2); card.style.transform = 'rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)'; }); card.addEventListener('mouseleave', function(){ card.style.transform = ''; }); });

  /* ---------- Ripple effect ---------- */
  $$('.ripple').forEach(function(btn){ btn.addEventListener('click', function(e){ var rect = this.getBoundingClientRect(); var circle = document.createElement('span'); var d = Math.max(rect.width, rect.height); circle.className = 'ripple-effect'; circle.style.width = circle.style.height = d + 'px'; circle.style.left = (e.clientX - rect.left - d/2) + 'px'; circle.style.top = (e.clientY - rect.top - d/2) + 'px'; this.appendChild(circle); setTimeout(function(){ circle.remove(); }, 700); }); });

  /* ---------- Simple form submit demo ---------- */
  var form = $('#contactForm'); if(form){ form.addEventListener('submit', function(e){ e.preventDefault(); alert('Спасибо! Ваша заявка отправлена.'); form.reset(); }); }

})();
