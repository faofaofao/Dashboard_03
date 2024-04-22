import { createPhotosCards } from './createCardsModule.js';
import { addCardClickEvent } from './addCardClickEventModule.js';


let photosCardsContainer = document.querySelector(".wrapper");


// IMPRIMIR EN EL BODY LAS CARTAS DE CADA TOPIC CON LINK A SU COLECCION Y GRAFICO
export const printPhotosCards = async () => {
    try {
        const photosCards = await createPhotosCards()

        photosCardsContainer.innerHTML = photosCards

        addCardClickEvent()

    } catch (error) {
        console.log('error desde la impresion:', error)
    }
}


printPhotosCards();