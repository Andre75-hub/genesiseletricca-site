// script.js — validação leve de formulário (sem alterar funcionalidades)
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-servicos');
    if (!form) return;

    const ids = ['nome', 'telefone', 'bairro', 'municipio', 'servico'];

    function setError(id, hasError, message) {
      const el = document.getElementById('err-' + id);
      if (!el) return;
      if (hasError) {
        if (message) el.textContent = message;
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    }

    function isTelBR(value) {
      // validação simples p/ BR: aceita (xx) xxxxx-xxxx e variações
      const num = value.replace(/\D+/g, '');
      return num.length >= 10 && num.length <= 11;
    }

    form.addEventListener('submit', function (e) {
      let ok = true;

      ids.forEach(function (id) {
        const input = document.getElementById(id);
        if (!input) return;

        const val = (input.value || '').trim();
        if (!val) {
          ok = false;
          setError(id, true, id === 'servico' ? 'Selecione um serviço.' : undefined);
          return;
        }
        if (id === 'telefone' && !isTelBR(val)) {
          ok = false;
          setError(id, true, 'Informe um telefone válido.');
          return;
        }
        setError(id, false);
      });

      if (!ok) e.preventDefault();
    });

    // Limpa mensagens enquanto digita/seleciona
    ids.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      const handler = function () {
        const val = (input.value || '').trim();
        if (id === 'telefone') setError(id, !(val && isTelBR(val)));
        else setError(id, !val);
      };
      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });
  });
})();
