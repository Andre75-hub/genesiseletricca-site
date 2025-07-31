
// Compartilhamento simples via WhatsApp
function compartilhar(link) {
  const texto = encodeURIComponent("Dê uma olhada nesse conteúdo: " + link);
  window.open("https://wa.me/?text=" + texto, "_blank");
}
