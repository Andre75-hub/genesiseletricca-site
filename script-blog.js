
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a.share-link').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = encodeURIComponent(window.location.href);
      const network = this.dataset.network;
      let shareUrl = "";

      switch (network) {
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${url}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank");
      }
    });
  });

  // Comentário simulado por e-mail
  const form = document.querySelector(".comment-section form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const comentario = this.querySelector("textarea").value;
      const nome = this.querySelector("input[name='nome']").value;
      const email = this.querySelector("input[name='email']").value;

      const mailtoLink = `mailto:genesiseletricca@gmail.com?subject=Novo comentário no blog&body=Nome: ${nome}%0DE-mail: ${email}%0D%0DComentário: ${comentario}`;
      window.location.href = mailtoLink;
    });
  }
});
