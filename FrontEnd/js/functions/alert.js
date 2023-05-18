
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
    const success = document.createElement('div')
    success.setAttribute('class', 'success')
    success.innerText = message
    return success
}