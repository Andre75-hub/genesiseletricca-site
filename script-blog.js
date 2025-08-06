document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('comment-form');
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Comentário enviado com sucesso!';
                form.insertAdjacentElement('afterend', successMessage);

                form.reset();
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                alert('Ocorreu um erro ao enviar o comentário. Tente novamente.');
            }
        });
    }
});
