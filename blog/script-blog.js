/* script-blog.js
   - Mantém a busca funcionando (home → search-results)
   - Renderiza cards na página de resultados
   - Não depende de elementos que não existam (checagens seguras)
   - Nenhuma referência a 'quedaenergia'
*/

// Util: obter parâmetro de consulta
function getQueryParam(name) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return (params.get(name) || "").trim();
}

// Dados dos posts (somente os dois existentes)
const POSTS = [
  {
    slug: "disjuntor.html",
    title: "Disjuntor: Fundamentos e aplicações",
    excerpt:
      "A proteção adequada de circuitos elétricos é um dos pilares fundamentais da engenharia elétrica moderna. Entre os dispositivos de proteção mais essenciais encontram-se os disjuntores...",
    heroClass: "disjuntor-card",
    keywords: ["disjuntor", "fundamentos", "proteção", "quadro", "instalação"],
  },
  {
    slug: "idr.html",
    title: "IDR: O que é e para que serve o Interruptor Diferencial Residual",
    excerpt:
      "A Gênesis Elétrica aborda um dos componentes mais cruciais para a segurança: o IDR. Proteção de pessoas e prevenção de incêndios causados por fugas de corrente...",
    heroClass: "idr-card",
    keywords: ["idr", "diferencial", "residual", "choque", "proteção"],
  },
];

// Filtra posts por termo
function filterPosts(query) {
  if (!query) return POSTS;
  const q = query.toLowerCase();
  return POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

// Renderiza cards no container informado
function renderCards(container, posts) {
  if (!container) return;
  container.innerHTML = "";
  posts.forEach((p) => {
    const a = document.createElement("a");
    a.className = "post-card-link";
    a.href = p.slug;

    const article = document.createElement("article");
    article.className = "post-card";

    const imgDiv = document.createElement("div");
    imgDiv.className = `post-card-image ${p.heroClass}`;

    const content = document.createElement("div");
    content.className = "post-card-content";

    const h3 = document.createElement("h3");
    h3.textContent = p.title;

    const pEl = document.createElement("p");
    pEl.innerHTML = `${p.excerpt} <span>Leia mais</span>`;

    content.appendChild(h3);
    content.appendChild(pEl);
    article.appendChild(imgDiv);
    article.appendChild(content);
    a.appendChild(article);
    container.appendChild(a);
  });
}

// Inicialização da página de resultados
function initSearchResultsPage() {
  const titleSpan = document.querySelector("#search-results-title span");
  const container = document.getElementById("search-results-container");
  if (!titleSpan || !container) return; // não é a página de resultados

  const q = getQueryParam("query");
  titleSpan.textContent = q || "—";

  const posts = filterPosts(q);
  renderCards(container, posts);

  if (!posts.length) {
    const msg = document.createElement("div");
    msg.className = "no-results-message";
    msg.textContent = "Nenhum resultado encontrado.";
    container.parentElement.insertBefore(msg, container);
  }
}

// Inicializa a busca da sidebar (home e resultados)
function initSidebarSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input-sidebar");
  if (!form || !input) return;

  form.addEventListener("submit", function (e) {
    // comporta-se como submit normal (action já aponta para search-results.html)
    // mas garantimos que o valor não vem em branco por algum autocomplete esquisito
    if (!input.value.trim()) {
      e.preventDefault();
      input.focus();
    }
  });
}

// DOM ready
document.addEventListener("DOMContentLoaded", function () {
  try {
    initSidebarSearch();
    initSearchResultsPage();
  } catch (err) {
    // evita quebrar a página se algo inesperado ocorrer
    console.error("script-blog.js error:", err);
  }
});
