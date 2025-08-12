// ===== BLOG link do topo abre o blog correto =====
document.addEventListener('DOMContentLoaded', function(){
  var links = document.querySelectorAll('a');
  links.forEach(function(a){
    if(a.textContent && a.textContent.trim().toLowerCase() === 'blog'){
      a.href = 'https://genesiseletricca.com.br/blog/';
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
});

// ===== Mostrar formulário final com o tipo selecionado/digitado =====
function mostrarFormulario() {
  var servicoSelecionado = document.getElementById("tipoServico").value;
  var servicoDigitado = document.getElementById("suporte").value;
  var tipo = servicoSelecionado || servicoDigitado;
  if (!tipo) {
    alert("Por favor, selecione ou digite o serviço.");
    return;
  }
  document.getElementById("formularioExtra").style.display = "block";
  var tipoFinal = document.getElementById("tipoFinal");
  if (tipoFinal) tipoFinal.value = tipo;
}

// ===== Abrir urgência =====
function abrirUrgencia() {
  var form = document.getElementById("formularioExtra");
  if (form) {
    form.style.display = "block";
    var tipoServico = document.getElementById("tipoFinal");
    if (tipoServico) {
      if (!tipoServico.value) tipoServico.placeholder = "Tipo de serviço";
      tipoServico.focus();
    }
  }
}

// ===== Botão flutuante "Serviço de urgência" (restaurado) =====
(function(){
  function findFormSection(){
    return document.getElementById('formulario') ||
           document.getElementById('formulario-servico') ||
           document.querySelector('section[id*="form"]') ||
           document.getElementById('formUrgencia') || document.body;
  }
  function scrollToFormSection(){
    var t = findFormSection();
    if(t && t.scrollIntoView){ t.scrollIntoView({behavior:'smooth', block:'start'}); }
  }
  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('floatingUrgent') || document.querySelector('.floating-urgent');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'floatingUrgent';
      btn.type = 'button';
      btn.textContent = 'Serviço de urgência';
      document.body.appendChild(btn);
    }
    btn.addEventListener('click', function(e){
      e.preventDefault();
      try { if(typeof abrirUrgencia==='function'){ abrirUrgencia(); } } catch(_) {}
      scrollToFormSection();
    });
  });
})();

// ===== Máscara BR para todos os campos "Telefone" =====
document.addEventListener("DOMContentLoaded", function () {
  var inputsTel = Array.from(document.querySelectorAll('input[placeholder*="Telefone" i]'));
  inputsTel.forEach(function(telefoneInput){
    telefoneInput.addEventListener("input", function (e) {
      var value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      var formatado = "";
      if (value.length > 0) formatado += "(" + value.substring(0, 2);
      if (value.length >= 3) formatado += ") " + value.substring(2, 7);
      if (value.length >= 8) formatado += "-" + value.substring(7, 11);
      else if (value.length > 7) formatado += value.substring(7);
      e.target.value = formatado;
    });
  });
});

// ===== Validação com mensagens abaixo (sem borda vermelha) =====
document.addEventListener('DOMContentLoaded', function(){
  var required = [
    { id: 'nome',        msg: 'Informe seu nome.' },
    { id: 'telefone',    msg: 'Informe um telefone válido.', custom: 'tel' },
    { id: 'bairro',      msg: 'Informe o bairro.' },
    { id: 'municipio',   msg: 'Informe o município.' },
    { id: 'tipoFinal',   msg: 'Selecione ou digite o serviço.' }
  ];

  function isTelValid(v){
    var digits = (v || '').replace(/\D/g, '');
    return /^\d{10,11}$/.test(digits);
  }

  function setErr(id, show, text){
    var el = document.getElementById('err-' + id);
    if(!el) return;
    if(show){ el.hidden = false; if(text) el.textContent = text; }
    else { el.hidden = true; }
  }

  required.forEach(function(f){
    var inp = document.getElementById(f.id);
    if(!inp) return;
    var handler = function(){
      var val = (inp.value || '').trim();
      if(f.custom === 'tel'){ setErr(f.id, !isTelValid(val), f.msg); }
      else { setErr(f.id, !val, f.msg); }
    };
    inp.addEventListener('input', handler);
    inp.addEventListener('change', handler);
  });

  // Envio via WhatsApp com validação dos campos
  window.enviarWhatsAppFinal = function (){
    var ok = true;
    required.forEach(function(f){
      var inp = document.getElementById(f.id);
      if(!inp) return;
      var val = (inp.value || '').trim();
      if(f.custom === 'tel'){ if(!isTelValid(val)) ok = false, setErr(f.id, true, f.msg); else setErr(f.id, false); }
      else { if(!val) ok = false, setErr(f.id, true, f.msg); else setErr(f.id, false); }
    });
    if(!ok) return;

    var nome = document.getElementById("nome").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var email = (document.getElementById("email")?.value || "").trim();
    var bairro = document.getElementById("bairro").value.trim();
    var municipio = document.getElementById("municipio").value.trim();
    var tipo = document.getElementById("tipoFinal").value.trim();
    var obs = (document.getElementById("observacao")?.value || "").trim();

    var mensagem = `Olá! Gostaria de solicitar um serviço.%0A` +
                   `Nome: ${nome}%0A` +
                   `Telefone: ${telefone}%0A` +
                   `Bairro: ${bairro}%0A` +
                   `Município: ${municipio}%0A` +
                   (email ? `E-mail: ${email}%0A` : '') +
                   `Serviço: ${tipo}%0A` +
                   (obs ? `Observação: ${obs}` : '');

    window.open(`https://wa.me/5531975002129?text=${mensagem}`, '_blank');
  };
});

// ===== (Opcional) Enviar orçamento simples (mantido) =====
function enviarWhatsApp() {
  var servico = document.getElementById('servico')?.value || '';
  var descricao = document.getElementById('descricao')?.value || '';
  var mensagem = encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para: ${servico}. ${descricao}`);
  window.open(`https://wa.me/5531975002129?text=${mensagem}`, '_blank');
}
