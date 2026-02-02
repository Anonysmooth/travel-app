/**
 * Composable Vue pour la gestion des notifications toast.
 * Permet d'afficher des messages de succès, erreur ou information.
 *
 * Usage:
 * const toast = useToast()
 * toast.success('Opération réussie!')
 * toast.error('Une erreur est survenue')
 * toast.info('Information importante')
 */
import { ref } from 'vue'

// État global partagé entre tous les composants
const toasts = ref([])
let toastId = 0

export function useToast() {
  /**
   * Ajoute un nouveau toast à la liste.
   * @param {Object} options - Options du toast.
   * @param {'success'|'error'|'info'} options.type - Type de notification.
   * @param {string} options.message - Message à afficher.
   * @param {number} options.duration - Durée d'affichage en ms (0 = permanent).
   * @returns {number} ID du toast créé.
   */
  function addToast({ type = 'info', message, duration = 5000 }) {
    const id = ++toastId
    toasts.value.push({ id, type, message })

    // Auto-suppression après la durée spécifiée
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  /**
   * Supprime un toast par son ID.
   * @param {number} id - ID du toast à supprimer.
   */
  function removeToast(id) {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Affiche un toast de succès (vert).
   * @param {string} message - Message à afficher.
   * @param {number} duration - Durée d'affichage (défaut: 5000ms).
   */
  function success(message, duration) {
    return addToast({ type: 'success', message, duration })
  }

  /**
   * Affiche un toast d'erreur (rouge).
   * @param {string} message - Message à afficher.
   * @param {number} duration - Durée d'affichage (défaut: 5000ms).
   */
  function error(message, duration) {
    return addToast({ type: 'error', message, duration })
  }

  /**
   * Affiche un toast d'information (bleu).
   * @param {string} message - Message à afficher.
   * @param {number} duration - Durée d'affichage (défaut: 5000ms).
   */
  function info(message, duration) {
    return addToast({ type: 'info', message, duration })
  }

  return {
    toasts, // Liste réactive des toasts actifs
    addToast, // Méthode générique
    removeToast, // Suppression manuelle
    success, // Raccourci succès
    error, // Raccourci erreur
    info, // Raccourci info
  }
}
