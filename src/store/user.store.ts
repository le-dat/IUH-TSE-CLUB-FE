/* eslint-disable no-unused-vars */
import { create } from 'zustand'

import { IUser } from '@/types/user.type'
import { getLocalStorage, TokenStorage } from '@/utils/local-storage'

type State = {
  user: IUser | null
  isAdmin: boolean
  isAuthenticated: boolean
}

type Actions = {
  setUser: (user: IUser | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: getLocalStorage('user'),
  setUser: (user) => set({ user }),

  isAdmin: true,
  // isAdmin: getLocalStorage('isAdmin') === 'true',
  setIsAdmin: (isAdmin) => set({ isAdmin }),

  isAuthenticated: !!TokenStorage.getAccessToken(),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))
