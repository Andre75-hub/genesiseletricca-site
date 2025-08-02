// Rolagem suave para âncoras internas do menu
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Desconta altura do menu fixo
        behavior: "smooth"
      });
    }
  });
});

// (Opcional) Destacar link do menu ativo durante rolagem
/*
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(sec => {
    const sectionTop = sec.offsetTop;
    const sectionHeight = sec.offsetHeight;
    const sectionId = sec.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
*/

// Simulação de envio de comentário (sem backend)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.comments form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const comentario = form.querySelector('textarea').value.trim();
      const nome = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();

      if (!comentario || !nome || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      if (!validateEmail(email)) {
        alert('E-mail inválido.');
        return;
      }

      alert('Comentário enviado! (simulação)');
      form.reset();
    });
  }
});

// Validação básica de e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
