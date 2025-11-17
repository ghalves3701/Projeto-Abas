function obterParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function carregarDetalhesCliente() {
    const id = obterParametroURL('id');
    fetch('json/clientes.json')
        .then(response => response.json())
        .then(clientes => {
            const cliente = clientes.find(c => c.id == id);
            if (cliente) {
                const container = document.getElementById('detalhes-cliente');
                let html = `
                    <p><strong>ID:</strong> ${cliente.id}</p>
                    <p><strong>Nome:</strong> ${cliente.nome}</p>
                    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                    <p><strong>Endereço:</strong> ${cliente.endereco}</p>
                    <p><strong>Data de Nascimento:</strong> ${cliente.data_nascimento}</p>
                    <p><strong>CPF:</strong> ${cliente.cpf}</p>
                    <p><strong>RG:</strong> ${cliente.rg}</p>
                `;
                if (cliente.ativo === false) {
                    html += `<p style='color:red'><strong>Cliente inativo</strong></p>`;
                }
                container.innerHTML = html;
            } else {
                document.getElementById('detalhes-cliente').innerText = 'Cliente não encontrado.';
            }
        });
}

document.addEventListener('DOMContentLoaded', carregarDetalhesCliente);