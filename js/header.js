
/* DEIXA A OPÇÃO SUBLINHADA DE ACORDO COM NAVEGAÇÃO */
document.addEventListener('DOMContentLoaded', () => {
  const paginaAtual = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const arquivo = new URL(link.href).pathname.split('/').pop() || 'index.html';

    if (arquivo === paginaAtual) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        dropdown.querySelector('.drop-btn').classList.add('active');
      }
    }
  });
});


/* MENU HAMBUGUER PARA DISPOSITIVOS MENORES */
const menuToggle = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

function alternarMenu() {
    const menuAberto = menuPrincipal.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(menuAberto));
    menuToggle.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );
}

menuToggle.addEventListener("click", alternarMenu);

// Fecha o menu ao clicar em uma opção
menuPrincipal.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuPrincipal.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});