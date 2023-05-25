// Imports
import { alertElement, alertStyleInput, succesUpload } from "./alert.js"
import { fetchDelete, fetchGet, fetchPost } from "./api.js"

const modalForm = modal2.querySelector('#modal2-form')
const modalGallery = document.querySelector('.modal-gallery-content')
const modalImgInput = modalForm.querySelector('#add-image__input')
const modalImgOutput = modalForm.querySelector('output')
const modalImgInputTitle = modalForm.querySelector("#title")
const modalImgCategory = modalForm.querySelector("#category")
const modalImgDisplay = modalForm.querySelector('.add-image')
const submit = modalForm.querySelector('.form-submit')


// Création du contenu de la galerie de la modale
export async function modalGalleryContent() {
    modalGallery.innerHTML = ""
    let works = await fetchGet('works')
    for (let work of works) {
        // Recuperer template HTML d'un élément de la galerie et les enfants
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
        const figure = layout.querySelector('figure')
        const img = layout.querySelector('img')
        const figcaption = layout.querySelector('figcaption')
        // Ajout des attributs et contenus
        figure.setAttribute('id', work.id)
        img.src = work.imageUrl
        img.alt = work.title
        figcaption.innerText = 'éditer'
        // Mise en place du bouton supprimer
        const deleteButton = document.createElement('button')
        const iconDelete = document.createElement('img')
        deleteButton.classList.add('delete', 'figure-button')
        deleteButton.setAttribute('id', work.id)
        iconDelete.src = '../assets/icons/bin-svgrepo-com.svg'
        iconDelete.setAttribute('alt', 'icone poubelle')
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault()
            deleteImg(e.target.parentNode.id)
        })
        deleteButton.append(iconDelete)
        // Mise en place du bouton de déplacement
        const moveButton = document.createElement('button')
        const iconMove = document.createElement('i')
        moveButton.classList.add('move', 'figure-button')
        iconMove.classList.add('fa-solid', 'fa-arrows-up-down-left-right')
        moveButton.append(iconMove)
        moveButton.style.visibility = 'hidden'
        // Rattache les éléments
        figure.append(deleteButton, moveButton)
        modalGallery.append(figure)
        // Apparition du bouton de déplacement
        figure.addEventListener('mouseover', () => moveButton.style.visibility = 'visible')
        figure.addEventListener('mouseout', () => moveButton.style.visibility = 'hidden')
    }
}

// Suppression des éléments
async function deleteImg (itemId) {
    fetchDelete(itemId)
    let works = await fetchGet('works')
    modalGalleryContent(works)
}

// Création dynamique des catégories dans les options select
export async function modalSelectCategory() {
    let categories = await fetchGet('categories')
    for (let category of categories) {
        const option = document.createElement('option')
        option.innerText = category.name
        option.id = category.id
        document.querySelector('#category').append(option)
    }
}

// Traitement du formulaire d'envoi du formulaire
export async function submitForm() {
    // Données du formulaire à traiter
    const image = modalImgInput.files[0]
    const title = modalImgInputTitle.value
    const category = modalImgCategory[modalImgCategory.selectedIndex].id
    // console.log(image, title, category)
    const data = new FormData()
    data.append('title', title)
    data.append('image', image)
    data.append('category', category)

    if (title !== "" && category !== "" && image.size <= 4000000) {
        // console.log(image.size)
        // Si les datas sont valides
        await fetchPost(data)
        modalForm.prepend(succesUpload("Succès de l'ajout à la galerie"))
        // rechargement dynamique des modales
        setTimeout(() => {
            document.querySelectorAll('.preview-off').forEach(el => {
                el.style.visibility = "visible"
            })
            submit.style.backgroundColor = ''
            modalForm.reset()
            modalForm.firstElementChild.remove()
            modalImgOutput.innerHTML = ""
            modal2.close()
            modal1.showModal()
            modalGalleryContent(fetchGet('works'))
        }, 2000)
    } else if (title !== "" && category !== "" && image.size > 4000000) {
        modalForm.prepend(alertElement('Veuillez vérifier la taille du fichier'))
        alertStyleInput(modalImgDisplay)
        modalImgOutput.innerHTML = ""
        document.querySelectorAll('.preview-off').forEach(el => {
            el.style.visibility = 'visible'
        })
    } else {
        // Affichage si formulaire pas entièrement rempli
        modalForm.prepend(alertElement('Veuillez vérifier que tous les champs sont remplis'))
        alertStyleInput(modalImgInputTitle)
        alertStyleInput(modalImgCategory)
        alertStyleInput(modalImgDisplay)
    }
}