<script setup>
/**
 * Page d'inscription utilisateur.
 * Après inscription, affiche un message demandant de vérifier l'email.
 */
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToast } from '../composables/useToast'
import { Mail, Lock, Eye, EyeOff, UserPlus, Loader2, Plane, CheckCircle, RefreshCw } from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToast()

// Form state
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Success state - affiche le message "vérifiez votre email"
const registrationSuccess = ref(false)
const registeredEmail = ref('')

// Resend state
const isResending = ref(false)

// Validation errors
const errors = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

// Validation rules
const validateEmail = (value) => {
  if (!value) return "L'email est requis"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide"
  return ''
}

const validatePassword = (value) => {
  if (!value) return 'Le mot de passe est requis'
  if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères'
  return ''
}

const validateConfirmPassword = (value) => {
  if (!value) return 'La confirmation est requise'
  if (value !== password.value) return 'Les mots de passe ne correspondent pas'
  return ''
}

// Validate single field
const validateField = (field) => {
  switch (field) {
    case 'email':
      errors.value.email = validateEmail(email.value)
      break
    case 'password':
      errors.value.password = validatePassword(password.value)
      if (confirmPassword.value) {
        errors.value.confirmPassword = validateConfirmPassword(confirmPassword.value)
      }
      break
    case 'confirmPassword':
      errors.value.confirmPassword = validateConfirmPassword(confirmPassword.value)
      break
  }
}

// Validate all fields
const validateForm = () => {
  errors.value.email = validateEmail(email.value)
  errors.value.password = validatePassword(password.value)
  errors.value.confirmPassword = validateConfirmPassword(confirmPassword.value)

  return !errors.value.email && !errors.value.password && !errors.value.confirmPassword
}

// Form validity computed
const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    confirmPassword.value &&
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirmPassword
  )
})

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return

  const result = await authStore.register(email.value, password.value, confirmPassword.value)

  if (result.success) {
    // Affiche l'écran de succès avec message "vérifiez votre email"
    registeredEmail.value = email.value
    registrationSuccess.value = true
  } else {
    if (result.code === 'EMAIL_EXISTS') {
      errors.value.email = 'Un compte existe déjà avec cet email'
    } else if (result.fieldErrors) {
      // Map server validation errors to form fields
      Object.keys(result.fieldErrors).forEach((key) => {
        const fieldName = key.charAt(0).toLowerCase() + key.slice(1)
        if (Object.prototype.hasOwnProperty.call(errors.value, fieldName)) {
          errors.value[fieldName] = result.fieldErrors[key][0]
        }
      })
    } else {
      toast.error(result.error)
    }
  }
}

// Resend confirmation email
const handleResendConfirmation = async () => {
  isResending.value = true
  try {
    const result = await authStore.resendConfirmation(registeredEmail.value)
    if (result.success) {
      toast.success('Email de confirmation renvoyé !')
    } else {
      toast.error(result.error || 'Erreur lors du renvoi')
    }
  } finally {
    isResending.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Success State - Email Sent -->
      <div v-if="registrationSuccess" class="text-center">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex justify-center mb-6">
            <div class="p-4 bg-green-100 rounded-full">
              <CheckCircle class="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 class="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h1>

          <p class="text-gray-600 mb-6">
            Un email de confirmation a été envoyé à
            <span class="font-semibold text-gray-900">{{ registeredEmail }}</span>
          </p>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p class="text-sm text-blue-800">
              Cliquez sur le lien dans l'email pour activer votre compte. Le lien expire dans
              <strong>24 heures</strong>.
            </p>
          </div>

          <div class="space-y-3">
            <p class="text-sm text-gray-500">Vous n'avez pas reçu l'email ?</p>

            <button
              @click="handleResendConfirmation"
              :disabled="isResending"
              :class="[
                'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg',
                'border border-gray-300 text-gray-700 transition-colors',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500',
                isResending ? 'opacity-50 cursor-not-allowed' : '',
              ]"
            >
              <RefreshCw :class="['w-4 h-4', isResending ? 'animate-spin' : '']" />
              <span>{{ isResending ? 'Envoi en cours...' : 'Renvoyer l\'email' }}</span>
            </button>

            <p class="text-xs text-gray-400">
              Vérifiez aussi vos spams ou courriers indésirables.
            </p>
          </div>
        </div>

        <!-- Back to login -->
        <div class="mt-6 text-center">
          <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
            Retour à la connexion
          </router-link>
        </div>
      </div>

      <!-- Registration Form -->
      <template v-else>
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <div class="p-3 bg-primary-100 rounded-full">
              <Plane class="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Créer un compte</h1>
          <p class="mt-2 text-gray-600">Rejoignez Travel App pour organiser vos voyages</p>
        </div>

        <!-- Form Card -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  placeholder="vous@exemple.com"
                  @blur="validateField('email')"
                  :class="[
                    'w-full pl-10 pr-4 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    errors.email
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400',
                  ]"
                />
              </div>
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Minimum 8 caractères"
                  @blur="validateField('password')"
                  :class="[
                    'w-full pl-10 pr-12 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    errors.password
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400',
                  ]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-500">
                {{ errors.password }}
              </p>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Retapez votre mot de passe"
                  @blur="validateField('confirmPassword')"
                  :class="[
                    'w-full pl-10 pr-12 py-3 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    errors.confirmPassword
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400',
                  ]"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500">
                {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="authStore.isLoading || !isFormValid"
              :class="[
                'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg',
                'font-semibold text-white transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                authStore.isLoading || !isFormValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700',
              ]"
            >
              <Loader2 v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
              <UserPlus v-else class="w-5 h-5" />
              <span>{{ authStore.isLoading ? 'Création en cours...' : 'Créer mon compte' }}</span>
            </button>
          </form>

          <!-- Login Link -->
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Déjà un compte ?
              <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
                Se connecter
              </router-link>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
