'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import Post from '@/components/Post'
import Loading from '@/components/ui/loading'
import postService from '@/service/post.service'
import { usePostStore } from '@/store/post.store'

export default function Home() {
  const { ref, inView } = useInView()
  const { posts, addToListPost } = usePostStore()
  const [page, setPage] = useState(1)

  const { isLoading, refetch } = useQuery({
    queryKey: [`post-${page}`],
    queryFn: () => postService.getAllPosts({ page: page }),
    enabled: false,
  })

  useEffect(() => {
    if (inView) {
      // Add a delay of 500 milliseconds
      const delay = 500

      const timeoutId = setTimeout(() => {
        refetch().then((result) => {
          if (result.data) {
            addToListPost(result.data?.posts)
            setPage((prevPage) => prevPage + 1)
          }
        })
      }, delay)

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId)
    }
  }, [inView, refetch, addToListPost])

  return (
    <main className='grid w-screen grid-cols-1 gap-x-6 px-5 py-10 pt-0 lg:grid-cols-[1fr_1.5fr_1fr] xl:gap-x-12 xl:px-11'>
      <div />
      <div className='flex flex-col gap-y-4'>
        {posts?.map((post, index) => <Post key={index} data={post} />)}
        <section className='flex w-full items-center justify-center'>
          <div ref={ref}>{inView && isLoading && <Loading />}</div>
        </section>
      </div>
    </main>
  )
}
