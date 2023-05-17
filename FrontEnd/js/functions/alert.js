
/**
 * Renvoie un élément HTML pour une alerte
 * @param {string} message 
 */
export function alertElement(message) {    
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alertElement')
    alert.innerText = message
    return alert
}

export function succesUpload(message) {
    const div = document.createElement('div')
    div.setAttribute('class', 'success')
    div.innerText = message
    return div
}