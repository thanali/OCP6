import { alertElement } from "./alert.js"

export async function fetchGet (log) {
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