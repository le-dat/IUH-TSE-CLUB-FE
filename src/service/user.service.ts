import axiosClient from './axios.client'

const userService = {
  createUser: async ({ email, name, password }: { email: string; name: string; password: string }) => {
    try {
      const response = await axiosClient.post('/users', { email, name, password })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to create user')
    }
  },

  getUserById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get(`/users/${id}`)
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to fetch user')
    }
  },

  updateUser: async ({ id, email, name }: { id: string; email: string; name: string }) => {
    try {
      const response = await axiosClient.put(`/users/${id}`, { email, name })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to update user')
    }
  },

  deleteUser: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete(`/users/${id}`)
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to delete user')
    }
  },

  getAllUsers: async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosClient.get('/users', {
        params: { page, limit },
      })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to fetch users')
    }
  },

  filterUsers: async ({
    email,
    name,
    date,
    page = 1,
    limit = 10,
  }: {
    email?: string
    name?: string
    date?: string
    page?: number
    limit?: number
  } = {}) => {
    try {
      const response = await axiosClient.get('/users/filter', {
        params: { email, name, date, page, limit },
      })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to filter users')
    }
  },
}

export default userService
