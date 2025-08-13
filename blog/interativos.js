/* interativos.js — COMPLETO, seguro e compatível
   - Abas (Consumo/Cabos)
   - Calculadora Consumo (kWh e custo mensal) + PDF
   - Calculadora Cabos (dimensão aproximada) + PDF
   - Quiz simples (10 perguntas mock) + barra de desempenho + refazer
   - Reações (like/dislike) + contagem de participantes
   - Todas rotinas só executam se os elementos existirem na página
*/

/* ===== Utils ===== */
function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
function toNum(v){ const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; }
function show(el){ if(el) el.style.display = ''; }
function hide(el){ if(el) el.style.display = 'none'; }

/* ===== Tabs das calculadoras ===== */
function initTabs(){
  const tabs = $all('.tab-button');
  const panels = $all('.calc-content');
  if(!tabs.length || !panels.length) return;

  tabs.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const tab = btn.dataset.tab;
      tabs.forEach(b=>b.classList.toggle('active', b===btn));
      panels.forEach(p=>p.classList.toggle('active', p.id === `calc-${tab}`));
    });
  });
}

/* ===== Calculadora de Consumo ===== */
function initCalcConsumo(){
  const btn = $('#btn-calc-consumo');
  const out = $('#consumo-result');
  const pot = $('#potencia');
  const hrs = $('#horas');
  const tarifa = $('#tarifa');
  const btnPdf = $('#btn-pdf-consumo');
  const btnReset = $('#btn-reset-consumo');

  if(!btn || !out || !pot || !hrs || !tarifa) return;

  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const P = toNum(pot.value);
    const H = toNum(hrs.value);
    const T = toNum(tarifa.value);
    const kWhMes = (P * H * 30) / 1000;
    const custo = kWhMes * T;

    out.innerHTML = `
      <div><strong>Consumo mensal:</strong> ${kWhMes.toFixed(2)} kWh</div>
      <div><strong>Custo estimado:</strong> R$ ${custo.toFixed(2)}</div>
    `;
    show(out);
  });

  if(btnPdf){
    btnPdf.addEventListener('click', (e)=>{
      e.preventDefault();
      const jsPDF = window.jspdf && window.jspdf.jsPDF;
      if(!jsPDF){ alert('Biblioteca jsPDF não carregada.'); return; }
      const doc = new jsPDF();
      doc.text('Relatório - Consumo de Energia', 10, 10);
      doc.text(out.textContent || 'Sem resultados.', 10, 20);
      doc.save('consumo-energia.pdf');
    });
  }

  if(btnReset){
    btnReset.addEventListener('click', (e)=>{
      e.preventDefault();
      pot.value = ''; hrs.value = ''; tarifa.value = '';
      hide(out);
      out.innerHTML = '';
    });
  }
}

/* ===== Calculadora de Cabos (bem simplificada) ===== */
function initCalcCabo(){
  const btn = $('#btn-calc-cabo');
  const out = $('#cabo-result');
  const I = $('#corrente');
  const D = $('#distancia');
  const V = $('#tensao');
  const M = $('#instalacao');
  const btnPdf = $('#btn-pdf-cabo');
  const btnReset = $('#btn-reset-cabo');

  if(!btn || !out || !I || !D || !V || !M) return;

  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const corrente = toNum(I.value);
    const distancia = toNum(D.value);
    const tensao = toNum(V.value);
    const metodo = M.value;

    // dimensionamento aproximado (didático)
    let secao = 1.5;
    if(corrente > 12) secao = 2.5;
    if(corrente > 18) secao = 4;
    if(corrente > 25) secao = 6;
    if(corrente > 32) secao = 10;
    if(corrente > 45) secao = 16;
    if(corrente > 60) secao = 25;
    if(corrente > 80) secao = 35;
    if(corrente > 100) secao = 50;

    out.innerHTML = `
      <div><strong>Corrente:</strong> ${corrente.toFixed(1)} A</div>
      <div><strong>Tensão:</strong> ${tensao} V</div>
      <div><strong>Método:</strong> ${metodo || '—'}</div>
      <div><strong>Seção sugerida (aprox.):</strong> ${secao} mm² (cobre)</div>
      <small>Resultado didático. Consulte tabelas NBR 5410 e condições de instalação.</small>
    `;
    show(out);
  });

  if(btnPdf){
    btnPdf.addEventListener('click', (e)=>{
      e.preventDefault();
      const jsPDF = window.jspdf && window.jspdf.jsPDF;
      if(!jsPDF){ alert('Biblioteca jsPDF não carregada.'); return; }
      const doc = new jsPDF();
      doc.text('Relatório - Dimensionamento de Cabos (aprox.)', 10, 10);
      doc.text(out.textContent || 'Sem resultados.', 10, 20);
      doc.save('dimensionamento-cabos.pdf');
    });
  }

  if(btnReset){
    btnReset.addEventListener('click', (e)=>{
      e.preventDefault();
      I.value=''; D.value=''; V.value='127'; M.value='';
      hide(out); out.innerHTML='';
    });
  }
}

/* ===== Quiz simples ===== */
const QUIZ = [
  { q: 'A NBR 5410 trata de instalações elétricas de baixa tensão?', a: ['Sim','Não'], c: 0 },
  { q: 'IDR protege principalmente pessoas contra choque elétrico?', a: ['Sim','Não'], c: 0 },
  { q: 'DPS protege contra surtos de tensão?', a: ['Sim','Não'], c: 0 },
  { q: 'Aterramento dispensa DR/IDR?', a: ['Sim','Não'], c: 1 },
  { q: 'Curva C de disjuntor é mais “lenta” que a B para partidas?', a: ['Sim','Não'], c: 0 },
  { q: 'Tomadas de áreas molhadas exigem proteção DR/IDR?', a: ['Sim','Não'], c: 0 },
  { q: 'Seção do condutor pode ser escolhida só pela tensão?', a: ['Sim','Não'], c: 1 },
  { q: 'Neutro e proteção (PE) podem ser o mesmo condutor (TN-C)?', a: ['Pode', 'Não deve'], c: 1 },
  { q: 'QDC é Quadro de Distribuição de Circuitos?', a: ['Sim','Não'], c: 0 },
  { q: 'Ligação “T” improvisada em chuveiro é segura?', a: ['Sim','Não'], c: 1 },
];

function initQuiz(){
  const counter = $('#quiz-counter');
  const qEl = $('#question');
  const opts = $('#options');
  const nextBtn = $('#next-question');
  const scoreWrap = $('#quiz-score');
  const scoreDetails = $('#score-details');
  const scoreFill = $('#score-fill');
  const refazer = $('#btn-refazer');

  if(!counter || !qEl || !opts || !nextBtn) return;

  let idx = 0;
  let score = 0;
  let answered = false;

  function render(){
    const item = QUIZ[idx];
    counter.textContent = `Pergunta ${idx+1} de ${QUIZ.length}`;
    qEl.textContent = item.q;
    opts.innerHTML = '';
    item.a.forEach((txt, i)=>{
      const b = document.createElement('button');
      b.className = 'sidebar-calc-button';
      b.textContent = txt;
      b.addEventListener('click', ()=>{
        if(answered) return;
        answered = true;
        if(i === item.c){ score++; b.style.outline = '2px solid #16a34a'; }
        else{ b.style.outline = '2px solid #dc2626'; }
      });
      opts.appendChild(b);
    });
  }

  function finish(){
    if(scoreWrap) show(scoreWrap);
    if(scoreDetails) scoreDetails.textContent = `Acertos: ${score} de ${QUIZ.length}`;
    const perc = Math.round((score / QUIZ.length) * 100);
    if(scoreFill) scoreFill.style.width = perc + '%';
  }

  render();

  nextBtn.addEventListener('click', ()=>{
    if(!answered) return;
    idx++;
    answered = false;
    if(idx < QUIZ.length) render();
    else finish();
  });

  if(refazer){
    refazer.addEventListener('click', ()=>{
      idx = 0; score = 0; answered = false;
      if(scoreWrap) hide(scoreWrap);
      render();
    });
  }
}

/* ===== Reações (like/dislike) ===== */
function initReactions(){
  const likeBtn        = $('#quiz-like');
  const dislikeBtn     = $('#quiz-dislike');
  const likeCountEl    = $('#like-count');
  const dislikeCountEl = $('#dislike-count');
  const participantsEl = $('#participants-count') || $('#participants');

  if(!likeBtn || !dislikeBtn || !likeCountEl || !dislikeCountEl) return;

  function incText(el){ el.textContent = String((parseInt(el.textContent||'0',10)||0) + 1); }
  function incPart(){ if(participantsEl) incText(participantsEl); }

  likeBtn.addEventListener('click', ()=>{ incText(likeCountEl); incPart(); });
  dislikeBtn.addEventListener('click', ()=>{ incText(dislikeCountEl); incPart(); });
}

/* ===== DOM Ready ===== */
document.addEventListener('DOMContentLoaded', function(){
  try{
    initTabs();
    initCalcConsumo();
    initCalcCabo();
    initQuiz();
    initReactions();
  }catch(err){
    console.error('interativos.js error:', err);
  }
});
