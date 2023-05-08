
import { fetchJSON } from "./js/functions/api.js"
import { createFilter, galleryContent } from "./js/functions/portfolio.js"



// Création de la galerie
let works = await fetchJSON('works')
// Boucle dans l'API pour compléter la galerie
galleryContent(works)

// Création des boutons filtres
let categories = await fetchJSON('categories')
// Création des boutons à partir des noms des catégories
createFilter(categories)


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