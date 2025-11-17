
    // ======= Configurações do carrossel =======
    const VISIBLE_PER_PAGE = 1;           // Antes 3 páginas de fotos
    const AUTO_STEP_MS = 3000;            // avança a cada 3s
    const PAUSE_ON_HOVER = true;

    // Troque pelos nomes reais dos seus 12 arquivos
    const images = [
      "IMG/foto1.jpg",
      "IMG/foto2.jpg",
      "IMG/foto3.jpg",
      "IMG/foto4.jpg",
      "IMG/foto5.jpg",
      "IMG/foto6.jpg",
      "IMG/foto7.jpg",
      "IMG/foto8.jpg",
      "IMG/foto9.jpg",
      "IMG/foto10.jpg",
      "IMG/foto11.jpg",
      "IMG/foto12.jpg",
      "IMG/foto13.jpg",
      "IMG/foto14.jpg",
      "IMG/foto15.jpg",
      "IMG/foto16.jpg",
      "IMG/foto17.jpg",
      "IMG/foto18.jpeg",
      "IMG/foto19.jpeg",
    ];

    // (Opcional) legendas – podem ser vazias ou removidas
    const captions = images.map((_, i) => `Imagem ${i+1}`);

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
