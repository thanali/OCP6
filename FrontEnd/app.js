
import { alertElement } from "./js/functions/alert.js"
import { fetchGet } from "./js/functions/api.js"
import { modalGalleryContent, modalSelectCategory } from "./js/functions/modal.js"
import { createFilter, galleryContent } from "./js/functions/portfolio.js"


const editionBanner = document.querySelector('.edition-banner')
const filters = document.querySelector('.filters')
const logInNav = document.querySelector('#log')
const header = document.querySelector('header')

const modal1 = document.querySelector('#modal1')
const showModal = document.querySelector('.show-modal')
const closeModal1 = modal1.querySelector('.modal-gallery__close')
const modalGallery = modal1.querySelector('.modal-gallery')
const modal1Button = modal1.querySelector('.modal-gallery__add')

const modal2 = document.querySelector('#modal2')
const closeModal2 = modal2.querySelector('.modal-add-picture__close')
const modalAddPicture = modal2.querySelector('.modal-add-picture')
const modalReturn = modal2.querySelector('.modal-add-picture__return')

const modalForm = modal2.querySelector('#modal2-form')
const modalImgInput = modalForm.querySelector('#add-image__input')
const modalImgOutput = modalForm.querySelector('output')
const modalImgTitle = modalForm.querySelector("#title")
const modalImgCategory = modalForm.querySelector("#category")
const modalImgLabel = modalForm.querySelector('.add-image__label')
const formSubmit = modalForm.querySelector('.form-submit')



// Création des galeries portofolio et modale
let works = await fetchGet('works')
galleryContent(works)
modalGalleryContent(works)


// Création des boutons filtres et des sélecteurs de catégories dans la modale
let categories = await fetchGet('categories')
createFilter(categories)
modalSelectCategory(categories)


// Affichage page index après login

if (sessionStorage.token && sessionStorage.auth === 'true') {
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


// Mise en place des modales

showModal.addEventListener('click', () => modal1.showModal())
closeModal1.addEventListener('click', () => {
    modal1.close()
    location.reload()
})
// Fermeture de la modale quand on clique n'importe où sur la page
// et mis à jour de la galerie
modal1.addEventListener('click', () => {
    modal1.close()
    location.reload()
})
// Évite l'appel au listener sur les modales quand on clique sur le contenu
modalGallery.addEventListener('click', (e) => e.stopPropagation())
modal1Button.addEventListener('click', () => {
    modal1.close()
    modal2.showModal()
})


closeModal2.addEventListener('click', () => {
    modal2.close()
    location.reload()
})
modal2.addEventListener('click', () => {
    modal2.close()
    location.reload()
})
modalAddPicture.addEventListener('click', (e) => e.stopPropagation())
modalReturn.addEventListener('click', () => {
    modal2.close()
    modal1.showModal()
})


// Display l'image sélectionnée

modalImgInput.addEventListener('input', (e) => {
    let img = URL.createObjectURL(e.target.files[0])
    const imgPreview = `<div class="image">
                            <img src="${img}" alt="${img.name}">
                        </div>`
    modalImgOutput.innerHTML = imgPreview
    modalImgLabel.style.visibility = 'hidden'
})


// Traitement du formulaire modale

modalForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    modalImgLabel.style.visibility = 'visible'

    const image = modalImgInput.files[0]
    const title = modalImgTitle.value
    const category = modalImgCategory[modalImgCategory.selectedIndex].id
    console.log(image, title, category)

    if (title.lenght !== 0 && category !== "" && image !== undefined) {
        console.log('ok')

        try {
            const data = new FormData()
            data.append('title', title)
            data.append('image', image)
            data.append('category', category)
            await fetch("http://" + window.location.hostname + ":5678/api/works", {
                method: "POST",
                headers: { 
                    Accept: "application/json",
                    Authorization: `Bearer ${sessionStorage.token}`,
                },
                body: data
            })
        } catch (e) {
            modalForm.reset()
            modalImgOutput.innerHTML = ""
            modalForm.prepend(alertElement("Impossible de charger l'élément : Erreur serveur"))
        }

        modal2.close()
        location.reload()
        
    } else {
        modalForm.prepend(alertElement('Veuillez vérifier que tous les champs soient remplis'))
    }
}) 
