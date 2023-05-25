// Imports
import { alertElement } from "./alert.js"


/**
 * @param {string}  API adresss
 * @returns {JSON}
 */
export async function fetchGet(log) {
    try {
        const headers = {Accept: 'application/json'}
        const r = await fetch('http://' + window.location.hostname + ':5678/api/' + log, headers)
        if (!r.ok) {
            throw new Error('Erreur serveur', {cause: r})
        }
        return r.json()
    } catch (e) {
        // Si fetch ne fonctionne pas, message d'erreur avec la création d'un nouveau bloc
        document.querySelector('#portfolio')
            .prepend(alertElement(`Impossible de charger les éléments : "${e}"`))
    }
}


// Fetch POST pour la connexion
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
        return r
    } catch(e) {
        const loginForm = document.querySelector('.login-form')
        loginForm.reset()
        loginForm.prepend(alertElement(`Impossible de se connecter : "${e}"`))
    }
}


/**
 * @param {string} id 
 */
export async function fetchDelete(id) {
    try {
        const options = {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.token}`,
            },
            method: "DELETE",
        }
        const r = await fetch("http://" + window.location.hostname + `:5678/api/works/${id}`, options)
        if (!r.ok) {
            throw new Error('Erreur serveur', {cause: r})
        }
    } catch (e) {
        document.querySelector('.modal-gallery')
            .prepend(alertElement(`Impossible de supprimer le contenu : "${e}"`))
    }
}

/**
 * @param {string} data 
 */
export async function fetchPost(data) {
    try {
        const r = await fetch("http://" + window.location.hostname + ":5678/api/works", {
            method: "POST",
            headers: { 
                Accept: "application/json",
                Authorization: `Bearer ${sessionStorage.token}`,
            },
            body: data
        })
        if (!r.ok) {
            throw new Error('Erreur serveur', {cause: r})
        }
        return r
    } catch (e) {
        const modalForm = modal2.querySelector('#modal2-form')
        const modalImgOutput = modalForm.querySelector('output')
        modalForm.reset()
        modalImgOutput.innerHTML = ""
        modalForm.prepend(alertElement(`Impossible de créer l'élément : "${e}"`))
    }
}