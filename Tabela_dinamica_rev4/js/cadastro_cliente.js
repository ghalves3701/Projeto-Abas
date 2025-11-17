document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    const dados = new FormData(this);
    const cliente = {};
    dados.forEach((valor, chave) => cliente[chave] = valor);
    cliente.id = Date.now();
    cliente.ativo = true;

    fetch('json/clientes.json')
        .then(response => response.json())
        .then(clientes => {
            clientes.push(cliente);
            alert('Cliente cadastrado com sucesso!');
            if (typeof carregarClientes === 'function') carregarClientes();
            if (typeof atualizarContadores === 'function') atualizarContadores();
            if (typeof atualizarContadores === 'function') atualizarContadores();
        });
});