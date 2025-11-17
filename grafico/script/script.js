
    const ctx = document.getElementById('graficoDisciplinas').getContext('2d');

    const labels = ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre'];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Web',
          data: [5.5, 1, 1, 1, 1],
          backgroundColor: 'rgba(255, 99, 132, 0.4)',
          borderColor: 'rgba(0, 0, 0, 1)',  // cor da borda (preto)
          borderWidth: 2                      // espessura da borda

        },
        {
          label: 'Algoritmos',
          data: [9, 1, 1, 1, 1],
          backgroundColor: 'rgba(255, 159, 64, 0.4)',
          borderColor: 'rgba(0, 0, 0, 1)',  // cor da borda (preto)
          borderWidth: 2                      // espessura da borda
        },
        {
          label: 'Redes e Sistemas Op',
          data: [10, 1, 1, 1, 1],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(0, 0, 0, 1)',  // cor da borda (preto)
          borderWidth: 2                      // espessura da borda
        },
        {
          label: 'Banco de Dados',
          data: [8, 1, 1, 1, 1],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(0, 0, 0, 1)',  // cor da borda (preto)
          borderWidth: 2                      // espessura da borda
        },
        {
          label: 'Engenharia de Software',
          data: [10, 1, 1, 1, 1],
          backgroundColor: 'rgba(255, 140, 0, 0.6)',
          borderColor: 'rgba(0, 0, 0, 1)',  // cor da borda (preto)
          borderWidth: 2                      // espessura da borda
        },
        {
          label: 'Design',
          data: [8, 1, 1, 1, 1],
          backgroundColor: 'rgba(255, 205, 86, 0.6)',
          borderColor: 'rgba(0, 0, 0, 1)',  // cor da borda (preto)
          borderWidth: 2                      // espessura da borda
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}`;
              }
            }
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: false,
            barPercentage: 0.6,       // controla a largura de cada barra (0 a 1)
            categoryPercentage: 0.8   // controla o espaço entre grupos de barras

          },
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    };

    new Chart(ctx, config);