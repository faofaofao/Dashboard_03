
const URL_BASE = 'https://api.unsplash.com/'
const clientId = '?client_id=7Ykq1vbUh9HsKupp1h0id27L14jRo2r8F5zJQ5gBF_Q'

// VARIABLES DOM
let photosCardsContainer = document.querySelector(".wrapper");

//OBTENER LISTA DE TOPICS 
const getListTopics = async () => {
    try {
        const response = await fetch(`${URL_BASE}/topics${clientId}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

//CREAR CARTAS FOTOS DE CADA TOPIC
const createPhotosCards = async () => {
    try {
        const topicData = await getListTopics();

        let htmlCode = '';

        topicData.forEach((photo) => {
            htmlCode += `
                <div class="photo-card">
                    <div class="photo-link" data-collection-id="${photo.slug}">
                        <div class="photo-img" data-collection-id="${photo.slug}">
                            <img src="${photo.cover_photo.urls.small}" alt="${photo.title} image">
                        </div>
                    </div>
                </div>
            `;
        });

        return htmlCode;

    } catch (error) {
        console.log('createCards', error)
    }
}

//Función para obtener los datos de la colección de Unsplash
const fetchCollectionData = async (collectionId) => {
    try {
        const response = await fetch(`${URL_BASE}topics/${collectionId}/photos${clientId}&per_page=6`);
        const data = await response.json();

        // Agregar propiedad 'active' al primer elemento de 'data'
        if (data.length > 0) {
            data[0].active = true;
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la colección:', error);
        throw error;
    }
}


// Función para mostrar solo las imágenes en el header
const showImagesInHeader = (data) => {
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
const showChartInHeader = (data) => {
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
const addCardClickEvent = () => {
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


//IMPRIMIR COLLECION DE CARTAS DE UN TOPIC
const printPhotosCards = async () => {
    try {
        const photosCards = await createPhotosCards()

        photosCardsContainer.innerHTML = photosCards

        addCardClickEvent()

    } catch (error) {
        console.log('error desde la impresion:', error)
    }
}

printPhotosCards()