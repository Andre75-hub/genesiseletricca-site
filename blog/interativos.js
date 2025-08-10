// interativos.js

// Utils
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// Tabs
function switchTab(tipo) {
  $$('.calc-content').forEach(el => el.classList.remove('active'));
  const target = $('#calc-' + tipo);
  if (target) target.classList.add('active');

  $$('.tab-button').forEach(btn => btn.classList.remove('active'));
  $$('.tab-button').forEach(btn => {
    const t = btn.dataset.tab;
    if (t === tipo) btn.classList.add('active');
  });
}

// Consumo
function calcularConsumo() {
  const potencia = parseFloat($('#potencia')?.value);
  const horas = parseFloat($('#horas')?.value);
  const tarifa = parseFloat($('#tarifa')?.value) || 0.75;
  if (!potencia || !horas) { alert('Preencha potência e horas de uso!'); return; }

  const consumoKwh = (potencia * horas * 30) / 1000;
  const custoMensal = consumoKwh * tarifa;

  let categoria = '', cor = '';
  if (consumoKwh < 30) { categoria = 'Baixo'; cor = '#28a745'; }
  else if (consumoKwh < 100) { categoria = 'Moderado'; cor = '#ffc107'; }
  else { categoria = 'Alto'; cor = '#dc3545'; }

  window.dadosConsumo = { potencia, horas, tarifa, consumoKwh, custoMensal, categoria };

  const res = $('#consumo-result');
  if (res) {
    res.innerHTML = `
      <div class="sidebar-result-highlight">${consumoKwh.toFixed(1)} kWh/mês</div>
      <p><strong>Custo:</strong> R$ ${custoMensal.toFixed(2)}</p>
      <p><strong>Nível:</strong> <span style="color:${cor};">${categoria}</span></p>`;
    res.style.display = 'block';
  }
}

function gerarPDFConsumo() {
  if (!window.dadosConsumo) { alert('Execute o cálculo primeiro!'); return; }
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) { alert('jsPDF não carregou.'); return; }
  const d = window.dadosConsumo;
  const doc = new jsPDF();
  doc.setFontSize(16); doc.text('Gênesis Elétrica - Consumo', 20, 20);
  doc.setFontSize(12);
  doc.text(`Potência: ${d.potencia} W`, 20, 40);
  doc.text(`Horas/dia: ${d.horas} h`, 20, 50);
  doc.text(`Consumo: ${d.consumoKwh.toFixed(2)} kWh/mês`, 20, 60);
  doc.text(`Custo: R$ ${d.custoMensal.toFixed(2)}/mês`, 20, 70);
  doc.text(`Categoria: ${d.categoria}`, 20, 80);
  doc.save('consumo-genesis.pdf');
}

// Cabos (simplificado)
function calcularCabo() {
  const corrente = parseFloat($('#corrente')?.value);
  const distancia = parseFloat($('#distancia')?.value);
  const tensao = parseFloat($('#tensao')?.value);
  const instalacao = $('#instalacao')?.value;
  if (!corrente || !distancia || !instalacao) { alert('Preencha todos os campos!'); return; }

  const capacidades = { A1:[15,21,28,36,48,68], B1:[11,15,19,26,34,46], C:[15,20,27,36,49,67] };
  const secoes = [1.5,2.5,4,6,10,16];
  const caps = capacidades[instalacao] || capacidades.B1;

  let secaoEscolhida = secoes[secoes.length-1];
  for (let i=0;i<caps.length;i++) if (caps[i] >= corrente) { secaoEscolhida = secoes[i]; break; }

  const resistencia = (0.0175 * distancia) / secaoEscolhida; // Ω aprox (cobre)
  const quedaTensao = (corrente * resistencia * 2);          // ida/volta
  const quedaPercentual = (quedaTensao / tensao) * 100;
  const cor = quedaPercentual <= 4 ? '#28a745' : '#dc3545';

  const disjuntores = [10,16,20,25,32,40,50,63];
  const disjuntor = disjuntores.find(d => d >= corrente) || 63;

  window.dadosCabo = { corrente, distancia, tensao, instalacao, secaoEscolhida, quedaPercentual, disjuntor };

  const res = $('#cabo-result');
  if (res) {
    res.innerHTML = `
      <div class="sidebar-result-highlight">${secaoEscolhida} mm²</div>
      <p><strong>Queda:</strong> <span style="color:${cor};">${quedaPercentual.toFixed(1)}%</span></p>
      <p><strong>Disjuntor:</strong> ${disjuntor} A</p>`;
    res.style.display = 'block';
  }
}

function gerarPDFCabo() {
  if (!window.dadosCabo) { alert('Execute o cálculo primeiro!'); return; }
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) { alert('jsPDF não carregou.'); return; }
  const d = window.dadosCabo;
  const doc = new jsPDF();
  doc.setFontSize(16); doc.text('Gênesis Elétrica - Dimensionamento', 20, 20);
  doc.setFontSize(12);
  doc.text(`Corrente: ${d.corrente} A`, 20, 40);
  doc.text(`Distância: ${d.distancia} m`, 20, 50);
  doc.text(`Tensão: ${d.tensao} V`, 20, 60);
  doc.text(`Seção: ${d.secaoEscolhida} mm²`, 20, 70);
  doc.text(`Queda: ${d.quedaPercentual.toFixed(2)} %`, 20, 80);
  doc.text(`Disjuntor: ${d.disjuntor} A`, 20, 90);
  doc.save('cabo-genesis.pdf');
}

// Quiz
const perguntasQuiz = [
  { pergunta: "Seção mínima de condutor para circuito de iluminação (NBR 5410)?", alternativas: ["1,0 mm²","1,5 mm²","2,5 mm²","4,0 mm²"], correta: 1, explicacao: "Iluminação: mínimo 1,5 mm²." },
  { pergunta: "Sensibilidade típica do DR para uso residencial:", alternativas: ["10 mA","30 mA","100 mA","300 mA"], correta: 1, explicacao: "Residencial: 30 mA." },
  { pergunta: "Condutor 2,5 mm² (método B1) suporta até aprox.:", alternativas: ["15 A","19 A","21 A","24 A"], correta: 1, explicacao: "B1 ~ 19 A (aprox.)." },
  { pergunta: "Queda de tensão máxima recomendada em circuito terminal:", alternativas: ["1%","2%","3%","4%"], correta: 3, explicacao: "Recomendação usual: até 4% nos terminais." },
  { pergunta: "Altura recomendada para interruptores (centro da peça):", alternativas: ["1,20 m","1,30 m","1,50 m","1,60 m"], correta: 2, explicacao: "Prática comum ~1,50 m." },
  { pergunta: "Número mínimo de tomadas (TUG) em sala até 6 m de perímetro:", alternativas: ["1","2","3","4"], correta: 1, explicacao: "Regra base: a cada 5 m de perímetro (mín. 2)." },
  { pergunta: "Aterramento: resistência típica buscada em residencial:", alternativas: ["≤ 10 Ω","≤ 15 Ω","≤ 25 Ω","≤ 50 Ω"], correta: 2, explicacao: "Valor de referência comum: ≤ 25 Ω." },
  { pergunta: "Circuitos de chuveiro elétrico devem ser:", alternativas: ["Compartilhados","Exclusivos","Em paralelo com iluminação","Em série com TUGs"], correta: 1, explicacao: "Circuito dedicado." },
  { pergunta: "Cor do condutor de proteção (PE):", alternativas: ["Azul-claro","Verde/amarelo","Preto","Vermelho"], correta: 1, explicacao: "PE: verde/amarelo." },
  { pergunta: "Identificação de neutro em baixa tensão:", alternativas: ["Preto","Cinza","Azul-claro","Marrom"], correta: 2, explicacao: "Neutro: azul-claro." }
];

let idx = 0, acertos = 0, respondida = false;

function renderPergunta() {
  const qEl = $('#question'), oEl = $('#options'), counter = $('#quiz-counter');
  if (!qEl || !oEl || !counter) return;

  if (idx >= perguntasQuiz.length) {
    $('#quiz-container').style.display = 'none';
    $('#next-question').style.display = 'none';
    const score = $('#quiz-score'), fill = $('#score-fill'), det = $('#score-details'), msg = $('#performance-message');
    const pct = Math.round((acertos / perguntasQuiz.length) * 100);
    score.style.display = 'block';
    fill.style.width = pct + '%';
    det.textContent = `Você acertou ${acertos} de ${perguntasQuiz.length} (${pct}%).`;
    msg.textContent = pct >= 80 ? "Excelente! 🔌" : (pct >= 50 ? "Bom! Continue estudando. 🧰" : "Vamos revisar a NBR 5410. 📘");
    return;
  }

  const item = perguntasQuiz[idx];
  counter.textContent = `Pergunta ${idx+1} de ${perguntasQuiz.length}`;
  qEl.textContent = item.pergunta;
  oEl.innerHTML = '';
  respondida = false;
  $('#next-question').style.display = 'none';

  item.alternativas.forEach((alt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sidebar-quiz-option';
    btn.innerHTML = `<span>${alt}</span><span class="status-icon"></span>`;
    btn.addEventListener('click', () => {
      if (respondida) return;
      respondida = true;
      if (i === item.correta) {
        btn.classList.add('correct');
        btn.querySelector('.status-icon').classList.add('correct');
        btn.querySelector('.status-icon').textContent = '✓';
        acertos++;
      } else {
        btn.classList.add('incorrect');
        btn.querySelector('.status-icon').classList.add('incorrect');
        btn.querySelector('.status-icon').textContent = '×';
        const corret = $('#options').children[item.correta];
        if (corret) {
          corret.classList.add('show-correct');
          corret.querySelector('.status-icon').classList.add('correct');
          corret.querySelector('.status-icon').textContent = '✓';
        }
      }
      const exp = document.createElement('div');
      exp.style.marginTop = '8px';
      exp.style.fontSize = '0.85em';
      exp.textContent = item.explicacao || '';
      oEl.appendChild(exp);
      $('#next-question').style.display = 'inline-block';
    });
    oEl.appendChild(btn);
  });
}

function proximaPergunta() { idx++; renderPergunta(); }
function reiniciarQuiz() {
  idx = 0; acertos = 0; respondida = false;
  $('#quiz-container').style.display = '';
  $('#quiz-score').style.display = 'none';
  renderPergunta();
}

// Bind inicial
document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  $$('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Botões das calculadoras
  $('#btn-calc-consumo')?.addEventListener('click', calcularConsumo);
  $('#btn-pdf-consumo')?.addEventListener('click', gerarPDFConsumo);
  $('#btn-calc-cabo')?.addEventListener('click', calcularCabo);
  $('#btn-pdf-cabo')?.addEventListener('click', gerarPDFCabo);

  // Quiz
  $('#next-question')?.addEventListener('click', proximaPergunta);
  $('#btn-refazer')?.addEventListener('click', reiniciarQuiz);

  // Primeira pergunta + tab padrão
  switchTab('consumo');
  renderPergunta();
});
