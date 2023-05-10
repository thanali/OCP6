
import { fetchJSON } from "./js/functions/api.js"
import { modalGalleryContent } from "./js/functions/modal.js"
import { createFilter, galleryContent } from "./js/functions/portfolio.js"



// Création de la galerie
let works = await fetchJSON('works')
// Boucle dans l'API pour compléter la galerie
galleryContent(works)

// Création des boutons filtres
let categories = await fetchJSON('categories')
// Création des boutons à partir des noms des catégories
createFilter(categories)

// Affichage page index après login
const editionBanner = document.querySelector('.edition-banner')
const filters = document.querySelector('.filters')
const logInNav = document.querySelector('#log')
const header = document.querySelector('header')

function editionPage() {
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
}
editionPage()


// Mise ne place de la modale pour modifiactions galerie
const showModal = document.querySelector('.show-modal')
const closeModal = document.querySelector('.modal-gallery-close')
const modal1 = document.querySelector('#modal1')
const modalGallery = document.querySelector('.modal-gallery');
const modalGalleryImg = document.querySelectorAll('.icon')


showModal.addEventListener('click', () => modal1.showModal())
closeModal.addEventListener('click', () => modal1.close())

// Fermeture de la modale quand on clique n'importe où sur la page
modal1.addEventListener('click', () => modal1.close())
// Évite l'appel au listener sur modal1 quand on clique sur le contenu
modalGallery.addEventListener('click', (e) => e.stopPropagation())

modalGalleryContent(works)
