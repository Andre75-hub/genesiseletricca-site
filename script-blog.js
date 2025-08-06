document.addEventListener('DOMContentLoaded', () => {
    // === Lógica para a Busca na Barra Lateral (Filtragem em Tempo Real) ===
    const searchInput = document.getElementById('search-input-sidebar');
    const searchableContent = document.querySelector('.searchable-content');

    if (searchInput && searchableContent) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const elementsToSearch = searchableContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, li');

            elementsToSearch.forEach(element => {
                const text = element.textContent.toLowerCase();
                // Mostra ou esconde o elemento com base no termo de busca
                if (text.includes(query) || query === '') {
                    element.style.display = ''; // Mostra o elemento
                } else {
                    element.style.display = 'none'; // Esconde o elemento
                }
            });
        });
    }

    // Ação do botão de busca (mantida para compatibilidade, mas a busca já ocorre ao digitar)
    const searchButton = document.getElementById('search-button-sidebar');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                // Se a busca for concluída, você pode adicionar uma ação aqui, como rolar a página
                console.log(`Busca realizada por: ${query}`);
            }
        });
    }

    // === Lógica para o Formulário de Comentários ===
    const commentForm = document.querySelector('.comment-section form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', form.action);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;
                if (xhr.status === 200) {
                    form.reset();
                    // Cria uma mensagem de sucesso
                    const successMessage = document.createElement('p');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Comentário enviado com sucesso! Agradecemos sua contribuição.';
                    form.parentNode.insertBefore(successMessage, form.nextSibling);

                    // Remove a mensagem de sucesso após alguns segundos
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    alert('Houve um erro ao enviar seu comentário. Por favor, tente novamente.');
                }
            };
            xhr.send(formData);
        });
    }
});

// === Funções de Compartilhamento Social e Copiar Link (Globais) ===
// Compartilhar post em diferentes plataformas
function sharePost(platform) {
    const postUrl = window.location.href;
    const postTitle = document.title;
    
    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' - ' + postUrl)}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Copiar o URL do post para a área de transferência
function copyLink() {
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl).then(() => {
        // Encontra o botão de copiar e exibe a mensagem de feedback
        const copyButton = document.querySelector('.social-btn.copy');
        const originalText = copyButton.querySelector('span').textContent;
        const feedbackText = 'Link Copiado!';
        
        copyButton.querySelector('span').textContent = feedbackText;
        copyButton.classList.add('copied');

        // Volta ao texto original após 2 segundos
        setTimeout(() => {
            copyButton.querySelector('span').textContent = originalText;
            copyButton.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar o link: ', err);
        alert('Houve um erro ao copiar o link. Por favor, tente manualmente.');
    });
}
