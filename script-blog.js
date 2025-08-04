// script-blog.js
document.addEventListener("DOMContentLoaded", function () {
    // Código para rolagem suave (scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Código para envio do formulário sem recarregar a página
    const form = document.querySelector(".comment-section form");
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault(); // Previne o envio padrão do formulário e o redirecionamento

            const statusMessage = document.createElement('p');
            statusMessage.style.textAlign = 'center';
            statusMessage.style.marginTop = '10px';
            statusMessage.style.fontWeight = 'bold';
            form.parentNode.insertBefore(statusMessage, form.nextSibling);

            const formData = new FormData(form);
            statusMessage.textContent = 'Enviando...';
            statusMessage.style.color = '#007BFF';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusMessage.textContent = 'Comentário enviado com sucesso! Agradecemos sua contribuição.';
                    statusMessage.style.color = 'green';
                    form.reset(); // Limpa os campos do formulário
                } else {
                    const errorData = await response.json();
                    statusMessage.textContent = `Ocorreu um erro: ${errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Tente novamente.'}`;
                    statusMessage.style.color = 'red';
                }
            } catch (error) {
                statusMessage.textContent = 'Ocorreu um erro na conexão. Verifique sua internet e tente novamente.';
                statusMessage.style.color = 'red';
            }

            // Remove a mensagem de status após 5 segundos
            setTimeout(() => {
                if(statusMessage.parentNode) {
                    statusMessage.parentNode.removeChild(statusMessage);
                }
            }, 5000);
        });
    }
});
