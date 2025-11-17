let clientes = [];
let clientesFiltrados = [];
let paginaAtual = 1;
const porPagina = 10;

function carregarClientes() {
    fetch('json/clientes.json')
        .then(response => response.json())
        .then(data => {
            clientes = data;
            clientesFiltrados = [...clientes];
            atualizarContadores();
            mostrarPagina(paginaAtual);
        });
}

function mostrarPagina(pagina) {
    const tabela = document.getElementById('tabela-clientes');
    tabela.innerHTML = '';
    const inicio = (pagina - 1) * porPagina;
    const fim = inicio + porPagina;
    const paginaClientes = clientesFiltrados.slice(inicio, fim);

    paginaClientes.forEach(cliente => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.telefone}</td>
        `;
        linha.addEventListener('click', () => {
            window.location.href = `cliente.html?id=${cliente.id}`;
        });
        tabela.appendChild(linha);
    });

    const paginacao = document.getElementById('paginacao');
    paginacao.innerHTML = '';
    const totalPaginas = Math.ceil(clientesFiltrados.length / porPagina);
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'btn';
        if (i === paginaAtual) {
            btn.classList.add('btn-ativo');
            btn.disabled = true;
        } else {
            btn.onclick = () => {
                paginaAtual = i;
                mostrarPagina(i);
            };
        }
        paginacao.appendChild(btn);
    }
}
function pesquisarClientes(termo) {
    termo = termo.toLowerCase();
    const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(termo));
    mostrarPaginaFiltrada(filtrados);
}
function mostrarPaginaFiltrada(lista) {
    const tabela = document.getElementById('tabela-clientes');
    tabela.innerHTML = '';
    lista.forEach(cliente => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.telefone}</td>
        `;
        linha.addEventListener('click', () => {
            window.location.href = `cliente.html?id=${cliente.id}`;
        });
        tabela.appendChild(linha);
    });
    document.getElementById('paginacao').innerHTML = '<p>Filtro aplicado. Paginação desativada.</p>';
}

function atualizarContadores() {
    const total = clientes.length;
    const ativos = clientes.filter(c => c.ativo === true).length;
    const inativos = clientes.filter(c => c.ativo === false).length;
    document.getElementById('total-clientes').textContent = total;
    document.getElementById('total-ativos').textContent = ativos;
    document.getElementById('total-inativos').textContent = inativos;
}

function mostrarTodosClientes() {
  paginaAtual = 1;
  fetch('json/clientes.json')
    .then(response => response.json())
    .then(data => {
      clientes = data;
      clientesFiltrados = [...clientes];
      mostrarPagina(paginaAtual);
      atualizarFiltroBotao('todos');
      atualizarContadores();
    });
}

function filtrarAtivos() {
    paginaAtual = 1;
    clientesFiltrados = clientes.filter(c => c.ativo === true);
    mostrarPagina(paginaAtual);
    atualizarFiltroBotao('ativos');
    atualizarContadores();
}

function filtrarInativos() {
    paginaAtual = 1;
    clientesFiltrados = clientes.filter(c => c.ativo === false);
    mostrarPagina(paginaAtual);
    atualizarFiltroBotao('inativos');
    atualizarContadores();
}





function atualizarFiltroBotao(tipo) {
    const btnTodos = document.querySelector("button[onclick*='mostrarTodosClientes']");
    const btnAtivos = document.querySelector("button[onclick*='filtrarAtivos']");
    const btnInativos = document.querySelector("button[onclick*='filtrarInativos']");

    [btnTodos, btnAtivos, btnInativos].forEach(btn => {
        btn.classList.remove('btn-ativo');
        btn.disabled = false;
    });

    if (tipo === 'todos') {
        btnTodos.classList.add('btn-ativo');
        btnTodos.disabled = true;
    } else if (tipo === 'ativos') {
        btnAtivos.classList.add('btn-ativo');
        btnAtivos.disabled = true;
    } else if (tipo === 'inativos') {
        btnInativos.classList.add('btn-ativo');
        btnInativos.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarClientes();
});
