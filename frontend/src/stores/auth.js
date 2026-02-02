/**
 * Store Pinia pour la gestion de l'authentification.
 * Gère l'état de connexion, le token JWT et les informations utilisateur.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  // ============================================
  // STATE (données réactives)
  // ============================================

  /** Informations de l'utilisateur connecté */
  const user = ref(null)

  /** Token JWT stocké en localStorage pour persistance */
  const token = ref(localStorage.getItem('token') || null)

  /** Indicateur de chargement pour les opérations async */
  const isLoading = ref(false)

  /** Message d'erreur de la dernière opération */
  const error = ref(null)

  // ============================================
  // GETTERS (propriétés calculées)
  // ============================================

  /** Vérifie si l'utilisateur est authentifié */
  const isAuthenticated = computed(() => !!token.value)

  /** Récupère l'email de l'utilisateur connecté */
  const userEmail = computed(() => user.value?.email || null)

  // ============================================
  // ACTIONS (méthodes)
  // ============================================

  /**
   * Inscription d'un nouvel utilisateur.
   * En cas de succès, stocke le token et connecte automatiquement.
   * @param {string} email - Adresse email.
   * @param {string} password - Mot de passe.
   * @param {string} confirmPassword - Confirmation du mot de passe.
   * @returns {Promise<{success: boolean, error?: string, code?: string, fieldErrors?: object}>}
   */
  async function register(email, password, confirmPassword) {
    isLoading.value = true
    error.value = null

    try {
      // Appel API d'inscription
      const response = await authService.register(email, password, confirmPassword)

      // Stockage du token JWT
      token.value = response.token
      user.value = {
        id: response.userId,
        email: response.email,
      }

      // Persistance du token en localStorage
      localStorage.setItem('token', response.token)

      return { success: true }
    } catch (err) {
      // Extraction des informations d'erreur
      const errorData = err.response?.data
      error.value = errorData?.message || 'Registration failed. Please try again.'

      return {
        success: false,
        error: error.value,
        code: errorData?.code, // Code d'erreur (ex: EMAIL_EXISTS)
        fieldErrors: errorData?.errors, // Erreurs de validation par champ
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Déconnexion de l'utilisateur.
   * Supprime le token et les informations utilisateur.
   */
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  /**
   * Efface le message d'erreur.
   */
  function clearError() {
    error.value = null
  }

  /**
   * Initialise le store à partir du token stocké en localStorage.
   * Appelé au démarrage de l'application.
   */
  function initializeFromToken() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      // TODO: Décoder le token JWT pour extraire les infos utilisateur
    }
  }

  // ============================================
  // EXPORT
  // ============================================
  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    userEmail,
    // Actions
    register,
    logout,
    clearError,
    initializeFromToken,
  }
})
