
/* ==========================================
   BIOLOGICAL MICROBE CURSOR
========================================== */

(() => {
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (!finePointer.matches || reducedMotion.matches) return;

  const cursor = document.createElement("div");
  cursor.className = "bio-cursor";
  document.body.appendChild(cursor);

  const particles = [];

  for (let i = 0; i < 3; i++) {
    const particle = document.createElement("div");
    particle.className = "bio-cursor-particle";
    document.body.appendChild(particle);
    particles.push(particle);
  }

  let mouseX = -100;
  let mouseY = -100;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    particles.forEach((particle, index) => {
      const angle = performance.now() * 0.0015 + index * 2.1;
      const radius = 23;

      particle.style.left =
        `${currentX + Math.cos(angle) * radius}px`;

      particle.style.top =
        `${currentY + Math.sin(angle) * radius}px`;
    });

    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(
      "a, button, input, select, textarea, [role='button']"
    )) {
      cursor.classList.add("is-hovering");
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.closest(
      "a, button, input, select, textarea, [role='button']"
    )) {
      cursor.classList.remove("is-hovering");
    }
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("is-clicking");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("is-clicking");
  });

  document.addEventListener("click", (event) => {
    const ripple = document.createElement("div");
    ripple.className = "bio-cursor-ripple";

    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;

    document.body.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
})();
