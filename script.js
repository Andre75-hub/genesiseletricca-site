// ===== Funções originais + correções pontuais =====

// Botão flutuante "Serviço de urgência" + scroll suave
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
      btn.style.cssText = 'position:fixed;right:20px;bottom:24px;z-index:2000;background:#d9534f;color:#fff;border:none;padding:12px 18px;border-radius:50px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.2)';
      document.body.appendChild(btn);
    }
    btn.addEventListener('click', function(e){
      e.preventDefault();
      try { if(typeof abrirUrgencia==='function'){ abrirUrgencia(); } } catch(e){}
      scrollToFormSection();
    });
  });
})();

// Abre/fecha formulário de urgência (mantido como no seu HTML)
function abrirUrgencia() {
  const form = document.getElementById("formularioExtra");
  if (form) {
    form.style.display = "block";
    const tipoServico = document.getElementById("tipoFinal");
    if (tipoServico) {
      tipoServico.value = "";
      tipoServico.placeholder = "Tipo de serviço";
      tipoServico.focus();
    }
  }
}

// Dispara WhatsApp (mantido)
function enviarWhatsApp() {
  const servico = document.getElementById('servico')?.value || '';
  const descricao = document.getElementById('descricao')?.value || '';
  const mensagem = encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para: ${servico}. ${descricao}`);
  window.open(`https://wa.me/5531975002129?text=${mensagem}`, '_blank');
}

// Exibe formulário final com o tipo de serviço selecionado/digitado
function mostrarFormulario() {
  let servicoSelecionado = document.getElementById("tipoServico").value;
  let servicoDigitado = document.getElementById("suporte").value;
  let tipo = servicoSelecionado || servicoDigitado;
  if (!tipo) {
    alert("Por favor, selecione ou digite o serviço.");
    return;
  }
  document.getElementById("formularioExtra").style.display = "block";
  document.getElementById("tipoFinal").value = tipo;
}

// Envia WhatsApp com os dados do formulário final (corrigido id de localização)
function enviarWhatsAppFinal() {
  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("telefone").value;
  let email = document.getElementById("email").value;
  let local = document.getElementById("localizacaoUsuario").value; // id correto
  let tipo = document.getElementById("tipoFinal").value;
  let obs = document.getElementById("observacao").value;

  let mensagem = `Olá! Gostaria de solicitar um serviço.%0A` +
                 `Nome: ${nome}%0A` +
                 `Telefone: ${telefone}%0A` +
                 `E-mail: ${email}%0A` +
                 `Localização: ${local}%0A` +
                 `Serviço: ${tipo}%0A` +
                 `Observação: ${obs}`;

  window.open(`https://wa.me/5531975002129?text=${mensagem}`, '_blank');
}

// Máscara simples de telefone (mantida)
document.addEventListener("DOMContentLoaded", function () {
  const telefoneInput = document.getElementById("telefone");
  if (!telefoneInput) return;
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    let formatado = "";
    if (value.length > 0) formatado += "(" + value.substring(0, 2);
    if (value.length >= 3) formatado += ") " + value.substring(2, 7);
    if (value.length >= 8) formatado += "-" + value.substring(7, 11);
    else if (value.length > 7) formatado += value.substring(7);

    e.target.value = formatado;
  });
});

// Força o link “Blog” do topo a abrir o blog correto (mantido)
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
