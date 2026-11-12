
(() => {
  // Only enable the custom cursor on desktop mouse devices.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  function initialiseCursor() {
    // Prevent duplicate cursor instances.
    if (document.querySelector(".bio-cursor")) return;

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
    let currentX = -100;
    let currentY = -100;
    let pointerActive = false;

    document.documentElement.classList.add("bio-cursor-enabled");

    // Track mouse movement continuously.
    window.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;

      mouseX = event.clientX;
      mouseY = event.clientY;
      pointerActive = true;

      cursor.classList.add("visible");
      particles.forEach(p => p.style.opacity = "1");
    }, { passive: true });

    // Hide cursor when the browser window loses focus.
    window.addEventListener("blur", () => {
      cursor.classList.remove("visible");
      particles.forEach(p => p.style.opacity = "0");
    });

    window.addEventListener("focus", () => {
      // It will become visible again on the next mouse movement.
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cursor.classList.remove("visible");
        particles.forEach(p => p.style.opacity = "0");
      }
    });

    // Smooth cursor movement.
    function animate() {
      if (pointerActive) {
        currentX += (mouseX - currentX) * 0.25;
        currentY += (mouseY - currentY) * 0.25;

        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;

        particles.forEach((particle, index) => {
          const angle = performance.now() * 0.0018 + index * 2.1;
          const radius = 29;

          particle.style.left =
            `${currentX + Math.cos(angle) * radius}px`;

          particle.style.top =
            `${currentY + Math.sin(angle) * radius}px`;
        });
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Detect interactive elements without hover flickering.
    const interactiveSelector =
      "a, button, input, select, textarea, [role='button']";

    document.addEventListener("pointerover", (event) => {
      if (event.target.closest(interactiveSelector)) {
        cursor.classList.add("is-hovering");
      }
    });

    document.addEventListener("pointerout", (event) => {
      const next = event.relatedTarget;

      if (
        event.target.closest(interactiveSelector) &&
        (!next || !next.closest || !next.closest(interactiveSelector))
      ) {
        cursor.classList.remove("is-hovering");
      }
    });

    // Click feedback.
    document.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") {
        cursor.classList.add("is-clicking");
      }
    });

    document.addEventListener("pointerup", () => {
      cursor.classList.remove("is-clicking");
    });

    // Biological ripple effect.
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseCursor, {
      once: true
    });
  } else {
    initialiseCursor();
  }
})();
