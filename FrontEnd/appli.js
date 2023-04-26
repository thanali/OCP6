import { fetchJSON } from "./functions/api.js"

const url = 'http://localhost:5678/api'
const gallery = document.querySelector('.gallery')
const portfolio = document.querySelector('#portfolio')



try {
    const works = await fetchJSON(url + '/works', 'GET')

    console.log(works)

    const portfolioContent = new Gallery(works)
    portfolioContent.append(gallery)
} catch (e){
    const alert = document.createElement('div')
    alert.classList.add('alert')
    alert.innerText = 'Impossible de charger les éléments'
    portfolio.prepend(alert)
}

