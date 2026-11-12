
/* Lightweight biological cursor */
(() => {
  const finePointer = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  );

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (!finePointer.matches || reducedMotion.matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'bio-cursor';
  cursor.setAttribute('aria-hidden', 'true');

  document.body.appendChild(cursor);
  document.body.classList.add('has-bio-cursor');

  let visible = false;

  function show() {
    cursor.classList.add('is-visible');
    visible = true;
  }

  function hide() {
    cursor.classList.remove(
      'is-visible',
      'is-hovering',
      'is-pressed'
    );
    visible = false;
  }

  document.addEventListener('pointermove', (event) => {
    cursor.style.transform =
      `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;

    if (!visible) show();
  }, { passive: true });

  // Hide when the pointer leaves the webpage.
  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  window.addEventListener('focus', hide);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hide();
  });

  // Interactive elements.
  document.addEventListener('pointerover', (event) => {
    if (event.target.closest(
      'a, button, input, select, textarea, [role="button"]'
    )) {
      cursor.classList.add('is-hovering');
    }
  });

  document.addEventListener('pointerout', (event) => {
    if (event.target.closest(
      'a, button, input, select, textarea, [role="button"]'
    )) {
      cursor.classList.remove('is-hovering');
    }
  });

  document.addEventListener('pointerdown', () => {
    cursor.classList.add('is-pressed');
  });

  document.addEventListener('pointerup', () => {
    cursor.classList.remove('is-pressed');
  });

  // Reset during page navigation.
  window.addEventListener('pagehide', hide);
  window.addEventListener('pageshow', hide);
})();
