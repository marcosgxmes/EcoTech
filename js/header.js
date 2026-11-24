document.addEventListener('DOMContentLoaded', () => {
  const paginaAtual = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    // link.href já vem resolvido; o pathname ignora o #inicio
    const arquivo = new URL(link.href).pathname.split('/').pop() || 'index.html';

    if (arquivo === paginaAtual) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      // Se estiver dentro de um dropdown, marca também o botão "pai"
      const dropdown = link.closest('.dropdown');
      if (dropdown) {
        dropdown.querySelector('.drop-btn').classList.add('active');
      }
    }
  });
});