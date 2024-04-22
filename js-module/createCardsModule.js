import { getListTopics } from "./getListTopicsModule.js"


// CREAR CARTAS CON IMAGEN DE CADA TOPICS
export const createPhotosCards = async () => {
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

