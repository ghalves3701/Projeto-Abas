// Catálogo de produtos
const PRODUCTS = [ // Cria uma lista (array) com todos os produtos
  {
    id: 'alicate', // Identificador único do produto (usado em links)
    name: 'Alicate Universal 8"', // Nome do produto
    category: 'Ferramentas', // Categoria do produto
    code: 'FRT-001', // Código interno
    price: 49.9, // Preço em número (será formatado depois)
    img: 'img/alicate.png', // Caminho da imagem do produto
    desc: 'Alicate universal 8" com cabo emborrachado e corte preciso.' // Descrição
  },
  {
    id: 'multimetro',
    name: 'Multímetro Digital',
    category: 'Ferramentas',
    code: 'FRT-002',
    price: 119.9,
    img: 'img/multimetro.png',
    desc: 'Multímetro digital com medidas de tensão, corrente e resistência.'
  },
  {
    id: 'fio',
    name: 'Rolo de Fio 2,5mm 100m',
    category: 'Materiais',
    code: 'MAT-101',
    price: 229.9,
    img: 'img/fio.png',
    desc: 'Cabo elétrico 2,5mm rolo 100m, isolação PVC, uso residencial.'
  },
  {
    id: 'tomada',
    name: 'Tomada 10A 2P+T',
    category: 'Materiais',
    code: 'MAT-102',
    price: 12.9,
    img: 'img/tomada.png',
    desc: 'Módulo de tomada 10A padrão brasileiro 2P+T.'
  },
{
    id: 'fita',
    name: 'Fita isolante 33+',
    category: 'Materiais',
    code: 'MAT-103',
    price: 31,
    img: 'img/fita.png',
    desc: 'Fita isolante 33+ 3M'
}
//adicionar produtos aqui, acrescentando +1 ao "code", se for materiais iniciar com "MAT" se for FErramentas, iniciar com "FRT"
  
];

// =====================
// Funções utilitárias
// =====================
const $ = (sel, root = document) => root.querySelector(sel); 
// Atalho para selecionar UM elemento no HTML

const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel)); 
// Atalho para selecionar VÁRIOS elementos e transformar em array

const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); 
// Formata um número para moeda brasileira (R$)

// =====================
// Renderização da Home
// =====================
function renderHome(){
  const target = $('#featured-grid'); // Pega a div onde os produtos em destaque vão aparecer
  if(!target) return; // Se não existir, sai da função
  const featured = PRODUCTS.slice(0, 4); // Pega os 4 primeiros produtos
  target.innerHTML = featured.map(cardHTML).join(''); // Gera o HTML dos cards e insere na página
}

// =====================
// Template de card
// =====================
function cardHTML(p){
  return `
  <div class="card">
    <div class="thumb">
      <img src="${p.img}" alt="${p.name}"> <!-- Imagem do produto -->
    </div>
    <div class="content">
      <h3>${p.name}</h3> <!-- Nome -->
      <p class="muted">${p.category} • <span class="code">${p.code}</span></p> <!-- Categoria e código -->
      <div class="price">${fmtBRL(p.price)}</div> <!-- Preço formatado -->
      <div class="actions">
        <a class="btn" href="produto.html?id=${p.id}">Ver detalhes</a> <!-- Link para página do produto -->
        <a class="btn btn-primary" href="orcamento.html">Solicitar orçamento</a> <!-- Link para orçamento -->
      </div>
    </div>
  </div>`;
}

// =====================
// Renderização do Catálogo
// =====================
function renderCatalog(){
  const grid = $('#products-grid'); // Área dos cards
  const tableBody = $('#products-table'); // Área da tabela
  if(!grid && !tableBody) return; // Se não existir, sai da função

  const search = $('#search'); // Campo de busca
  const category = $('#category'); // Filtro de categoria
  const sort = $('#sort'); // Ordenação
  const tabs = $$('.tab-button'); // Botões das abas

  // Faz as abas funcionarem
  tabs.forEach(b=>{
    b.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active')); // Remove "active" de todas
      b.classList.add('active'); // Marca a clicada como ativa
      const tab = b.getAttribute('data-tab'); // Pega qual aba foi clicada
      $$('.tab').forEach(t=>t.classList.remove('active')); // Esconde todas as abas
      $('#tab-'+tab).classList.add('active'); // Mostra a aba escolhida
    });
  });

  // Função que aplica busca, filtro e ordenação
  function applyFilters(){
    let list = [...PRODUCTS]; // Copia a lista de produtos
    const q = (search.value || '').toLowerCase().trim(); // Texto digitado na busca
    const cat = category.value; // Categoria escolhida

    if(q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    // Se digitou algo, filtra por nome ou código

    if(cat) list = list.filter(p => p.category === cat);
    // Se escolheu categoria, filtra por ela

    // Ordenação
    switch(sort.value){
      case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
      case 'name-asc': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
      case 'name-desc': list.sort((a,b)=>b.name.localeCompare(a.name)); break;
    }

    renderGrid(list); // Mostra os cards
    renderTable(list); // Mostra a tabela
  }

  // Renderiza os cards
  function renderGrid(list){
    grid.innerHTML = list.map(cardHTML).join('');
  }

  // Renderiza a tabela
  function renderTable(list){
    tableBody.innerHTML = list.map(p => `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.code}</td>
        <td>${fmtBRL(p.price)}</td>
        <td>
          <a class="btn" href="produto.html?id=${p.id}">Ver detalhes</a>
          <a class="btn btn-primary" href="orcamento.html">Solicitar orçamento</a>
        </td>
      </tr>
    `).join('');
  }

  // Ativa os filtros quando o usuário digita ou escolhe algo
  [search, category, sort].forEach(el => el.addEventListener('input', applyFilters));
  applyFilters(); // Executa uma vez para carregar os produtos
}

// =====================
// Renderização do Produto individual
// =====================
function renderProduct(){
  const target = $('#product-detail'); // Área onde o produto será mostrado
  if(!target) return;
  const params = new URLSearchParams(location.search); // Pega os parâmetros da URL
  const id = params.get('id'); // Pega o id do produto
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0]; // Busca o produto ou pega o primeiro

  // Monta o HTML do produto
  target.innerHTML = `
    <div class="big-thumb"><img src="${p.img}" alt="${p.name}"></div>
    <div class="info">
      <h1>${p.name}</h1>
      <p class="muted">${p.category} • <span class="code">${p.code}</span></p>
      <h2 class="price">${fmtBRL(p.price)}</h2>
      <p>${p.desc}</p>
      <div class="actions">
        <a href="orcamento.html" class="btn btn-primary">Solicitar orçamento</a>
        <a href="produtos.html" class="btn">Voltar</a>
      </div>
    </div>
  `;
}

// =====================
// Inicialização
// =====================
document.addEventListener('DOMContentLoaded', ()=>{ // Espera a página carregar
  const page = document.documentElement.getAttribute('data-page'); // Lê o atributo data-page do <html>
  if(page === 'home') renderHome(); // Se for a Home, mostra destaques
  if(page === 'catalog') renderCatalog(); // Se for Produtos, mostra catálogo
  if(page === 'product') renderProduct(); // Se for Produto, mostra detalhes
});