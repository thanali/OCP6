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
const modalImgTitle = modalForm.querySelector("#title")
const modalImgCategory = modalForm.querySelector("#category")
const modalImgLabel = modalForm.querySelector('.add-image__label')
const loginSubmit = document.querySelector('.login-submit')
const alertMsg = document.querySelector('p')
const email = document.querySelector('#email')
const password = document.querySelector('#password')


// Affichage page d'acceuil

let works = await fetchGet('works')
galleryContent(works)
modalGalleryContent(works)

let categories = await fetchGet('categories')
createFilter(categories)
modalSelectCategory(categories)

// Affichage page d'accueil après login

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
function galleryContent(works) {
    for (let work of works) {
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
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
        document.querySelector('.gallery').append(figure)
    }
}

function modalGalleryContent(works) {
    for (let work of works) {
        const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
        const figure = layout.querySelector('figure')
        figure.setAttribute('id', work.id)
        const img = layout.querySelector('img')
        img.src = work.imageUrl
        img.alt = work.title
        const figcaption = layout.querySelector('figcaption')
        figcaption.innerText = 'éditer'
        const icon = layout.querySelector('.icon')
        icon.addEventListener('click', (e) => {
            fetchDelete(e.target.parentNode.id)
        })
        document.querySelector('.modal-gallery-content').append(figure)
    }
}

function modalSelectCategory(categories) {
    for (let category of categories) {
        const option = document.createElement('option')
        option.innerText = category.name
        option.id = category.id
        document.querySelector('#category').append(option)
    }
}

function createFilter(categories) {
    const filters = document.querySelector('.filters')
    for (let category of categories) {
        const element = document.querySelector('#btn-filter').content.cloneNode(true)
        const btnFilter = element.querySelector('.btn')
        btnFilter.innerText = category.name
        btnFilter.dataset.categoryId = category.id
        filters.append(btnFilter)
    }
    filters.querySelectorAll('.btn')
        .forEach(b => b.addEventListener('click', (e) => {
            e.preventDefault()
            filterEvent(e)
        }))
}

async function filterEvent(e) {
    const gallery = document.querySelector(".gallery")
    e.currentTarget.parentElement.querySelector('.btn-active')
        .classList.remove('btn-active')
    e.currentTarget.classList.add('btn-active')
    const btnDataId = e.target.dataset.categoryId
    let works = await fetchGet('works')
    const filterWorks = works.filter((work) => {
        return work.categoryId == btnDataId
    })
    if (!btnDataId) {
        gallery.innerHTML = ""
        return galleryContent(works)
    } else {
        gallery.innerHTML = ""
        galleryContent(filterWorks)
    }
}

function alertElement(message) {    
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert')
    alert.innerText = message
    return alert
}


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
modal1.addEventListener('click', () => modal1.close())
// Évite l'appel au listener quand on clique sur le contenu
modalGallery.addEventListener('click', (e) => e.stopPropagation())
modal1Button.addEventListener('click', () => {
    modal1.close()
    modal2.showModal()
})

modal2.addEventListener('click', () => modal2.close())
modalAddPicture.addEventListener('click', (e) => e.stopPropagation())
modalReturn.addEventListener('click', () => {
    modal2.close()
    modal1.showModal()
})

modalImgInput.addEventListener('input', (e) => {
    let img = URL.createObjectURL(e.target.files[0])
    const imgPreview = `<div class="image">
                            <img src="${img}" alt="${img.name}">
                        </div>`
    modalImgOutput.innerHTML = imgPreview
    modalImgLabel.style.visibility = 'hidden'
})

modalForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const image = modalImgInput.files[0]
    const title = modalImgTitle.value
    const category = modalImgCategory[modalImgCategory.selectedIndex].id
    console.log(image, title, category)
    const data = new FormData()
    data.append('title', title)
    data.append('image', image)
    data.append('category', category)
    if (title.lenght !== 0 && category !== "" && image !== undefined) {
        // console.log('ok')
        await fetchPost(data)
        modal2.close()
        location.reload()
    } else {
        modalForm.prepend(alertElement('Veuillez vérifier que tous les champs soient remplis'))
    }
}) 