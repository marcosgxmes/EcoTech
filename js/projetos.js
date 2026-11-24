/* =========================================
   ECOTECH — FILTRO DO CATÁLOGO DE PROJETOS
========================================= */
document.addEventListener("DOMContentLoaded", function () {
  const botoes = document.querySelectorAll(".filter-btn");
  const cartoes = document.querySelectorAll(".project-card");
  const status = document.getElementById("filter-status");

  if (!botoes.length || !cartoes.length) return;

  function aplicarFiltro(filtro) {
    let visiveis = 0;

    cartoes.forEach(function (cartao) {
      const categoria = cartao.getAttribute("data-categoria");
      const mostrar = filtro === "todos" || categoria === filtro;
      cartao.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });

    if (status) {
      const rotulo = visiveis === 1 ? "iniciativa exibida" : "iniciativas exibidas";
      status.textContent = visiveis + " " + rotulo + ".";
    }
  }

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoes.forEach(function (outro) {
        outro.setAttribute("aria-pressed", "false");
      });

      botao.setAttribute("aria-pressed", "true");
      aplicarFiltro(botao.getAttribute("data-filter"));
    });
  });
});
