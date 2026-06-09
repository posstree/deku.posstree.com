(function () {
  function initCtaSlider(slider) {
    const track = slider.querySelector('.cta-slider-track');
    const prevBtn = slider.querySelector('.cta-slider-btn-prev');
    const nextBtn = slider.querySelector('.cta-slider-btn-next');
    if (!track || !prevBtn || !nextBtn) return;

    function updateButtons() {
      const max = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 1;
      nextBtn.disabled = track.scrollLeft >= max - 1;
    }

    function step(direction) {
      const item = track.querySelector('img');
      const itemWidth = item ? item.offsetWidth + 16 : 200;
      track.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }

  // 각 초기화는 독립 try/catch — 한 init이 throw해도 다른 init 동작 보장.
  function safeInit(name, selector, handler) {
    try {
      document.querySelectorAll(selector).forEach(handler);
    } catch (e) {
      // 콘솔만 남기고 페이지 동작은 계속
      console.warn('[word-page] ' + name + ' init skipped:', e && e.message);
    }
  }

  function init() {
    safeInit('cta-slider', '.cta-slider', initCtaSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
