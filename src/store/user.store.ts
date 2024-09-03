/* eslint-disable no-unused-vars */
import { create } from 'zustand'

import { IUser } from '@/types/user.type'
import { getLocalStorage, TokenStorage } from '@/utils/local-storage'

type State = {
  user: IUser | null
  isAuthenticated: boolean
}

type Actions = {
  setUser: (user: IUser | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: getLocalStorage('user'),
  setUser: (user) => set({ user }),
  isAuthenticated: !!TokenStorage.getAccessToken(),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))
