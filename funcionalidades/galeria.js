/* EcoTech - Lightbox acessível da Galeria Ambiental */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("lightboxModal");
    if (!modal) return;

    const img = document.getElementById("lightboxImg");
    const title = document.getElementById("lightboxTitle");
    const desc = document.getElementById("lightboxDesc");
    const source = document.getElementById("lightboxSource");
    const closeBtn = modal.querySelector(".lightbox-close");
    let lastFocus = null;

    function openLightbox(card, trigger) {
      const thumb = card.querySelector("img");
      const cardTitle = card.querySelector("h3");
      const cardDesc = card.querySelector("p");
      const cardSource = card.querySelector(".gallery-source");

      lastFocus = trigger || document.activeElement;
      img.src = card.dataset.src || (thumb ? thumb.getAttribute("src") : "");
      img.alt = thumb ? thumb.alt : "";

      title.textContent = card.dataset.title || (cardTitle ? cardTitle.textContent.replace("(ampliar imagem)", "").trim() : "");
      desc.textContent = card.dataset.desc || (cardDesc ? cardDesc.textContent.trim() : "");

      source.textContent = "";
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-camera";
      icon.setAttribute("aria-hidden", "true");
      source.appendChild(icon);

      const sourceText = card.dataset.source
        ? " Fonte: " + card.dataset.source
        : cardSource
          ? " " + cardSource.textContent.trim()
          : "";
      source.appendChild(document.createTextNode(sourceText));

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (!modal.classList.contains("active")) return;
      modal.classList.remove("active");
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    document.querySelectorAll(".gallery-card").forEach(function (card) {
      const trigger = card.querySelector(".gallery-trigger");
      if (trigger) {
        trigger.addEventListener("click", function () {
          openLightbox(card, trigger);
        });
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("active")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "Tab") {
        const focusables = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  });
})();
