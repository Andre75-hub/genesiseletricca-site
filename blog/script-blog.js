/* script-blog.js — Home + Busca */

/* Utils */
function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return (params.get(name) || "").trim();
}

/* Posts existentes */
const POSTS = [
  {
    slug: "disjuntor.html",
    title: "Disjuntores: Fundamentos e Aplicações",
    excerpt:
      "O disjuntor é peça-chave na proteção contra curtos e sobrecargas. Veja princípios, curvas B/C/D e critérios de dimensionamento...",
    heroClass: "disjuntor-card",
    keywords: ["disjuntor","fundamentos","proteção","quadro","instalação"],
  },
  {
    slug: "idr.html",
    title: "IDR: o que é e para que serve o Interruptor Diferencial Residual",
    excerpt:
      "Proteção de pessoas e prevenção de incêndios: como o IDR detecta fuga de corrente e onde é obrigatório pela NBR 5410...",
    heroClass: "idr-card",
    keywords: ["idr","diferencial","residual","choque","proteção"],
  },
];

/* Filtro de busca */
function filterPosts(query){
  if(!query) return POSTS;
  const q = query.toLowerCase();
  return POSTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.keywords.some(k => k.toLowerCase().includes(q))
  );
}

/* Renderização de cards */
function renderCards(container, posts){
  if(!container) return;
  container.innerHTML = "";
  posts.forEach(p=>{
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

/* Página de resultados de busca */
function initSearchResultsPage(){
  const titleSpan = document.querySelector("#search-results-title span");
  const container = document.getElementById("search-results-container");
  if(!titleSpan || !container) return;

  const q = getQueryParam("query");
  titleSpan.textContent = q || "—";

  const posts = filterPosts(q);
  renderCards(container, posts);

  if(!posts.length){
    const msg = document.createElement("div");
    msg.className = "no-results-message";
    msg.textContent = "Nenhum resultado encontrado.";
    container.parentElement.insertBefore(msg, container);
  }
}

/* Busca da sidebar (home e resultados) */
function initSidebarSearch(){
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input-sidebar");
  if(!form || !input) return;

  form.addEventListener("submit", function(e){
    if(!input.value.trim()){
      e.preventDefault();
      input.focus();
    }
  });
}

/* >>> AJUSTE: limpar o campo de busca ao voltar para a home <<< */
function resetSearchOnHome(){
  const isHome = !!document.querySelector('.post-hero.main-page-hero');
  if(!isHome) return;
  const input = document.getElementById('search-input-sidebar');
  if(input){ input.value = ''; }
}

/* Init */
document.addEventListener("DOMContentLoaded", function(){
  try{
    initSidebarSearch();
    initSearchResultsPage();
    resetSearchOnHome(); // <— mantém a home com o campo limpo/atualizado
  }catch(err){
    console.error("script-blog.js error:", err);
  }
});
