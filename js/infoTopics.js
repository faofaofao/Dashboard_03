import {fetchCollectionData} from "./fetchApi";

// Función para mostrar solo las imágenes en el header
export const showImagesInHeader = (data) => {
    try {
        const header = document.querySelector('.carousel-inner');

        // Eliminar contenido anterior
        header.innerHTML = '';

        const htmlContent = data.map(photo => `
            <div class="carousel-item ${photo.active ? 'active' : ''}">        
                <img src="${photo.urls.small}" class="d-block w-100" alt="${photo.alt_description}">
            </div>
        `).join('');

        header.innerHTML = htmlContent;
    } catch (error) {
        console.error('Error al mostrar las imágenes en el header:', error);
    }
};


// Función para mostrar solo el gráfico en el header
export const showChartInHeader = (data) => {
    try {

        //Se agregan cantidades para que en el gráfico sea más visible la cantidad
        const likes = data[0].likes;
        const multipliedLikes = likes +500 * 2
        const total_photos = data[0].user.total_photos;
        const user_total_photos = total_photos +400 * 2
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

// En el evento click, llamar a las dos funciones separadas para mostrar imágenes y el gráfico
export const addCardClickEvent = () => {
    const photoLinks = document.querySelectorAll('.photo-link');
    photoLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const collectionId = link.getAttribute('data-collection-id');

            try {
                const data = await fetchCollectionData(collectionId);

                // Mostrar solo las imágenes
                showImagesInHeader(data);
                
                // Mostrar solo el gráfico
                showChartInHeader(data);

                // Mostrar las flechas del carrusel
                const prevButton = document.querySelector('.carousel-control-prev');
                const nextButton = document.querySelector('.carousel-control-next');
                prevButton.classList.remove('d-none');
                nextButton.classList.remove('d-none');
                console.log(prevButton, nextButton);

                // Desplazarse a un elemento específico
                const targetElement = document.querySelector('.carousel-inner');
                if (targetElement) {
                    const targetElementRect = targetElement.getBoundingClientRect();
                    window.scrollTo({
                        top: targetElementRect.top + window.scrollY,
                        behavior: 'smooth' // Para un desplazamiento suave
                    });
                }

            } catch (error) {
                console.error('Error al manejar el evento de clic:', error);
            }
        });
    });
}