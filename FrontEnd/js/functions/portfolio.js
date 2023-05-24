// Imports
import { fetchGet } from "./api.js"


/**
 * Création de la galerie portfolio à partir de l'API
 * @param {Array} elements 
 */
export async function galleryContent(elements) {
    const gallery = document.querySelector('.gallery')
    const works = await elements
    gallery.innerHTML = ""
    for (let work of works) {
        // Recuperer template HTML d'un élément de la galerie et les enfants
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
        // Ajout des attributs et contenus
        const figure = layout.querySelector('figure')
        const img = layout.querySelector('img')
        const figcaption = layout.querySelector('figcaption')
        figure.setAttribute('id', work.id)
        figure.dataset.categoryId = work.categoryId
        img.src = work.imageUrl
        img.alt = work.title
        figcaption.innerText = work.title
        // Récupère le parent de l'objet
        gallery.append(figure)
    }
}

// Création des filtres à partir de l'API
export async function createFilter() {
    const filters = document.querySelector('.filters')
    let categories = await fetchGet('categories')
    // Génération des boutons en fonction des catégories de l'API
    for (let category of categories) {
        const element = document.querySelector('#btn-filter').content.cloneNode(true)
        const btnFilter = element.querySelector('.btn')
        btnFilter.innerText = category.name
        btnFilter.dataset.categoryId = category.id
        filters.append(btnFilter)
    }
    const btnFilters = filters.querySelectorAll('.btn')
    btnFilters.forEach(button => {
        button.addEventListener('click', (e) => filterEvent(e))
    })
}

// Méthode de filtrage de la galerie
async function filterEvent(e) {
    // console.log(e.target.parentElement)
    // Mise en place de la classe CSS sur le bouton actif
    e.target.parentElement.querySelector('.btn-active')
        .classList.remove('btn-active')
    e.target.classList.add('btn-active')
    // Récupération data-id bouton
    const btnDataId = e.target.dataset.categoryId
    let works = await fetchGet('works')
    // Génération d'un tableau de correspondance entre les datas du bouton et celles des éléments de la galerie
    const filterWorks = works.filter((work) => {return work.categoryId == btnDataId})
    // console.log(filterWorks)
    if (!btnDataId) {
        // Action si le bouton n'a pas de data
        galleryContent(works)
    } else {
        // Mise en place de la nouvelle galerie
        galleryContent(filterWorks)
    }
}