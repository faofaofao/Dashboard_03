import { getCollectionTopics } from './getCollectionTopicsModule.js';
import { printImagesInHeader } from './printImagesInHeaderModule.js';
import { printChartInHeader } from './printChartInHeaderModule.js';


export const addCardClickEvent = () => {
    const photoLinks = document.querySelectorAll('.photo-link');
    photoLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const collectionId = link.getAttribute('data-collection-id');

            try {
                const data = await getCollectionTopics(collectionId);

                // Mostrar solo las imágenes
                printImagesInHeader(data);

                // Mostrar solo el gráfico
                printChartInHeader(data);

                // Mostrar las flechas del carrusel
                const prevButton = document.querySelector('.carousel-control-prev');
                const nextButton = document.querySelector('.carousel-control-next');
                prevButton.classList.remove('d-none');
                nextButton.classList.remove('d-none');


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