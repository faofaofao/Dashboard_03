// Función para mostrar solo el gráfico en el header
export const printChartInHeader = (data) => {
    try {

        //Se agregan cantidades para que en el gráfico sea más visible la cantidad
        const likes = data[0].likes;
        const multipliedLikes = likes + 500 * 2
        const total_photos = data[0].user.total_photos;
        const user_total_photos = total_photos + 400 * 2
        const header = document.querySelector('.chart-graphys');

        // Eliminar contenido anterior
        header.innerHTML = '';

        const ctx = document.createElement('canvas');
        ctx.classList.add('myChart');
        header.appendChild(ctx);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ME GUSTA', 'DESCARGAS', 'IMAGENES', 'VISUALIZACIONES'],
                datasets: [{
                    label: 'GRAFICO DATOS CATEGORIA',
                    data: [
                        data[0].multipliedLikes = multipliedLikes,
                        data[0].width,
                        data[0].user_total_photos = user_total_photos,
                        data[0].height,
                    ],
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.2)',
                        'rgba(255, 153, 0, 0.2)',
                        'rgba(51, 153, 102, 0.2)',
                        'rgba(153, 0, 51, 0.2)',
                    ],
                    borderColor: [
                        'rgba(0, 102, 204, 1)',
                        'rgba(255, 153, 0, 1)',
                        'rgba(51, 153, 102, 1)',
                        'rgba(153, 0, 51, 1)',
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al mostrar el gráfico en el header:', error);
    }
};

