/**
 * Service d'authentification.
 * Contient les appels API liés à l'authentification utilisateur.
 */
import api from './api'

export const authService = {
  /**
   * Inscription d'un nouvel utilisateur.
   * @param {string} email - Adresse email de l'utilisateur.
   * @param {string} password - Mot de passe (min. 8 caractères).
   * @param {string} confirmPassword - Confirmation du mot de passe.
   * @returns {Promise<{token: string, email: string, userId: string, expiresAt: string}>}
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

  // TODO US-002: Ajouter la méthode login()
  // async login(email, password) { ... }

  // TODO US-003: Ajouter la méthode logout()
  // async logout() { ... }
}
