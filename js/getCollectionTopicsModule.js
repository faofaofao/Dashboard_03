const URL_BASE = 'https://api.unsplash.com/'
const clientId = '?client_id=7Ykq1vbUh9HsKupp1h0id27L14jRo2r8F5zJQ5gBF_Q'


//OBTENER COLLECCION DE FOTOS DE UN TOPICS
export const getCollectionTopics = async (collectionId) => {
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


