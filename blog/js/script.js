
// Script básico de busca
document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector(".sidebar input");
  input.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? "block" : "none";
    });
  });
});
