import { fetchJSON } from "./functions/api.js"
import { GalleryLayoutContent } from "./components/GalleryElement.js"

// URL générale de l'API
const url = 'http://localhost:5678/api'

try {
    // Récupération des données
    const works = await fetchJSON(url + '/works')
    console.log(works)
    // Mise en page des éléments de la gallerie avec le contenu de l'API
    const list = new GalleryLayoutContent(works)
    // Rattache les éléments au DOM
    list.appendTo(document.querySelector('.gallery'))

} catch (e) {
    // Si fetch ne fonctionne pas, message d'erreur avec la création d'un nouveau bloc
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert')
    alert.innerText = 'Impossible de charger les éléments'
    document.querySelector('#portfolio').append(alert)
}