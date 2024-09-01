'use client'
import { useSearchParams } from 'next/navigation'

import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import Empty from '@/components/Empty'
import Post from '@/components/Post'
import Sidebar from '@/components/Sidebar'
import postService from '@/service/post.service'
import { IPost } from '@/types/post.type'

const SearchPage = () => {
  const searchParams = useSearchParams()
  const content = searchParams.get('content') || ''
  const date = searchParams.get('date') || ''
  const numberComment = searchParams.get('number_of_comments') || ''

  const { data, refetch } = useQuery({
    queryKey: [`filter-post-${content}-${date}-${numberComment}`],
    queryFn: () => postService.filterPosts({ content, date, number_of_comments: numberComment }),
    enabled: false,
  })

  const memoizedSidebar = useMemo(() => <Sidebar />, [])

  useEffect(() => {
    refetch()
  }, [refetch, content, date, numberComment])

  const Content = {
    empty: <Empty />,
    data: (
      <div className='flex flex-col gap-y-4'>
        {data?.data?.map((post: IPost, index: number) => <Post key={index} data={post} searchContent={content} />)}
      </div>
    ),
  }

  return (
    <main className='grid w-screen grid-cols-1 gap-6 px-5 pt-0 lg:grid-cols-[1fr_1.5fr_1fr] xl:gap-x-12 xl:px-11'>
      {memoizedSidebar}
      {Content[data?.data?.length === 0 ? 'empty' : 'data']}
      <div />
    </main>
  )
}

export default SearchPage
