import { fetchJSON } from "./functions/api.js"
import { GalleryContent } from "./components/portfolio.js"

// URL générale de l'API
const url = 'http://localhost:5678/api'

try {
    // Récupération des données
    const works = await fetchJSON(url + '/works')

    // Boucle dans l'API pour compléter la galerie
    for (let work of works) {
        new GalleryContent(work)
    }

} catch (e) {
    // Si fetch ne fonctionne pas, message d'erreur avec la création d'un nouveau bloc
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert')
    alert.innerText = 'Impossible de charger les éléments'
    document.querySelector('#portfolio').append(alert)
}