/* eslint-disable no-unused-vars */
import { create } from 'zustand'

import { TokenStorage } from '@/utils/local-storage'

type User = {
  id: string
  name: string
  email: string
}

type State = {
  user: User | null
  isAuthenticated: boolean
}

type Actions = {
  setUser: (user: User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: !!TokenStorage.getAccessToken(),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))
