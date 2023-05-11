
import { fetchJSON } from "./js/functions/api.js"
import { modalGalleryContent } from "./js/functions/modal.js"
import { createFilter, galleryContent } from "./js/functions/portfolio.js"



// Création de la galerie
let works = await fetchJSON('works')
galleryContent(works)
modalGalleryContent(works)

// Création des boutons filtres
let categories = await fetchJSON('categories')
createFilter(categories)

// Affichage page index après login
const editionBanner = document.querySelector('.edition-banner')
const filters = document.querySelector('.filters')
const logInNav = document.querySelector('#log')
const header = document.querySelector('header')


if (sessionStorage.token) {
    editionBanner.style = "display: flex"
    header.style = "margin-top: 100px"
    filters.style = "display: none"
    document.querySelectorAll('.edit-content')
        .forEach(el => el.classList.remove('hidden'))
    logInNav.innerHTML = "logout"
    logInNav.addEventListener('click', () => {
        sessionStorage.removeItem('token')
        logInNav.href = './index.html'
    })
}


// Mise en place de la modale pour modifications galerie
const modal1 = document.querySelector('#modal1')
const modal2 = document.querySelector('#modal2')
const showModal = document.querySelector('.show-modal')
const closeModal = document.querySelector('.modal-gallery__close')
const modalGallery = document.querySelector('.modal-gallery')


showModal.addEventListener('click', () => modal1.showModal())
closeModal.addEventListener('click', () => modal1.close())

// Fermeture de la modale quand on clique n'importe où sur la page
// et mis à jour de la galerie
modal1.addEventListener('click', () => {
    modal1.close()
    location.reload()
})
// Évite l'appel au listener sur modal1 quand on clique sur le contenu
modalGallery.addEventListener('click', (e) => e.stopPropagation())

const modal1Button = modal1.querySelector('.modal-gallery__add')
modal1Button.addEventListener('click', () => {
    modal1.close()
    modal2.showModal()
})
