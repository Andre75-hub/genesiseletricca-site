// Função para lidar com a busca na barra lateral
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input-sidebar');
    const searchButton = document.getElementById('search-button-sidebar');

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                // Lógica de busca, por exemplo, redirecionar para a página de resultados
                console.log(`Buscando por: ${query}`);
                // window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Função para lidar com o envio de formulários
    const commentForm = document.getElementById('comment-form');
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
                    const successMessage = document.createElement('p');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Comentário enviado com sucesso!';
                    form.parentNode.insertBefore(successMessage, form.nextSibling);
                } else {
                    alert('Houve um erro ao enviar seu comentário.');
                }
            };
            xhr.send(formData);
        });
    }
});

// Nova função para lidar com o compartilhamento social
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
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}
