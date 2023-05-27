// Imports
import { fetchDelete, fetchGet } from "./functions/api.js"
import { modalGalleryContent, modalSelectCategory, submitForm } from "./functions/modal.js"
import { createFilter, galleryContent } from "./functions/portfolio.js"

const filters = document.querySelector('.filters')
const logInNav = document.querySelector('#log')
const header = document.querySelector('header')
const modal1 = document.querySelector('#modal1')
const showModal = document.querySelector('.show-modal')
const modalGallery = modal1.querySelector('.modal-gallery')
const modal2 = document.querySelector('#modal2')
const modalAddPicture = modal2.querySelector('.modal-add-picture')
const modalForm = modal2.querySelector('#modal2-form')
const modalImgInput = modalForm.querySelector('#add-image__input')
const modalImgOutput = modalForm.querySelector('output')
const modalImgInputTitle = modalForm.querySelector("#title")
const modalImgCategory = modalForm.querySelector("#category")
const submit = modalForm.querySelector('.form-submit')
const modalImgDisplay = modalForm.querySelector('.add-image')


// Mis en place de la galerie portofolio -------------------------------

galleryContent(fetchGet('works'))
// Création des boutons filtres
createFilter()


// Affichage page index après login -----------------------------

if (sessionStorage.token && sessionStorage.auth === 'true') {
    document.querySelector('.edition-banner').style = "display: flex"
    header.style = "margin-top: 100px"
    filters.style = "display: none"
    document.querySelectorAll('.edit-content')
        .forEach(el => el.classList.remove('hidden'))
    // LogOut
    logInNav.innerHTML = "logout"
    logInNav.addEventListener('click', () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('auth')
        logInNav.href = './index.html'
    })
}


// Modales-------------------------------------------------------

// Mise en place des modales
showModal.addEventListener('click', () => modal1.showModal())
document.querySelectorAll('.modal-close').forEach (el => {
    el.addEventListener('click', () => {
        modal1.close()
        modal2.close()
        location.reload()
    })
})
// Fermeture de la modale quand on clique n'importe où sur la page
modal1.addEventListener('click', () => {
    modal1.close()
    location.reload()
})
modal2.addEventListener('click', () => {
    modal2.close()
    location.reload()
})
// Évite l'appel au listener quand on clique sur le contenu
modalGallery.addEventListener('click', (e) => e.stopPropagation())
modalAddPicture.addEventListener('click', (e) => e.stopPropagation())

modal1.querySelector('.modal-gallery__add').addEventListener('click', () => {
    modal1.close()
    modal2.showModal()
})
// Événement au click sur la flèche retour
modal2.querySelector('.modal-add-picture__return').addEventListener('click', () => {
    modal2.close()
    // Reset de la modal2 en cas d'arrêt en cours de remplissage de formulaire et message d'erreur
    modalForm.reset()
    modalImgOutput.innerHTML = ""
    modalImgInputTitle.style.border = "initial"
    modalImgCategory.style.border = "initial"
    modalImgDisplay.style.border = "initial"
    if (modalForm.firstElementChild.className === 'alertElement') {
        modalForm.firstElementChild.remove()
    }
    // Remet la couleur initiale du bouton de validation
    submit.style.backgroundColor = ""
    document.querySelectorAll('.preview-off').forEach(el => {
        el.style.visibility = 'visible'
    })
    modal1.showModal()
})

// Modale 1 ----------------------------------------------------
// Création du contenu de la galerie modale
modalGalleryContent()

// Suppression de la galerie de la modale
document.querySelector('.modal-gallery__remove').addEventListener('click', (e) => {
    e.preventDefault()
    const modalGallery = document.querySelector('.modal-gallery-content')
    const figures = modalGallery.querySelectorAll('figure')
    figures.forEach(el => fetchDelete(el.id))
    modalGallery.innerHTML = ""
})

// Modal2 -------------------------------------------------------
// Affichage de l'image sélectionnée
modalImgInput.addEventListener('input', (e) => {
    let img = URL.createObjectURL(e.target.files[0])
    const imgPreview = `<div class="image">
                            <img src="${img}" alt="${img.name}">
                        </div>`
    modalImgOutput.innerHTML = imgPreview
    document.querySelectorAll('.preview-off').forEach(el => {
        el.style.visibility = 'hidden'
    })
})

// Mis en place des catégories dans les options de sélection
modalSelectCategory()

// Événement à la soumission du formulaire
modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    submitForm()
})

// Traitement des erreurs et bouton de validation
modalForm.addEventListener("change", () => {
    // Réinitialise le style des inputs en cas d'erreurs de remplissage de formulaire
    modalImgDisplay.style.border = "initial"
    modalImgInputTitle.style.border = "initial"
    modalImgCategory.style.border = "initial"
    if (modalForm.firstElementChild.className === 'alertElement') {
        modalForm.firstElementChild.remove()
    }
    // Change l'aspect du bouton valider si tous les champs sont remplis
    if (modalImgInputTitle.value !== "" && modalImgCategory.value !== "" && modalImgInput.value !== "" ) {
        // console.log(modalImgInputTitle.value, modalImgCategory.value, modalImgInput.value)
        submit.style.backgroundColor = "#1D6154"
        submit.style.cursor = "pointer"
    }
})