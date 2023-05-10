
/**
 * Fetch Request Get
 * @param {string} log 
 * @returns {ObjectList|Element}
 */
export async function fetchJSON (log) {
    try {
        const headers = {Accept: 'application/json'}
        const r = await fetch('http://' + window.location.hostname + ':5678/api/' + log, headers)
        if (!r.ok) {
            throw new Error('Erreur serveur', {cause: r})
        }
        return r.json()

    } catch (e) {
        // Si fetch ne fonctionne pas, message d'erreur avec la création d'un nouveau bloc
        const alert = document.createElement('div')
        alert.setAttribute('class', 'alert')
        alert.innerText = `Impossible de charger les éléments : "${e}"`
        document.querySelector('main').prepend(alert)
    }
}

export async function fetchLogin() {
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


