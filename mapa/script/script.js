// Carrossel simples por páginas
(function () {
  const track = document.getElementById('carouselTrack');
  const pages = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -(currentIndex * 100);
    track.style.transform = `translateX(${offset}%)`;
  }

  function next() {
    currentIndex = (currentIndex + 1) % pages.length;
    updateCarousel();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + pages.length) % pages.length;
    updateCarousel();
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Navegação por teclado (acessibilidade)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Ajuste inicial
  updateCarousel();
})();