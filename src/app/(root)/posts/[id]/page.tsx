'use client'
import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import Post from '@/components/Post'
import Loading from '@/components/ui/loading'
import postService from '@/service/post.service'

const PostDetail = () => {
  const { id } = useParams()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`post-${id}`],
    queryFn: () => postService.getPostById({ id: id as string }),
  })

  if (isLoading) return <Loading />

  return (
    <div className='grid w-screen grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]'>
      <div />
      <Post data={data} showComment className='h-fit' refetch={refetch} />
      <div />
    </div>
  )
}

export default PostDetail
