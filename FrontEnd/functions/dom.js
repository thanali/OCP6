
/**
 * Mise en page des éléments de la galerie
 * @param {string} work 
 * @returns {HTMLElement}
 */
export function layoutContent (work) {
    const layout = document.querySelector('#gallery-layout').content.cloneNode(true)
    const figure = layout.querySelector('figure')
    const img = layout.querySelector('img')
    const figcaption = layout.querySelector('figcaption')
    figure.setAttribute('id', `work-${work.id}`)
    img.src = work.imageUrl
    img.alt = work.title
    figcaption.innerText = work.title

    return figure
}