export const storageConstants = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
}

const isBrowser = typeof window !== 'undefined'

export const setLocalStorage = (name: string, value: any) => {
  if (isBrowser) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}

export const getLocalStorage = (name: string) => {
  if (isBrowser) {
    const item = localStorage.getItem(name)
    return item ? JSON.parse(item) : null
  }
  return null
}

export const removeLocalStorage = (name: string) => {
  if (isBrowser) {
    localStorage.removeItem(name)
  }
}

export const TokenStorage = {
  setToken: (accessToken: string) => {
    if (accessToken && isBrowser) {
      localStorage.setItem(storageConstants.accessToken, accessToken)
    }
  },

  setRefreshToken: (refreshToken: string) => {
    if (refreshToken && isBrowser) {
      localStorage.setItem(storageConstants.refreshToken, refreshToken)
    }
  },

  getAccessToken: () => {
    if (isBrowser) {
      return localStorage.getItem(storageConstants.accessToken)
    }
    return null
  },

  getRefreshToken: () => {
    if (isBrowser) {
      return localStorage.getItem(storageConstants.refreshToken)
    }
    return null
  },

  clearToken: () => {
    if (isBrowser) {
      localStorage.removeItem(storageConstants.accessToken)
      localStorage.removeItem(storageConstants.refreshToken)
    }
  },
}
