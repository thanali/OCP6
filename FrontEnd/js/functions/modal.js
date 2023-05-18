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
        // Mise en place du bouton supprimer
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete', 'figure-button')
        deleteButton.setAttribute('id', work.id)
        const iconDelete = document.createElement('i')
        iconDelete.classList.add('fa-solid', 'fa-trash-can') 
        deleteButton.addEventListener('click', async (e) => await deleteImg(e.target.parentNode.id))
        deleteButton.append(iconDelete)
        // Mise en place du bouton de déplacement
        const moveButton = document.createElement('button')
        moveButton.classList.add('move', 'figure-button')
        moveButton.setAttribute('id', work.id)
        const iconMove = document.createElement('i')
        iconMove.classList.add('fa-solid', 'fa-arrows-up-down-left-right')
        moveButton.append(iconMove)
        moveButton.style.visibility = 'hidden'
        figure.append(deleteButton, moveButton)
        // Apparition du bouton de déplacement
        figure.addEventListener('focusin', () => moveButton.style.visibility = 'visible')
        figure.addEventListener('mouseover', () => moveButton.style.visibility = 'visible')
        figure.addEventListener('mouseout', () => moveButton.style.visibility = 'hidden')
        figure.addEventListener('focusout', () => moveButton.style.visibility = 'hidden')
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