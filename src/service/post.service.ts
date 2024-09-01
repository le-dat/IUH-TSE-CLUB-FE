import axiosClient from './axios.client'

const postService = {
  createPost: async ({ title, content }: { title: string; content: string }) => {
    try {
      const response = await axiosClient.post('/posts', { title, content })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to create post')
    }
  },

  getAllPosts: async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosClient.get('/posts', {
        params: { page, limit },
      })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to fetch posts')
    }
  },

  filterPosts: async ({
    title,
    content,
    date,
    number_of_comments,
    page = 1,
    limit = 10,
  }: {
    title?: string
    content?: string
    date?: string
    number_of_comments?: string
    page?: number
    limit?: number
  } = {}) => {
    try {
      const response = await axiosClient.get('/posts/filter', {
        params: { title, content, date, number_of_comments, page, limit },
      })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to filter posts')
    }
  },

  getPostById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get(`/posts/${id}`)
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to fetch post')
    }
  },

  updatePost: async ({ id, title, content }: { id: string; title: string; content: string }) => {
    try {
      const response = await axiosClient.put(`/posts/${id}`, { title, content })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to update post')
    }
  },

  deletePost: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete(`/posts/${id}`)
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to delete post')
    }
  },

  addComment: async ({ postId, comment }: { postId: string; comment: { user_id: string; content: string } }) => {
    try {
      const response = await axiosClient.post(`/posts/${postId}/comment`, { comment })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to add comment')
    }
  },

  updateComment: async ({ postId, commentId, content }: { postId: string; commentId: string; content: string }) => {
    try {
      const response = await axiosClient.put(`/posts/${postId}/comment/${commentId}`, { content })
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to update comment')
    }
  },

  deleteComment: async ({ postId, commentId }: { postId: string; commentId: string }) => {
    try {
      const response = await axiosClient.delete(`/posts/${postId}/comment/${commentId}`)
      return response.data
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.message ?? 'Failed to delete comment')
    }
  },
}

export default postService
