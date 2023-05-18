import { alertElement, succesUpload } from "./functions/alert.js"
import { fetchDelete, fetchGet, fetchPost } from "./functions/api.js"
import { modalGalleryContent, modalSelectCategory } from "./functions/modal.js"

const editionBanner = document.querySelector('.edition-banner')
const filters = document.querySelector('.filters')
const logInNav = document.querySelector('#log')
const header = document.querySelector('header')
const modal1 = document.querySelector('#modal1')
const showModal = document.querySelector('.show-modal')
const closeModal = document.querySelectorAll('.modal-close')
const modalGallery = modal1.querySelector('.modal-gallery')
const modal1Button = modal1.querySelector('.modal-gallery__add')
const modal2 = document.querySelector('#modal2')
const modalAddPicture = modal2.querySelector('.modal-add-picture')
const modalReturn = modal2.querySelector('.modal-add-picture__return')
const modalForm = modal2.querySelector('#modal2-form')
const modalImgInput = modalForm.querySelector('#add-image__input')
const modalImgOutput = modalForm.querySelector('output')
const modalImgInputTitle = modalForm.querySelector("#title")
const modalImgCategory = modalForm.querySelector("#category")
const submit = modalForm.querySelector('.form-submit')
const modalImgDisplay = modalForm.querySelector('.add-image')


// Création de la galerie portofolio -------------------------------
/**
 * @param {Array} elements 
 */
async function galleryContent(elements) {
    const gallery = document.querySelector('.gallery')
    const works = await elements
    gallery.innerHTML = ""
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
        // Récupère le parent de l'objet
        document.querySelector('.gallery').append(figure)
    }
}
galleryContent(fetchGet('works'))


// Création des boutons filtres
async function createFilter() {
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

async function filterEvent(e) {
    const gallery = document.querySelector(".gallery")
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
createFilter()


// Affichage page index après login -----------------------------

if (sessionStorage.token && sessionStorage.auth === 'true') {
    editionBanner.style = "display: flex"
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

modalGalleryContent()
modalSelectCategory()

// Mise en place des modales
showModal.addEventListener('click', () => modal1.showModal())
closeModal.forEach (el => {
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
// Évite l'appel au listener quand on clique sur le contenu
modalGallery.addEventListener('click', (e) => e.stopPropagation())
modal1Button.addEventListener('click', () => {
    modal1.close()
    modal2.showModal()
})
modal2.addEventListener('click', () => {
    modal2.close()
    location.reload()
})
modalAddPicture.addEventListener('click', (e) => e.stopPropagation())
modalReturn.addEventListener('click', () => {
    modal2.close()
    // Reset de la modal2 en cas d'arrêt en cours de remplissage de formulaire avec message d'erreur
    modalForm.reset()
    modalImgOutput.innerHTML = ""
    document.querySelectorAll('.preview-off').forEach(el => {
        el.style.visibility = 'visible'
    })
    modalImgInputTitle.style.border = "initial"
    modalImgCategory.style.border = "initial"
    if (modalForm.firstElementChild.className === 'alertElement') {
        modalForm.firstElementChild.remove()
    }
    modal1.showModal()
})

// Suppression de la galerie
// document.querySelector('.modal-gallery__remove').addEventListener('click', (e) => {
//     e.preventDefault()
//     const modalGallery = document.querySelector('.modal-gallery-content')
//     const figures = modalGallery.querySelectorAll('figure')
//     figures.forEach(el => fetchDelete(el.id))
//     modalGallery.innerHTML = ""
// })

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

// Si tous les champs sont remplis, changement de couleur du bouton
modalForm.addEventListener("change", () => {
    if (modalImgInputTitle.value !== "" && modalImgCategory.value !== "" && modalImgInput.value !== "" ) {
        // console.log(modalImgInputTitle.value, modalImgCategory.value, modalImgInput.value)
        submit.style.backgroundColor = '#1D6154'
        submit.style.cursor = "pointer"
    }
})

// Traitement du formulaire d'envoi
modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    submitForm()
})

async function submitForm() {
    // Données du formulaire à traiter
    const image = modalImgInput.files[0]
    const title = modalImgInputTitle.value
    const category = modalImgCategory[modalImgCategory.selectedIndex].id
    // console.log(image, title, category)

    const data = new FormData()
    data.append('title', title)
    data.append('image', image)
    data.append('category', category)

    if (title !== "" && category !== "" && image !== undefined ) {
        // Si les datas sont valides
        await fetchPost(data)
        modalForm.prepend(succesUpload("Succès de l'ajout à la galerie"))
        // rechargement dynamique des modales
        setTimeout(() => {
            document.querySelectorAll('.preview-off').forEach(el => {
                el.style.visibility = 'visible'
            })
            submit.style.backgroundColor = ''
            modalForm.reset()
            modalForm.firstElementChild.remove()
            modalImgOutput.innerHTML = ""
            modal2.close()
            modal1.showModal()
            modalGalleryContent(fetchGet('works'))
        }, 1000)
    } else {
        // Affichage si formulaire pas rempli
        modalForm.prepend(alertElement('Veuillez vérifier que tous les champs sont remplis'))
        modalImgInputTitle.style.border = "thick solid #f10707b3"
        modalImgCategory.style.border = "thick solid #f10707b3"
        modalImgDisplay.style.border = "thick solid #f10707b3"
    }
}

// Retire message et outline d'erreur
modalImgInputTitle.addEventListener('focusin', () => {
    modalImgDisplay.style.border = "initial"
    modalImgInputTitle.style.border = "initial"
    modalImgCategory.style.border = "initial"
    if (modalForm.firstElementChild.className === 'alertElement') {
        modalForm.firstElementChild.remove()
    }
})
modalImgCategory.addEventListener('focusin', () => {
    modalImgDisplay.style.border = "initial"
    modalImgCategory.style.border = "initial"
    modalImgInputTitle.style.border = "initial"
    if (modalForm.firstElementChild.className === 'alertElement') {
        modalForm.firstElementChild.remove()
    }
})
modalImgDisplay.addEventListener('click', () => {
    modalImgDisplay.style.border = "initial"
    modalImgCategory.style.border = "initial"
    modalImgInputTitle.style.border = "initial"
    if (modalForm.firstElementChild.className === 'alertElement') {
        modalForm.firstElementChild.remove()
    }
})