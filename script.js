// Validação simples com mensagens inline por campo (sem "grade vermelha")
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-servicos');
    if (!form) return;

    const requiredIds = ['nome', 'telefone', 'bairro', 'municipio', 'servico'];

    function setError(id, hasError, message) {
      const errEl = document.getElementById('err-' + id);
      if (!errEl) return;
      if (hasError) {
        if (message) errEl.textContent = message;
        errEl.hidden = false;
      } else {
        errEl.hidden = true;
      }
    }

    function isTelValid(value) {
      // Validação leve para padrão BR (não é máscara): (xx) xxxxx-xxxx ou variações
      return /(\d{2}).*(\d{4,5}).*(\d{4})/.test(value.replace(/\s|\(|\)|-|\./g, ''));
    }

    // Validação ao enviar
    form.addEventListener('submit', function (e) {
      let ok = true;

      requiredIds.forEach(function (id) {
        const input = document.getElementById(id);
        if (!input) return;

        const value = (input.value || '').trim();
        if (!value) {
          ok = false;
          setError(id, true);
          return;
        }

        if (id === 'telefone' && !isTelValid(value)) {
          ok = false;
          setError(id, true, 'Informe um telefone válido.');
          return;
        }

        setError(id, false);
      });

      if (!ok) e.preventDefault();
    });

    // Limpa erro enquanto digita/seleciona
    requiredIds.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      const handler = function () {
        const value = (input.value || '').trim();
        if (id === 'telefone') {
          setError(id, !(value && isTelValid(value)));
        } else {
          setError(id, !value);
        }
      };
      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });
  });
})();
