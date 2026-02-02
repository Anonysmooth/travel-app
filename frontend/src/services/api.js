/**
 * Configuration Axios pour les appels API.
 * Gère automatiquement l'authentification JWT et les erreurs.
 */
import axios from 'axios'

// Création de l'instance Axios avec configuration de base
const api = axios.create({
  baseURL: '/api', // Proxy configuré dans vite.config.js
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Intercepteur de requêtes.
 * Ajoute automatiquement le token JWT dans le header Authorization.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Intercepteur de réponses.
 * Gère les erreurs 401 (non autorisé) en déconnectant l'utilisateur.
 */
api.interceptors.response.use(
  (response) => response, // Succès: retourne la réponse telle quelle
  (error) => {
    // Erreur 401: Token invalide ou expiré
    if (error.response?.status === 401) {
      localStorage.removeItem('token') // Supprime le token invalide
      window.location.href = '/login' // Redirige vers la page de connexion
    }
    return Promise.reject(error) // Propage l'erreur pour traitement
  }
)

export default api
