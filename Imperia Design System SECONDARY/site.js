// Imperija site - small interaction helpers
(function () {
  const header = document.querySelector(".site-header");
  if (header && header.classList.contains("on-hero")) {
    const hero = document.querySelector(".hero");
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight - 120 : window.innerHeight * 0.7;
      if (window.scrollY > threshold) header.classList.remove("on-hero");
      else header.classList.add("on-hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Filter chip behaviour (gallery)
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const f = chip.dataset.value;
        const wrap = group.closest("[data-filter-wrap]") || document;
        wrap.querySelectorAll("[data-cat]").forEach((card) => {
          card.style.display = (f === "all" || card.dataset.cat === f) ? "" : "none";
        });
      });
    });
  });

  // Contact-form fake submit
  const form = document.querySelector("[data-imperija-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const out = form.querySelector("[data-form-message]");
      if (out) {
        out.textContent = "Hvala. Javljamo Vam se u roku od 24 sata.";
        out.style.color = "var(--walnut)";
      }
      form.querySelectorAll("input, textarea, select").forEach((f) => { f.value = ""; });
    });
  }
})();
