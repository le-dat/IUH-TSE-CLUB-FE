export type IComment = {
  user_id: string
  content: string
}

export type IPost = {
  _id: string
  user_id: string
  title: string
  content: string
  comments: IComment[]
}
