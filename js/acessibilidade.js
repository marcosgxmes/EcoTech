/* EcoTech - comportamento acessível compartilhado (menu mobile + submenu Mídia) */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    function definirEstadoMenu(aberto) {
      if (!menuToggle || !navigation) return;
      navigation.classList.toggle("is-open", aberto);
      menuToggle.setAttribute("aria-expanded", String(aberto));
      menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    if (menuToggle && navigation) {
      definirEstadoMenu(false);

      menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        const estaAberto = navigation.classList.contains("is-open");
        definirEstadoMenu(!estaAberto);
      });

      // Fecha o menu mobile ao clicar em links de navegação (exceto o botão do dropdown)
      navigation.querySelectorAll("a:not(.drop-btn)").forEach(function (link) {
        link.addEventListener("click", function () {
          definirEstadoMenu(false);
        });
      });

      // Fecha ao clicar fora
      document.addEventListener("click", function (e) {
        if (!navigation.contains(e.target) && !menuToggle.contains(e.target)) {
          definirEstadoMenu(false);
        }
      });

      // Fecha com Escape
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navigation.classList.contains("is-open")) {
          definirEstadoMenu(false);
          menuToggle.focus();
        }
      });
    }

    /* Submenu "Mídia" operável por teclado e clique */
    document.querySelectorAll(".dropdown").forEach(function (dd) {
      const btn = dd.querySelector(".drop-btn");
      const menu = dd.querySelector(".dropdown-menu");
      if (!btn || !menu) return;

      function abrir() {
        dd.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }

      function fechar() {
        dd.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }

      function alternar() {
        if (dd.classList.contains("is-open")) {
          fechar();
        } else {
          abrir();
        }
      }

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        alternar();
      });

      btn.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          alternar();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          abrir();
          const primeiro = menu.querySelector("a");
          if (primeiro) primeiro.focus();
        }
      });

      dd.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && dd.classList.contains("is-open")) {
          e.preventDefault();
          fechar();
          btn.focus();
        }
      });

      dd.addEventListener("focusout", function (e) {
        if (e.relatedTarget && !dd.contains(e.relatedTarget)) {
          fechar();
        }
      });

      document.addEventListener("click", function (e) {
        if (!dd.contains(e.target)) {
          fechar();
        }
      });
    });
  });
})();
