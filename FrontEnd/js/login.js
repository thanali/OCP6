import { alertElement, alertStyleInput } from "./functions/alert.js"
import { fetchLogin } from "./functions/api.js"

const loginForm = document.querySelector('.login-form')
const loginSubmit = document.querySelector('.login-submit')
// Récupératioin des données user
const email = document.querySelector('#email')
const password = document.querySelector('#password')


loginSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    submitLogin()
})

function submitLogin() {
    // Vérifie le contenu des inputs
    if (email.value == "" || password.value == "") {
        loginForm.prepend(alertElement('Veuillez renseigner votre email et votre mot de passe'))
        alertStyleInput(password)
        alertStyleInput(email)
    } else {
        // Récupération du token user
        login()
    }
}    

async function login() {
    const r = await fetchLogin()
    // console.log(r)

    if(r.status === 200) {
        // Si réussite
        const response = await r.json()
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('auth', true)
        // Redirection vers page d'accueil
        window.location.href = './index.html'
    // Traitement des erreurs
    } else if (r.status === 404) { 
        loginForm.prepend(alertElement('Veuillez vérifier votre adresse mail'))
        alertStyleInput(email)
        sessionStorage.setItem('token', undefined)
        sessionStorage.setItem('auth', false)
    } else if (r.status === 401) {
        loginForm.prepend(alertElement('Veuillez vérifier votre mot de passe'))
        alertStyleInput(password)
        sessionStorage.setItem('token', undefined)
        sessionStorage.setItem('auth', false)
    }
}

// Retire message et outline d'erreur
loginForm.addEventListener('focusin', () => {
    email.style.border = "initial"
    password.style.border = "initial"
    if (loginForm.firstElementChild.className === 'alertElement') {
        loginForm.firstElementChild.remove()
    }
})