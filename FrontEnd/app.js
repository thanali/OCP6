
import { fetchJSON } from "./functions/api.js"
import { createFilter, galleryContent} from "./components/portfolio.js"

// Création de la galerie
let works = await fetchJSON('works')
// Boucle dans l'API pour compléter la galerie
galleryContent(works)

// Création des boutons filtres
let categories = await fetchJSON('categories')
// Création des boutons à partir des noms des catégories
createFilter(categories)

