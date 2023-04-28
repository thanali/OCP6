
// /**
//  * Mise en page des éléments de la galerie
//  * @param {string} content
//  * @returns {HTMLElement}
//  */
// export function layoutContent (content) {
//     // Recuperer template HTML d'un élément de la galerie et les enfants
//     const layout = document.querySelector('#gallery-layout').content.cloneNode(true)

//     // Ajout des attributs et contenus
//     const figure = layout.querySelector('figure')
//     figure.setAttribute('id', `work-${work.id}`)
//     figure.dataset.category = work.category.name
//     figure.dataset.categoryId = work.category.id

//     const img = layout.querySelector('img')
//     img.src = work.imageUrl
//     img.alt = work.title

//     const figcaption = layout.querySelector('figcaption')
//     figcaption.innerText = work.title

//     return figure
// }


export class GalleryContent {

    /** @type {figure} */
    constructor(work) {

        // Recuperer template HTML d'un élément de la galerie et les enfants
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
        this.layout = layout

        // Ajout des attributs et contenus
        const figure = layout.querySelector('figure')
        figure.setAttribute('id', `work-${work.id}`)
        figure.dataset.category = work.category.name
        figure.dataset.categoryId = work.category.id

        const img = layout.querySelector('img')
        img.src = work.imageUrl
        img.alt = work.title

        const figcaption = layout.querySelector('figcaption')
        figcaption.innerText = work.title

        // Rattacher le nouvel élément au DOM
        document.querySelector('.gallery').append(this.layout)
    }
}