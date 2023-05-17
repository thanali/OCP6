import { alertElement } from "./functions/alert.js"

const loginForm = document.querySelector('.login-form')
const loginSubmit = document.querySelector('.login-submit')
// Récupératioin des données user
const email = document.querySelector('#email')
const password = document.querySelector('#password')


email.addEventListener('focusin', () => email.style.border = "initial")
password.addEventListener('focusin', () => password.style.border = "initial")

loginSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    submitLogin()
})

function submitLogin() {
    // console.log(loginForm.firstElementChild)
    if (loginForm.firstElementChild.getAttribute('class', 'alertElement')) {
        loginForm.firstElementChild.remove()
    }
    // Vérifie le cntenu des inputs
    if (email.value == "" || password.value == "") {
        loginForm.prepend(alertElement('Veuillez renseigner votre email et mot de passe'))
        password.style.border = "thick solid #f10707b3"
        email.style.border = "thick solid #f10707b3"
    } else {
        // Récupération du token user
        login()
    }
}    

async function login() {
    try {
        const r = await fetch("http://" + window.location.hostname + ":5678/api/users/login", {
            method: "POST",
            headers: { 
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
        })
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
            email.style.border = "thick solid #f10707b3"
            sessionStorage.setItem('token', undefined)
            sessionStorage.setItem('auth', false)
        } else if (r.status === 401) {
            loginForm.prepend(alertElement('Veuillez vérifier votre mot de passe'))
            password.style.border = "thick solid #f10707b3"
            sessionStorage.setItem('token', undefined)
            sessionStorage.setItem('auth', false)
        }
    } catch(e) {
        loginForm.reset()
        loginForm.prepend(alertElement(`Impossible de se connecter : "${e}"`))
    }
}