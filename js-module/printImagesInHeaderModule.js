// Función para mostrar solo las imágenes en el header
export const printImagesInHeader = (data) => {
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

