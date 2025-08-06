
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.comment-section form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Comentário enviado com sucesso!');
      form.reset();
    });
  }
});
