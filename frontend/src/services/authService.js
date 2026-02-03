/**
 * Service d'authentification.
 * Contient les appels API liés à l'authentification utilisateur.
 */
import api from './api'

export const authService = {
  /**
   * Inscription d'un nouvel utilisateur.
   * Ne retourne pas de token - l'utilisateur doit confirmer son email.
   * @param {string} email - Adresse email de l'utilisateur.
   * @param {string} password - Mot de passe (min. 8 caractères).
   * @param {string} confirmPassword - Confirmation du mot de passe.
   * @returns {Promise<{message: string, email: string}>}
   * @throws {Error} Si l'email existe déjà ou validation échouée.
   */
  async register(email, password, confirmPassword) {
    const response = await api.post('/auth/register', {
      email,
      password,
      confirmPassword,
    })
    return response.data
  },

  /**
   * Confirmation de l'adresse email via le token reçu par email.
   * @param {string} token - Token de confirmation.
   * @returns {Promise<{token: string, email: string, userId: string, expiresAt: string}>}
   * @throws {Error} Si le token est invalide ou expiré.
   */
  async confirmEmail(token) {
    const response = await api.get(`/auth/confirm-email?token=${token}`)
    return response.data
  },

  /**
   * Renvoie l'email de confirmation.
   * @param {string} email - Adresse email de l'utilisateur.
   * @returns {Promise<{message: string, email: string}>}
   */
  async resendConfirmation(email) {
    const response = await api.post('/auth/resend-confirmation', { email })
    return response.data
  },

  // TODO US-002: Ajouter la méthode login()
  // async login(email, password) { ... }
}
