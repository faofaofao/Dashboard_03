const URL_BASE = 'https://api.unsplash.com/'
const clientId = '?client_id=7Ykq1vbUh9HsKupp1h0id27L14jRo2r8F5zJQ5gBF_Q'


// VARIABLES DOM
let photosCardsContainer = document.querySelector(".wrapper");
let photoSelected = document.querySelector('.photo-selected')
let inputPhoto = document.querySelector(".search-photo");
let searchButton = document.querySelector(".search-button");


// OBTENER TODAS LAS FOTOS
const getAllPhotos = async () => {
    try {
        const response = await fetch(`${URL_BASE}photos${clientId}&per_page=30`);
        const data = await response.json();

        return data
    } catch (error) {
        console.log(error);
    }
}

//OBTENER ESTADISTICAS DEL USUARIO
const getStatisticsUser = async (userName) => {
    try {
        const response = await fetch(`${URL_BASE}/users/${userName}/statistics${clientId}`);
        const data = await response.json();

        return data
    } catch (error) {
        console.log(error);
    }
}

// OBTENER LISTA DE COLECCIONES  (????????????????)
const getListCollection = async () => {
    try {
        const response = await fetch(`${URL_BASE}/collections${clientId}`);
        const data = await response.json();

        return data
    } catch (error) {
        console.log(error);
    }
}

// OBTENER COLECCION DE FOTOS DE UN USUARIO (?????????????)
const getCollectionsPhotos = async (userId) => {
    try {
        const response = await fetch(`${URL_BASE}/collections/${userId}/photos${clientId}`);
        const data = await response.json();

        return data
    } catch (error) {
        console.log(error);
    }
}

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

// OBTENER COLECCION DE FOTOS DE CADA TOPIC
const getTopicsPhotos = async (photo) => {
    try {
        const response = await fetch(`${URL_BASE}topics/${photo}/photos${clientId}&per_page=30`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

// BUSCAR REFERENCIA DE UN USUARIO O FOTO (BUSCADOR)
const searchUsers = async (terms) => {
    try {
        const response = await fetch(`${URL_BASE}/search/photos${clientId}&per_page=30&query=${terms}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log('error unproducto:', error)
    }
}

// CREAR CARTAS FOTOS DE CADA TOPIC
const createPhotosCards = async () => {
    try {
        const topicData = await getListTopics();

        let htmlCode = '';

        topicData.forEach((photo) => {
            htmlCode += `
                <div class="photo-card">
                    <div class="photo-link" data-collection-id=${photo.slug}>
                        <div class="photo-img">
                            <img src="${photo.cover_photo.urls.small}" alt="${photo.title} image">
                        </div>
                        <div class="photo-card-body">
                            <h3 class="photo.title">${photo.slug}</h3>
                            <p class="photo-id">Username: ${photo.cover_photo.user.username}</p>
                            <button class="btn-photo-card">Click for More Info!</button>
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

// CREAR COLECCION FOTOS DE UN TOPIC ESPECIFICO
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

const geturlTopicsPhotos = async (collectionId) => {
    try {
        const response = await fetch(`${URL_BASE}topics/${collectionId}/photos${clientId}&per_page=10`);
        const data = await response.json();
        console.log('data', data)
        return data
    } catch (error) {
        console.log('error link html2', error)
    }
}

// IMPRIMIR FOTOS EN EL BODY CON EVENTO CLICK EN EL LINK DE CADA CARTA
const addCardClickEvent = () => {
    const photoLinks = document.querySelectorAll('.photo-link');
    photoLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const collectionId = link.getAttribute('data-collection-id');
            
            try {
                // Obtener la información de la colección desde la API de Unsplash con el idioma español
                const response = await fetch(`${URL_BASE}topics/${collectionId}/photos${clientId}&per_page=10`);
                const data = await response.json();
                
                // Abrir una nueva pestaña y mostrar los datos
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    // Crear el HTML para mostrar los datos
                    const htmlContent = data.map(photo => `
                        <div class="photo-card">
                            <img src="${photo.urls.small}" alt="${photo.alt_description}">
                            <h2>${photo.user.name}</h2>
                        </div>
                    `).join('');
                    
                    // Escribir los datos en la nueva pestaña
                    newWindow.document.write(`<html><head><title>Fotos del tema</title></head><body>${htmlContent}</body></html>`);
                    newWindow.document.close();
                } else {
                    // Si el navegador bloquea la apertura de ventanas emergentes
                    console.error('No se pudo abrir la nueva ventana. Asegúrate de que los bloqueadores de ventanas emergentes estén desactivados.');
                }
            } catch (error) {
                console.error('Error al obtener la información de la colección:', error);
            }
        });
    });
}



// IMPRIMIR COLLECION DE CARTAS DE UN TOPIC
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

























