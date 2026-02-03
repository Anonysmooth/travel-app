<script setup>
/**
 * Page de confirmation d'email.
 * Valide le token reçu par email et connecte automatiquement l'utilisateur.
 */
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from '../composables/useToast'
import { CheckCircle, XCircle, Loader2, Plane } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// États de la page
const status = ref('loading') // 'loading' | 'success' | 'error'
const errorMessage = ref('')
const errorCode = ref('')

// Confirmation automatique au chargement
onMounted(async () => {
  const token = route.query.token

  if (!token) {
    status.value = 'error'
    errorMessage.value = 'Lien de confirmation invalide.'
    errorCode.value = 'MISSING_TOKEN'
    return
  }

  // Appel API de confirmation
  const result = await authStore.confirmEmail(token)

  if (result.success) {
    status.value = 'success'
    toast.success('Email confirmé ! Bienvenue sur Travel App.')

    // Redirection après 2 secondes
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } else {
    status.value = 'error'
    errorMessage.value = result.error
    errorCode.value = result.code
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-lg p-8 text-center">
        <!-- Loading State -->
        <template v-if="status === 'loading'">
          <div class="flex justify-center mb-6">
            <div class="p-4 bg-primary-100 rounded-full">
              <Loader2 class="w-12 h-12 text-primary-600 animate-spin" />
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Confirmation en cours...</h1>
          <p class="text-gray-600">Veuillez patienter pendant la vérification de votre email.</p>
        </template>

        <!-- Success State -->
        <template v-else-if="status === 'success'">
          <div class="flex justify-center mb-6">
            <div class="p-4 bg-green-100 rounded-full">
              <CheckCircle class="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Email confirmé !</h1>
          <p class="text-gray-600 mb-6">
            Votre compte est maintenant actif. Vous allez être redirigé vers l'accueil...
          </p>
          <div class="flex justify-center">
            <Loader2 class="w-5 h-5 text-primary-600 animate-spin" />
          </div>
        </template>

        <!-- Error State -->
        <template v-else-if="status === 'error'">
          <div class="flex justify-center mb-6">
            <div class="p-4 bg-red-100 rounded-full">
              <XCircle class="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Échec de la confirmation</h1>
          <p class="text-gray-600 mb-6">{{ errorMessage }}</p>

          <!-- Actions selon le type d'erreur -->
          <div class="space-y-3">
            <template v-if="errorCode === 'TOKEN_EXPIRED'">
              <p class="text-sm text-gray-500">Le lien a expiré. Veuillez vous réinscrire.</p>
              <router-link
                to="/register"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <Plane class="w-5 h-5" />
                S'inscrire à nouveau
              </router-link>
            </template>

            <template v-else-if="errorCode === 'ALREADY_CONFIRMED'">
              <p class="text-sm text-gray-500">
                Cet email a déjà été confirmé. Vous pouvez vous connecter.
              </p>
              <router-link
                to="/login"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Se connecter
              </router-link>
            </template>

            <template v-else>
              <p class="text-sm text-gray-500">
                Le lien est invalide ou a déjà été utilisé.
              </p>
              <div class="flex flex-col gap-2">
                <router-link
                  to="/register"
                  class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  S'inscrire
                </router-link>
                <router-link
                  to="/login"
                  class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Se connecter
                </router-link>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
