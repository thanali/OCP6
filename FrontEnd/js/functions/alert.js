
/**
 * Renvoie un élément HTML pour une alerte
 * @param {string} message 
 */
export function alertElement(message) {    
    const alert = document.createElement('div')
    alert.setAttribute('class', 'alert')
    alert.innerText = message
    return alert
}