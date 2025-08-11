// --- UTIL ---
function phoneMask(el){
  if(!el) return;
  el.addEventListener('input', function(e){
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    let r = '';
    if(v.length>0) r += '('+v.slice(0,2);
    if(v.length>=3) r += ') '+v.slice(2,7);
    if(v.length>=8) r += '-'+v.slice(7,11);
    e.target.value = r;
  });
}
function validaBairroMunicipio(txt){
  return /^\s*[^\/]+\s*\/\s*[^\/]+\s*$/.test((txt||'').trim());
}
function clearErrors(ids){
  ids.forEach(id => { const el = document.getElementById(id); if(el) el.textContent=''; });
}
function show(el){ el && el.classList.remove('hidden'); }
function hide(el){ el && el.classList.add('hidden'); }

// --- PADRÃO ---
function preencherTipoServico(valor){
  const suporte = document.getElementById('suporte').value.trim();
  const tipo = valor || suporte;
  const out = document.getElementById('tipoFinal');
  if(out) out.value = tipo;
}

function mostrarFormulario(){
  const select = document.getElementById('tipoServico');
  const suporte = document.getElementById('suporte').value.trim();
  const tipo = (select && select.value) || suporte;
  if(!tipo){ alert('Por favor, selecione ou digite o serviço.'); return; }
  const bloco = document.getElementById('formularioExtra');
  show(bloco);
  const out = document.getElementById('tipoFinal');
  if(out) out.value = tipo;
}

function enviarWhatsAppFinal(){
  clearErrors(['err-nome','err-tel','err-local']);
  const nome = (document.getElementById('nome').value||'').trim();
  const tel  = (document.getElementById('telPadrao').value||'').trim();
  const loc  = (document.getElementById('localizacaoUsuario').value||'').trim();
  const tipo = (document.getElementById('tipoFinal').value||'').trim();
  const obs  = (document.getElementById('observacao').value||'').trim();

  let ok = true;
  if(!nome){ document.getElementById('err-nome').textContent = 'Campo de preenchimento obrigatório'; ok=false; }
  if(!/^\(\d{2}\) \d{5}-\d{4}$/.test(tel)){ document.getElementById('err-tel').textContent = 'Informe o telefone no formato (XX) XXXXX-XXXX'; ok=false; }
  if(!validaBairroMunicipio(loc)){ document.getElementById('err-local').textContent = 'Informe Bairro / Município (ex.: Riacho / Contagem)'; ok=false; }
  if(!ok) return;

  const msg = encodeURIComponent(
    'Olá! Gostaria de solicitar um serviço.'+
    '\n\nNome: '+nome+
    '\nTelefone: '+tel+
    '\nBairro/Município: '+loc+
    '\nServiço: '+tipo+
    (obs? '\nObservação: '+obs : '')
  );
  window.open('https://wa.me/5531975002129?text='+msg, '_blank');
}

// --- URGÊNCIA ---
function toggleUrgencia(){
  const box = document.getElementById('formUrgencia');
  if(!box) return;
  if(box.classList.contains('hidden')) show(box); else hide(box);
}

function enviarUrgencia(){
  clearErrors(['err-urg-nome','err-urg-tel','err-urg-local','err-urg-serv']);
  const nome = (document.getElementById('urg-nome').value||'').trim();
  const tel  = (document.getElementById('urg-telefone').value||'').trim();
  const loc  = (document.getElementById('urg-local').value||'').trim();
  const serv = (document.getElementById('urg-servico').value||'').trim();

  let ok = true;
  if(!nome){ document.getElementById('err-urg-nome').textContent='Campo de preenchimento obrigatório'; ok=false; }
  if(!/^\(\d{2}\) \d{5}-\d{4}$/.test(tel)){ document.getElementById('err-urg-tel').textContent='Informe o telefone no formato (XX) XXXXX-XXXX'; ok=false; }
  if(!validaBairroMunicipio(loc)){ document.getElementById('err-urg-local').textContent='Informe Bairro / Município (ex.: Riacho / Contagem)'; ok=false; }
  if(!serv){ document.getElementById('err-urg-serv').textContent='Campo de preenchimento obrigatório'; ok=false; }
  if(!ok) return;

  const msg = encodeURIComponent(
    'Olá! PRECISO DO SERVIÇO COM URGÊNCIA.'+
    '\n\nNome: '+nome+
    '\nTelefone: '+tel+
    '\nBairro/Município: '+loc+
    '\nTipo de serviço: '+serv
  );
  window.open('https://wa.me/5531975002129?text='+msg, '_blank');
}

// --- BOOT ---
document.addEventListener('DOMContentLoaded', function(){
  // Máscaras
  phoneMask(document.getElementById('telPadrao'));
  phoneMask(document.getElementById('urg-telefone'));

  // Botões
  const btnMostrar = document.getElementById('btnMostrarFormulario');
  if(btnMostrar) btnMostrar.addEventListener('click', mostrarFormulario);

  const btnEnviar = document.getElementById('btnEnviarPadrao');
  if(btnEnviar) btnEnviar.addEventListener('click', enviarWhatsAppFinal);

  const btnUrg = document.getElementById('btnAbrirUrgencia');
  if(btnUrg) btnUrg.addEventListener('click', toggleUrgencia);

  const floatUrg = document.getElementById('floatingUrgent');
  if(floatUrg) floatUrg.addEventListener('click', toggleUrgencia);

  const btnEnviarUrg = document.getElementById('btnEnviarUrgencia');
  if(btnEnviarUrg) btnEnviarUrg.addEventListener('click', enviarUrgencia);
});