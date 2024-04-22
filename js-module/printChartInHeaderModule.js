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
                labels: [`LIKES`, 'DESCARGAS', 'TOTAL_PHOTOS', 'VIEWERS'],
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
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(0, 102, 204, 1)',
                        'rgba(255, 153, 0, 1)',
                        'rgba(51, 153, 102, 1)',
                        'rgba(153, 0, 51, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        type: 'logarithmic',
                        beginAtZero: false
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al mostrar el gráfico en el header:', error);
    }
};

