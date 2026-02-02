import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(value) {
      this.isLoading = value
    },
  },
})
