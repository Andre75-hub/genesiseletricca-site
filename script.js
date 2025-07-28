/*
 * Lógica de interação para o site Gênesis Elétrica.
 * Este script controla a abertura do formulário de solicitação de serviço
 * (tanto para pedidos normais quanto urgências), preenche o campo "Tipo de
 * serviço" com base na escolha do usuário e executa a validação antes do
 * envio. Se todos os campos obrigatórios estiverem corretos, uma
 * mensagem de sucesso é exibida e o formulário é escondido novamente.
 */

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const serviceForm   = document.getElementById('serviceForm');
    const tipoField     = document.getElementById('tipo');
    const tipoServico   = document.getElementById('tipoServico');
    const descricao     = document.getElementById('descricaoServico');
    const formTitle     = document.getElementById('formTitle');

    /**
     * Limpa mensagens de erro e valores do formulário.
     */
    function resetForm() {
        serviceForm.reset();
        // Limpa mensagens de erro e classes de invalidação
        const errorMsgs = serviceForm.querySelectorAll('.error-message');
        errorMsgs.forEach(msg => { msg.textContent = ''; });
        const fields = serviceForm.querySelectorAll('input, textarea');
        fields.forEach(field => { field.classList.remove('invalid'); });
    }

    /**
     * Exibe o formulário de solicitação e define o tipo de serviço conforme
     * a seleção ou a descrição. Para urgência, preenche "Urgência" no
     * campo de tipo.
     *
     * @param {string} tipoSolicitacao "pedido" ou "urgencia"
     */
    window.openForm = function(tipoSolicitacao) {
        resetForm();
        let valorTipo = '';
        // Define o texto do cabeçalho conforme a solicitação
        if (tipoSolicitacao === 'urgencia') {
            valorTipo = 'Urgência';
            formTitle.textContent = 'Solicitação de urgência';
        } else {
            formTitle.textContent = 'Solicitação de serviço';
            // Se houver seleção, usa o valor selecionado; senão, usa a descrição
            valorTipo = tipoServico.value || descricao.value.trim();
        }
        // Preenche o campo tipo com o valor calculado
        tipoField.value = valorTipo;
        // Mostra o formulário e rola para ele
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    };

    /**
     * Valida o formulário ao enviar. Se houver campos obrigatórios vazios
     * ou telefone inválido, exibe a mensagem de erro ao lado do campo.
     */
    serviceForm.addEventListener('submit', event => {
        event.preventDefault();
        let valid = true;
        // Percorre todos os campos com atributo required
        serviceForm.querySelectorAll('[required]').forEach(field => {
            const msg = field.parentElement.querySelector('.error-message');
            // Verifica se o campo está vazio
            if (!field.value.trim()) {
                msg.textContent = 'Campo de preenchimento obrigatório';
                field.classList.add('invalid');
                valid = false;
                return;
            } else {
                msg.textContent = '';
                field.classList.remove('invalid');
            }
            // Valida telefone se o campo tiver pattern
            if (field.id === 'telefone' && !field.checkValidity()) {
                msg.textContent = 'Telefone inválido';
                field.classList.add('invalid');
                valid = false;
            }
        });
        // Se válido, envia (aqui exibimos alerta e fechamos o formulário)
        if (valid) {
            alert('Dados enviados com sucesso!');
            git rm
            resetForm();
            formContainer.style.display = 'none';
        }
    });
});
