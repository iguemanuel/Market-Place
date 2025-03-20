import { defineStore } from 'pinia'
import type { User } from '@/interfaces/Auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    token: '',
    role: '',
  }),

  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    setRole(role: string) {
      this.role = role
    },
  },
})
