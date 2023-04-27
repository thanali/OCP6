
/**
 * Méthode fetch générale
 * @param {string} url 
 * @param {string} options facultatif
 * @returns {JSON}
 */
export async function fetchJSON (url, options = {}) {
    const headers = {Accept: 'application/json', ...options.headers} // Récupère les options en place dans headers et ajoute Accept
    const r = await fetch(url, {...options,headers})
    if (!r.ok) {
        throw new Error('Erreur serveur', {cause: r})
    }
    return r.json()
}
