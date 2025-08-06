document.addEventListener('DOMContentLoaded', () => {
    // Lista de posts para a busca
    const posts = [
        {
            title: "Disjuntor: Fundamentos e aplicações",
            summary: "A proteção adequada de circuitos elétricos é um dos pilares fundamentais da engenharia elétrica moderna. Entre os dispositivos de proteção mais essenciais encontram-se os disjuntores, que desempenham um papel crucial na preservação da integridade de instalações elétricas e na proteção de vidas humanas. Este artigo apresenta uma análise técnica abrangente sobre disjuntores, explorando seus princípios de funcionamento, classificações e melhores práticas...",
            url: "disjuntor.html",
            keywords: ["disjuntor", "proteção", "elétrica", "curto-circuito", "sobrecarga", "NBR 5410", "segurança", "disjuntores", "circuito"]
        },
        {
            title: "IDR: O que é e para que serve o Interruptor Diferencial Residual",
            summary: "A Gênesis Elétrica, empresa especializada em instalações elétricas de baixa tensão, aborda um dos componentes mais cruciais para a segurança em instalações elétricas: o Interruptor Diferencial Residual, popularmente conhecido como IDR. Este equipamento, muitas vezes subestimado, desempenha um papel vital na proteção de pessoas contra choques elétricos e na prevenção de incêndios causados por fugas de corrente...",
            url: "idr.html",
            keywords: ["idr", "interruptor", "diferencial", "residual", "fuga de corrente", "choque elétrico", "segurança", "eletricidade"]
        }
    ];

    // Lógica para o formulário de busca
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            // A submissão do formulário já fará a redireção para search-results.html com a query
        });
    }

    // Lógica para a página de resultados da busca
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsTitle = document.getElementById('search-results-title');

    if (searchResultsContainer && searchResultsTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');

        if (query) {
            searchResultsTitle.innerHTML = `Resultados da busca por: <span>${query}</span>`;
            const normalizedQuery = query.toLowerCase().trim();
            const results = posts.filter(post => {
                const titleMatch = post.title.toLowerCase().includes(normalizedQuery);
                const summaryMatch = post.summary.toLowerCase().includes(normalizedQuery);
                const keywordMatch = post.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery));
                return titleMatch || summaryMatch || keywordMatch;
            });

            if (results.length > 0) {
                results.forEach(post => {
                    const postCard = document.createElement('a');
                    postCard.href = post.url;
                    postCard.classList.add('post-card-link');
                    postCard.innerHTML = `
                        <article class="post-card">
                            <div class="post-card-image ${post.url.replace('.html', '-card')}"></div>
                            <div class="post-card-content">
                                <h3>${post.title}</h3>
                                <p>${post.summary} <span>Leia mais</span></p>
                            </div>
                        </article>
                    `;
                    searchResultsContainer.appendChild(postCard);
                });
            } else {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = "Nenhum assunto encontrado.";
                noResultsMessage.classList.add('no-results-message');
                searchResultsContainer.appendChild(noResultsMessage);
            }
        }
    }
});

// Outras funções do blog, como o compartilhamento, podem ser adicionadas aqui
// Exemplo:
function sharePost(platform) {
    const postUrl = window.location.href;
    const postTitle = document.title;
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}

function copyLink() {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    const copyBtn = document.querySelector('.social-btn.copy');
    if (copyBtn) {
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
    }
}
