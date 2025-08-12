// Link "Blog" do topo vai para o blog
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a').forEach(function(a){
    if(a.textContent && a.textContent.trim().toLowerCase() === 'blog'){
      a.href = 'https://genesiseletricca.com.br/blog/';
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
});

// Máscara BR para todos os campos "Telefone"
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

// Preenche o campo digitável quando escolhe no select (form pedido)
function preencherTipoServico(valor){
  var tf = document.getElementById('tipoFinal');
  if(tf){ tf.value = valor || ''; }
}

// Abrir formulários
function mostrarFormularioPedido() {
  var servicoSelecionado = document.getElementById("tipoServico").value;
  var servicoDigitado = document.getElementById("suporte").value;
  var tipo = servicoSelecionado || servicoDigitado;
  if (!tipo) {
    alert("Por favor, selecione ou digite o serviço.");
    return;
  }
  var box = document.getElementById("formularioPedido");
  if (box) {
    box.style.display = "block";
    var tipoFinal = document.getElementById("tipoFinal");
    if (tipoFinal) tipoFinal.value = tipo;
    box.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

function abrirUrgencia() {
  var box = document.getElementById("formUrgencia");
  if (box) {
    box.style.display = "block";
    var tipo = document.getElementById("u-tipo");
    if (tipo && !tipo.value) tipo.placeholder = "Tipo de serviço (urgência)";
    box.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

// ===== Utilitários de validação =====
function isTelValid(v){
  var digits = (v || '').replace(/\D/g, '');
  return /^\d{10,11}$/.test(digits);
}
function setErr(id, show, text){
  var el = document.getElementById(id);
  if(!el) return;
  if(show){ el.hidden = false; if(text) el.textContent = text; }
  else { el.hidden = true; }
}

// ===== PEDIDO =====
(function(){
  var tried = false;
  var req = [
    { id: 'nome',      err: 'err-nome',      msg: 'Informe seu nome.' },
    { id: 'telefone',  err: 'err-telefone',  msg: 'Informe um telefone válido.', custom:'tel' },
    { id: 'bairro',    err: 'err-bairro',    msg: 'Informe o bairro.' },
    { id: 'municipio', err: 'err-municipio', msg: 'Informe o município.' },
    { id: 'tipoFinal', err: 'err-tipo',      msg: 'Selecione ou digite o serviço.' }
  ];

  function validate(show){
    var ok = true;
    req.forEach(function(f){
      var el = document.getElementById(f.id);
      var val = (el && el.value || '').trim();
      var bad = f.custom === 'tel' ? !isTelValid(val) : !val;
      if(bad){ ok = false; if(show) setErr(f.err, true, f.msg); }
      else   { if(show) setErr(f.err, false); }
    });
    return ok;
  }

  window.enviarWhatsAppPedido = function (){
    tried = true;
    if(!validate(true)) return;

    var nome = document.getElementById("nome").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var email = (document.getElementById("email")?.value || "").trim();
    var bairro = document.getElementById("bairro").value.trim();
    var municipio = document.getElementById("municipio").value.trim();
    var tipo = document.getElementById("tipoFinal").value.trim();
    var obs = (document.getElementById("observacao")?.value || "").trim();

    var msg = `Olá! Gostaria de solicitar um serviço.%0A` +
              `Nome: ${nome}%0A` +
              `Telefone: ${telefone}%0A` +
              `Bairro: ${bairro}%0A` +
              `Município: ${municipio}%0A` +
              (email ? `E-mail: ${email}%0A` : '') +
              `Serviço: ${tipo}%0A` +
              (obs ? `Observação: ${obs}` : '');

    window.open(`https://wa.me/5531975002129?text=${msg}`, '_blank');
  };

  document.addEventListener('input', function(){
    if(!tried) return;
    validate(true);
  });
})();

// ===== URGÊNCIA (form separado) =====
(function(){
  var tried = false;
  var req = [
    { id: 'u-nome',      err: 'u-err-nome',      msg: 'Informe seu nome.' },
    { id: 'u-telefone',  err: 'u-err-telefone',  msg: 'Informe um telefone válido.', custom:'tel' },
    { id: 'u-bairro',    err: 'u-err-bairro',    msg: 'Informe o bairro.' },
    { id: 'u-municipio', err: 'u-err-municipio', msg: 'Informe o município.' },
    { id: 'u-tipo',      err: 'u-err-tipo',      msg: 'Informe o tipo de serviço.' }
  ];

  function validate(show){
    var ok = true;
    req.forEach(function(f){
      var el = document.getElementById(f.id);
      var val = (el && el.value || '').trim();
      var bad = f.custom === 'tel' ? !isTelValid(val) : !val;
      if(bad){ ok = false; if(show) setErr(f.err, true, f.msg); }
      else   { if(show) setErr(f.err, false); }
    });
    return ok;
  }

  window.enviarWhatsAppUrgencia = function (){
    tried = true;
    if(!validate(true)) return;

    var nome = document.getElementById("u-nome").value.trim();
    var telefone = document.getElementById("u-telefone").value.trim();
    var bairro = document.getElementById("u-bairro").value.trim();
    var municipio = document.getElementById("u-municipio").value.trim();
    var tipo = document.getElementById("u-tipo").value.trim();
    var obs = (document.getElementById("u-observacao")?.value || "").trim();

    var msg = `URGÊNCIA - Atendimento imediato%0A` +
              `Nome: ${nome}%0A` +
              `Telefone: ${telefone}%0A` +
              `Bairro: ${bairro}%0A` +
              `Município: ${municipio}%0A` +
              `Tipo de serviço: ${tipo}%0A` +
              (obs ? `Observação: ${obs}` : '');

    window.open(`https://wa.me/5531975002129?text=${msg}`, '_blank');
  };

  document.addEventListener('input', function(e){
    if(!tried) return;
    var id = e.target && e.target.id || '';
    if(id.startsWith('u-')) validate(true);
  });
})();
