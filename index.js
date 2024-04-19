
const URL_BASE = 'https://api.unsplash.com/'
const clientId = '?client_id=7Ykq1vbUh9HsKupp1h0id27L14jRo2r8F5zJQ5gBF_Q'



// VARIABLES DOM
let photosCardsContainer = document.querySelector(".wrapper");
let photoSelected = document.querySelector('.photo-selected')
let inputPhoto = document.querySelector(".search-photo");
let searchButton = document.querySelector(".search-button");

//OBTENER LISTA DE TOPICS 
const getListTopics = async () => {
    try {
        const response = await fetch(`${URL_BASE}/topics${clientId}`);
        const data = await response.json();
        console.log('getlisttopics:', data)

        return data
    } catch (error) {
        console.log(error);
    }
}

//OBTENER COLECCION DE FOTOS DE CADA TOPIC
const getTopicsPhotos = async (photo) => {
    try {
        const response = await fetch(`${URL_BASE}topics/${photo}/photos${clientId}&per_page=30`);
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

//CREAR COLECCION FOTOS DE UN TOPIC ESPECIFICO
const createCollectionPhotosCards = async (photo) => {
    try {
        const photoData = await getTopicsPhotos(photo)

        let htmlCode = `
            <div class = "one-photo-card">
                <div class = "one-photo-header">
                    <div class="one-photo-img">
                        <img src="${photoData.urls.small}" alt="${photoData.id}">
                    </div>
                    <h2 class = "one-user-name">${photoData.user}</h2>
                    <p class="one-user-id> ID: ${photoData.user} </p>
        `
        return htmlCode

    } catch (error) {
        console.log('error createcollectionphotoscards:', error)
    }
}

//IMPRIMIR FOTOS DE CADA TOPIC CON LINK  DE SU CATEGORIA
const printCollectionPhotosCards = async (photo) => {
    try {
        // const getCollection = await getTopicsPhotos()
        const photosCards = await createCollectionPhotosCards(photo)
        console.log('printcolecctionphotoscards:', photosCards)

        digimonCardContainer.innerHTML = photosCards

    } catch (error) {
        console.log('Algo malio sal!', error)
    }
}

//Función para obtener los datos de la colección de Unsplash
const fetchCollectionData = async (collectionId) => {
    try {
        const response = await fetch(`${URL_BASE}topics/${collectionId}/photos${clientId}&per_page=1`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la colección:', error);
        throw error;
    }
}

//Función para mostrar el gráfico en el header de la página
const showChartInHeader = async (data) => {
    try {
        const header = document.querySelector('.chart-photos');

        const htmlContent = data.map(photo => `
        <section>    
            <div class="photo-chart">
                <img src="${photo.urls.small}" alt="${photo.alt_description}">
                <h2>${photo.alt_description}</h2> 
                <div>
                    <canvas class="myChart"></canvas>
                </div>
            </div>
        </section>  
        `).join('');

        header.innerHTML = htmlContent;

        const ctx = header.querySelector('.myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['LIKES', 'DESCARGAS', 'TOTAL_PHOTOS', 'ASD', 'Purple'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
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

//Función para manejar el evento de clic en los enlaces de las fotos
const addCardClickEvent = () => {
    const photoLinks = document.querySelectorAll('.photo-link');
    photoLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const collectionId = link.getAttribute('data-collection-id');

            try {
                const data = await fetchCollectionData(collectionId);
                showChartInHeader(data); // Pasar los datos a showChartInHeader

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





























