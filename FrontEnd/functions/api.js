

/**
 * Fonction fetch de base
 * @param {string} url 
 * @param {string} method
 * @returns {[Promise]}
 */
export async function fetchJSON (url, method) {
    const r = await fetch(url, {headers: {Method: method, Accept: 'application/json'}})
    if (r.ok) {
        return r.json()
    }
    throw new Error(`Erreur serveur, cause: ${r}`)
}
