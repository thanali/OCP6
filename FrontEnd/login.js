import { fetchLogin } from "./js/functions/api.js"


const loginSubmit = document.querySelector('.login-submit')
const alertMsg = document.querySelector('p')
// Récupératioin des données user
const email = document.querySelector('#email')
const password = document.querySelector('#password')


loginSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    submit()
})

async function submit() {

    if (email.value == "" || password.value == "") {
        alertMsg.innerText = 'Veuillez renseigner votre email et mot de passe'
        alertMsg.classList.add('alert')
    } else {
        // Récupération du token user
        await fetchLogin()
    }
}    



// sophie.bluel@test.tld
// S0phie