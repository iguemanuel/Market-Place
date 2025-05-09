import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    token: '',
  }),

  actions: {
    setUser(payload: { user: User; token: string }) {
      this.user = payload.user
      this.token = payload.token
    },
    clearUser() {
      this.user = {} as User
      this.token = ''
    },
  },

  persist: true,
})
