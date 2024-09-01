'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { IPost } from '@/types/post.type'

import Comment from './ui/comment'

interface IProps {
  data: IPost
}

const Comments = ({ data }: IProps) => {
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent} className='m mt-4 flex flex-col gap-4'>
      {data?.comments?.map((item, index) => <Comment key={`content_${index}`} content={item.content} />)}
    </div>
  )
}

export default Comments
