import { fetchGet } from "./api.js"


export function modalGalleryContent(works) {
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
        icon.addEventListener('click', (e) => {
            // console.log(e.target.parentNode.id)
            deleteWork(e.target.parentNode.id)
        })

        // Récupère le parent de l'objet
        document.querySelector('.modal-gallery-content').append(figure)
    }
}


async function deleteWork(id) {
    await fetch("http://" + window.location.hostname + `:5678/api/works/${id}`, {
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.token}`,
        },
        method: "DELETE",
    })
    let works = await fetchGet('works')
    document.querySelector('.modal-gallery-content').innerHTML = ""
    modalGalleryContent(works)
}


export function modalSelectCategory(categories) {
    for (let category of categories) {
        const option = document.createElement('option')
        option.innerText = category.name
        option.id = category.id
        document.querySelector('#category').append(option)
    }
}