import { fetchDelete, fetchGet } from "./api.js"

const modalGallery = document.querySelector('.modal-gallery-content')

export async function modalGalleryContent() {
    modalGallery.innerHTML = ""
    let works = await fetchGet('works')
    for (let work of works) {
        // Recuperer template HTML d'un élément de la galerie et les enfants
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
        // Ajout des attributs et contenus
        const figure = layout.querySelector('figure')
        figure.setAttribute('id', work.id)
        const img = layout.querySelector('img')
        img.src = work.imageUrl
        img.alt = work.title
        const figcaption = layout.querySelector('figcaption')
        figcaption.innerText = 'éditer'
        const icon = layout.querySelector('.icon')
        icon.setAttribute('id', work.id)
        // Mise en place du bouton supprimer
        icon.addEventListener('click', async (e) => await deleteImg(e.target.parentNode.id))
        // Récupère le parent de l'objet
        modalGallery.append(figure)
    }
}

async function deleteImg (itemId) {
    fetchDelete(itemId)
    modalGallery.innerHTML = ""
    let works = await fetchGet('works')
    modalGalleryContent(works)
}

export async function modalSelectCategory() {
    let categories = await fetchGet('categories')
    for (let category of categories) {
        const option = document.createElement('option')
        option.innerText = category.name
        option.id = category.id
        document.querySelector('#category').append(option)
    }
}




// export class galleryDisplay {
//     constructor (works) {
//         for (let work of works) {
//             this.layout = document.querySelector('#gallery-layout').content.cloneNode(true)
//             this.figure = this.layout.querySelector('figure')
//             this.figure.setAttribute('id', work.id)
//             this.figure.dataset.categoryId = work.categoryId
//             this.img = this.layout.querySelector('img')
//             this.img.src = work.imageUrl
//             this.img.alt = work.title
//             this.figcaption = this.layout.querySelector('figcaption')
//             this.figcaption.innerText = work.title  
//             this.icon = this.layout.querySelector('.icon')
//             this.icon.style = "display: none"
//             document.querySelector('.gallery').append(this.figure)
//         }
//         console.log(this.figcaption.innerText)
//     }
// }