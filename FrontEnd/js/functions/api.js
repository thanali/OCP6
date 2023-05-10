
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



