
    // ======= Configurações do carrossel =======
    const VISIBLE_PER_PAGE = 3;           // 3 imagens por vez
    const AUTO_STEP_MS = 3000;            // avança a cada 1s
    const PAUSE_ON_HOVER = true;

    // Troque pelos nomes reais dos seus 12 arquivos
    const images = [
      "IMG/jg_chave_isolada.webp",
      "IMG/Parafusadeira.webp",
      "IMG/coldre_de_ferramentas.jpg",
      "IMG/Alicate Corte Tesoura RGB.jpg",
      "IMG/Alicate decapador.JPG",
      "IMG/Alicate_Corte.webp",
      "IMG/Alicate Eletricista RGB.jpg",
      "IMG/SAT_ST70041BST_FRNT_MAIN.jpg",
      "IMG/Alicate Crimpador terminal tubular.webp",
      "IMG/mala de ferramenta.webp",
      "IMG/trena-5-metros-emborrachada-duo-manual-dwht34194l-dewalt-45556.jpg",
      "IMG/Nivel Laser.webp"
    ];

    //  legendas – podem ser vazias ou removidas
    
const captions = [
  "Jogo de chave isolada",
  "Parafusadeira elétrica",
  "Coldre de ferramentas",
  "Alicate corte tipo tesoura",
  "Alicate decapador de fios",
  "Alicate de corte profissional",
  "Alicate para eletricista",
  "Alicate de bico",
  "Alicate crimpador tubular",
  "Mala de ferramentas",
  "Trena 5 metros emborrachada",
  "Nível a laser"
];


    const track = document.getElementById('carouselTrack');
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Monta as "páginas" (cada página com 3 imagens)
    function buildPages(){
      track.innerHTML = "";
      for(let i=0; i<images.length; i += VISIBLE_PER_PAGE){
        const page = document.createElement('div');
        page.className = 'carousel-page';

        const slice = images.slice(i, i + VISIBLE_PER_PAGE);
        slice.forEach((src, idx) => {
          const card = document.createElement('figure');
          card.className = 'card';

          const img = document.createElement('img');
          img.src = src;
          img.alt = captions[i+idx] || `Imagem ${i+idx+1}`;
          img.loading = "lazy";

          const figcap = document.createElement('figcaption');
          figcap.className = 'caption';
          figcap.textContent = captions[i+idx] || "";

          card.appendChild(img);
          card.appendChild(figcap);
          page.appendChild(card);
        });

        track.appendChild(page);
      }
    }

    buildPages();

    const totalPages = Math.ceil(images.length / VISIBLE_PER_PAGE);
    let currentPage = 0;
    let timer = null;

    function goToPage(pageIndex){
      currentPage = (pageIndex + totalPages) % totalPages;
      const offsetPercent = -(currentPage * 100);
      track.style.transform = `translateX(${offsetPercent}%)`;
    }

    function nextPage(){ goToPage(currentPage + 1); }
    function prevPage(){ goToPage(currentPage - 1); }

    function startAuto(){
      stopAuto();
      timer = setInterval(nextPage, AUTO_STEP_MS);
    }
    function stopAuto(){
      if (timer){ clearInterval(timer); timer = null; }
    }

    // Inicializa
    goToPage(0);
    startAuto();

    // Controles manuais
    nextBtn.addEventListener('click', () => { nextPage(); startAuto(); });
    prevBtn.addEventListener('click', () => { prevPage(); startAuto(); });

    // Pausar ao passar o mouse
    if (PAUSE_ON_HOVER){
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
      // Também pausa quando recebe foco via teclado
      carousel.addEventListener('focusin', stopAuto);
      carousel.addEventListener('focusout', startAuto);
    }

    // Acessibilidade: permitir teclas ← e →
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight'){ nextPage(); startAuto(); }
      if (e.key === 'ArrowLeft'){ prevPage(); startAuto(); }
    });
