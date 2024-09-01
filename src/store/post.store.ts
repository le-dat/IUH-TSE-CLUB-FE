/* eslint-disable no-unused-vars */
import { create } from 'zustand'

type Comment = {
  user_id: string
  content: string
}

type Post = {
  _id: string
  user_id: string
  title: string
  content: string
  comments: Comment[]
}

type State = {
  post: Post | null
  posts: Post[]
}

type Actions = {
  setPost: (post: Post) => void
  setListPost: (posts: Post[]) => void
  addToListPost: (posts: Post[]) => void
  addComment: (postId: string, comment: Comment) => void
  updateComment: (postId: string, commentIndex: number, content: string) => void
  deleteComment: (postId: string, commentIndex: number) => void
}

export const usePostStore = create<State & Actions>((set) => ({
  post: null,
  posts: [],
  setPost: (post) => set({ post }),
  setListPost: (posts) => set({ posts }),
  addToListPost: (post) => set((state) => ({ posts: [...state.posts, ...post] })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.user_id === postId ? { ...post, comments: [...post.comments, comment] } : post
      ),
    })),
  updateComment: (postId, commentIndex, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.user_id === postId
          ? {
              ...post,
              comments: post.comments.map((comment, index) =>
                index === commentIndex ? { ...comment, content } : comment
              ),
            }
          : post
      ),
    })),
  deleteComment: (postId, commentIndex) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.user_id === postId
          ? {
              ...post,
              comments: post.comments.filter((_, index) => index !== commentIndex),
            }
          : post
      ),
    })),
}))
