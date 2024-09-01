import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  storageConstants,
  TokenStorage,
} from '@/utils/local-storage'

describe('local-storage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('setLocalStorage', () => {
    it('should set an item in localStorage', () => {
      setLocalStorage('testKey', { foo: 'bar' })
      expect(localStorage.getItem('testKey')).toBe(JSON.stringify({ foo: 'bar' }))
    })
  })

  describe('getLocalStorage', () => {
    it('should get an item from localStorage', () => {
      localStorage.setItem('testKey', JSON.stringify({ foo: 'bar' }))
      expect(getLocalStorage('testKey')).toEqual({ foo: 'bar' })
    })

    it('should return null if the item does not exist', () => {
      expect(getLocalStorage('nonExistentKey')).toBeNull()
    })
  })

  describe('removeLocalStorage', () => {
    it('should remove an item from localStorage', () => {
      localStorage.setItem('testKey', JSON.stringify({ foo: 'bar' }))
      removeLocalStorage('testKey')
      expect(localStorage.getItem('testKey')).toBeNull()
    })
  })

  describe('TokenStorage', () => {
    it('should set access token', () => {
      TokenStorage.setToken('accessTokenValue')
      expect(localStorage.getItem(storageConstants.accessToken)).toBe('accessTokenValue')
    })

    it('should set refresh token', () => {
      TokenStorage.setRefreshToken('refreshTokenValue')
      expect(localStorage.getItem(storageConstants.refreshToken)).toBe('refreshTokenValue')
    })

    it('should get access token', () => {
      localStorage.setItem(storageConstants.accessToken, 'accessTokenValue')
      expect(TokenStorage.getAccessToken()).toBe('accessTokenValue')
    })

    it('should get refresh token', () => {
      localStorage.setItem(storageConstants.refreshToken, 'refreshTokenValue')
      expect(TokenStorage.getRefreshToken()).toBe('refreshTokenValue')
    })

    it('should clear tokens', () => {
      localStorage.setItem(storageConstants.accessToken, 'accessTokenValue')
      localStorage.setItem(storageConstants.refreshToken, 'refreshTokenValue')
      TokenStorage.clearToken()
      expect(localStorage.getItem(storageConstants.accessToken)).toBeNull()
      expect(localStorage.getItem(storageConstants.refreshToken)).toBeNull()
    })
  })
})
