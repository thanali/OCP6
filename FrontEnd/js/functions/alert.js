
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

/**
 * Bordure en cas d'erreur dans formulaires
 * @param {string} element 
 */
export function alertStyleInput(element) {
    element.style.border = "thick solid #f10707b3"
}

/**
 * @param {string} message 
 */
export function succesUpload(message) {
    const success = document.createElement('div')
    success.setAttribute('class', 'success')
    success.innerText = message
    return success
}