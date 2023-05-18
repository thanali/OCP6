import { fetchDelete, fetchGet } from "./api.js"

const modalGallery = document.querySelector('.modal-gallery-content')

export async function modalGalleryContent() {
    modalGallery.innerHTML = ""
    let works = await fetchGet('works')
    for (let work of works) {
        // Recuperer template HTML d'un élément de la galerie et les enfants
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
        const figure = layout.querySelector('figure')
        const img = layout.querySelector('img')
        const figcaption = layout.querySelector('figcaption')
        // Ajout des attributs et contenus
        figure.setAttribute('id', work.id)
        img.src = work.imageUrl
        img.alt = work.title
        figcaption.innerText = 'éditer'
        // Mise en place du bouton supprimer
        const deleteButton = document.createElement('button')
        const iconDelete = document.createElement('img')
        deleteButton.classList.add('delete', 'figure-button')
        deleteButton.setAttribute('id', work.id)
        iconDelete.src = '../assets/icons/bin-svgrepo-com.svg'
        iconDelete.setAttribute('alt', 'icone poubelle')
        deleteButton.addEventListener('click', async (e) => await deleteImg(e.target.parentNode.id))
        deleteButton.append(iconDelete)
        // Mise en place du bouton de déplacement
        const moveButton = document.createElement('button')
        const iconMove = document.createElement('i')
        moveButton.classList.add('move', 'figure-button')
        moveButton.setAttribute('id', work.id)
        iconMove.classList.add('fa-solid', 'fa-arrows-up-down-left-right')
        moveButton.append(iconMove)
        moveButton.style.visibility = 'hidden'
        // Rattache les éléments
        figure.append(deleteButton, moveButton)
        modalGallery.append(figure)
        // Apparition du bouton de déplacement
        figure.addEventListener('focusin', () => moveButton.style.visibility = 'visible')
        figure.addEventListener('mouseover', () => moveButton.style.visibility = 'visible')
        figure.addEventListener('mouseout', () => moveButton.style.visibility = 'hidden')
        figure.addEventListener('focusout', () => moveButton.style.visibility = 'hidden')
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