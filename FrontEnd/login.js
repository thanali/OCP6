

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


async function fetchLogin() {
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
        // Condition si erreur
        if(r.status === 401) {
            alertMsg.innerText = 'Veuillez vérifier votre mot de passe'
            alertMsg.classList.add('alert')
            sessionStorage.setItem('token', undefined)
        } else if (r.status === 404) { 
            alertMsg.innerText = 'Veuillez vérifier votre adresse mail'
            alertMsg.classList.add('alert')
            sessionStorage.setItem('token', undefined)
        } else {
            // Si réussite
            const response = await r.json()
            sessionStorage.setItem('token', response.token)
            // Redirection vers page d'accueil
            window.location.href = './index.html'
        }
    } catch(e) {
        console.log(e)
    }
}


// sophie.bluel@test.tld
// S0phie