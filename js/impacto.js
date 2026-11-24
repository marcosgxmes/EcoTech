document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");

      tabButtons.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");

      tabPanels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
    });
  });

  const filterPills = document.querySelectorAll(".filter-pill");
  const categoryRows = document.querySelectorAll("#tabela-categorias tbody tr[data-cat]");

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;

      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      categoryRows.forEach((row) => {
        const detailRow = row.nextElementSibling;
        const match = filter === "todos" || row.dataset.cat === filter;
        row.hidden = !match;
        if (!match && detailRow?.classList.contains("detail-row")) {
          detailRow.hidden = true;
          const toggle = row.querySelector(".detail-toggle");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  document.querySelectorAll(".detail-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const detailRow = toggle.closest("tr").nextElementSibling;
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.textContent = expanded ? "Ver riscos evitados" : "Ocultar";
      if (detailRow) detailRow.hidden = expanded;
    });
  });
});