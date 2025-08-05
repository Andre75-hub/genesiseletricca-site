// script-blog.js
document.addEventListener("DOMContentLoaded", function () {
    // Banco de dados de posts para a busca
    const posts = [
        {
            title: "Disjuntor: fundamentos e aplicações",
            url: "disjuntor.html",
            summary: "Conheça os fundamentos e aplicações do disjuntor, um dispositivo essencial para a segurança elétrica em sua casa ou empresa."
        },
        {
            title: "IDR: o que é e para que serve o Interruptor Diferencial Residual",
            url: "idr.html",
            summary: "O Interruptor Diferencial Residual (IDR) é crucial para proteger pessoas e equipamentos contra choques e incêndios. Entenda sua importância e como funciona."
        }
    ];

    // 1. Código para rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // 2. Código para envio do formulário sem recarregar a página
    const form = document.querySelector(".comment-section form");
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
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
                    form.reset();
                } else {
                    const errorData = await response.json();
                    statusMessage.textContent = `Ocorreu um erro: ${errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Tente novamente.'}`;
                    statusMessage.style.color = 'red';
                }
            } catch (error) {
                statusMessage.textContent = 'Ocorreu um erro na conexão. Verifique sua internet e tente novamente.';
                statusMessage.style.color = 'red';
            }

            setTimeout(() => {
                if(statusMessage.parentNode) {
                    statusMessage.parentNode.removeChild(statusMessage);
                }
            }, 5000);
        });
    }

    // 3. CÓDIGO para a funcionalidade de busca do blog
    const handleSearch = () => {
        const searchInput = document.getElementById("search-input-sidebar");
        const searchTerm = searchInput.value.toLowerCase().trim();
        console.log("Termo de busca:", searchTerm);
        if (searchTerm) {
            // Caminho corrigido para o arquivo de resultados na pasta "blog"
            window.location.href = `blog/search-results.html?query=${encodeURIComponent(searchTerm)}`;
        }
    };

    const searchButton = document.getElementById("search-button-sidebar");
    if (searchButton) {
        console.log("Botão de busca encontrado.");
        searchButton.addEventListener("click", handleSearch);
    } else {
        console.error("Erro: Botão de busca não encontrado no HTML.");
    }
    
    const searchInput = document.getElementById("search-input-sidebar");
    if (searchInput) {
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                handleSearch();
            }
        });
    }

    // Lógica para a página de resultados
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (window.location.pathname.includes('search-results.html') && query) {
        const resultsContainer = document.getElementById('search-results-container');
        const queryDisplay = document.getElementById('search-query-display');
        queryDisplay.textContent = `Você buscou por: "${decodeURIComponent(query)}"`;
        
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) || 
            post.summary.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredPosts.length > 0) {
            filteredPosts.forEach(post => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('search-result-item');
                resultDiv.innerHTML = `
                    <h3><a href="${post.url}">${post.title}</a></h3>
                    <p>${post.summary}</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            resultsContainer.innerHTML = `<p>Nenhum assunto encontrado para a busca por "${decodeURIComponent(query)}".</p>`;
        }
    }
});
