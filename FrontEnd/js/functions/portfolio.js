import { fetchGet } from "./api.js"


export function galleryContent(works) {
    for (let work of works) {
        // Recuperer template HTML d'un élément de la galerie et les enfants
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)

        // Ajout des attributs et contenus
        const figure = layout.querySelector('figure')
        figure.setAttribute('id', work.id)
        figure.dataset.categoryId = work.categoryId

        const img = layout.querySelector('img')
        img.src = work.imageUrl
        img.alt = work.title

        const figcaption = layout.querySelector('figcaption')
        figcaption.innerText = work.title  
        
        const icon = layout.querySelector('.icon')
        icon.style = "display: none"

        // Récupère le parent de l'objet
        document.querySelector('.gallery').append(figure)
    }
}


export function createFilter(categories) {
    const filters = document.querySelector('.filters')
    // Génération des boutons en fonction des catégories de l'API
    for (let category of categories) {
        const element = document.querySelector('#btn-filter').content.cloneNode(true)
        const btnFilter = element.querySelector('.btn')
        btnFilter.innerText = category.name
        btnFilter.dataset.categoryId = category.id
        filters.append(btnFilter)
    }
    // Sélection de tous les boutons du DOM (dynamiques et statique)
    // Ajout de l'événement au click
    filters.querySelectorAll('.btn')
        .forEach(b => b.addEventListener('click', (e) => {
            // Retire action par défault du bouton
            e.preventDefault()
            filterEvent(e)
        }))
}


async function filterEvent(e) {
    // Mise en place de la classe CSS sur le bouton actif
    e.currentTarget.parentElement.querySelector('.btn-active')
        .classList.remove('btn-active')
    e.currentTarget.classList.add('btn-active')

    const btnDataId = e.target.dataset.categoryId

    let works = await fetchGet('works')
    // Génération d'un tableau de correspondance entre les datas 
    // du bouton et celles des éléments de la galerie
    const filterWorks = works.filter((work) => {
        return work.categoryId == btnDataId
    })
    // Action si le bouton n'a pas de data
    if (!btnDataId) {
        document.querySelector(".gallery").innerHTML = ""
        return galleryContent(works)
    } else {
        // Mise en place de la nouvelle galerie
        document.querySelector(".gallery").innerHTML = ""
        galleryContent(filterWorks)
    }
}
