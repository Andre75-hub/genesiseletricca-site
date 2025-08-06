
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const form = document.querySelector(".comment-section form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Comentário enviado com sucesso!");
      form.reset();
    });
  }
});
