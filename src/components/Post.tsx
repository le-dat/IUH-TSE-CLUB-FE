'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { toast } from 'sonner'

import { ROUTES } from '@/constants/routes'
import CommentIcon from '@/icons/post/comment.svg'
import LikeIcon from '@/icons/post/like.svg'
import { IPost } from '@/types/post.type'

import Button from './ui/button'
import Comments from './Comments'
import FormComment from './FormComment'

interface IProps {
  data: IPost
  showComment?: boolean
  className?: string
  refetch?: () => void
  searchContent?: string
}
const Post = ({ data, showComment, className, refetch, searchContent = '' }: IProps) => {
  const router = useRouter()
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false)

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text
    }
    const regex = new RegExp(`(${highlight})`, 'gi')
    return text.split(regex).map((part, index) => (regex.test(part) ? <mark key={index}>{part}</mark> : part))
  }

  const handleLike = () => {
    toast.info('Coming soon!')
  }

  const handleShowComment = () => {
    if (showComment) {
      setIsFocusInput(true)
      return
    }
    router.push(`${ROUTES.POSTS}/${data?._id}`)
  }

  return (
    <div className={`rounded-md bg-white p-4 ${className}`}>
      <h1 className='text-lg font-bold'>{highlightText(data.title, searchContent)}</h1>
      <p>{highlightText(data.content, searchContent)}</p>
      <div className={`${showComment ? 'border-y' : 'border-t'} mt-4 grid grid-cols-3 border-slate-300 py-2`}>
        <Button
          onClick={handleLike}
          className='flex w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-[rgba(68,79,142)] hover:bg-[#e7e9f2]'
        >
          <Image src={LikeIcon} alt='like-icon' width={20} height={20} />
          Like
        </Button>
        <Button
          onClick={handleShowComment}
          className='flex w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-[rgba(68,79,142)] hover:bg-[#e7e9f2]'
        >
          <Image src={CommentIcon} alt='comment-icon' width={20} height={20} />
          Comments
        </Button>
        <button
          onClick={handleShowComment}
          className='ml-auto flex w-fit items-center justify-center py-2 text-sm font-medium text-[rgb(46,54,96)] hover:underline'
        >
          {data?.comments?.length} comments
        </button>
      </div>

      {showComment && (
        <>
          <FormComment data={data} className='mt-4' refetch={refetch} isFocusInput={isFocusInput} />
          <Comments data={data} />
        </>
      )}
    </div>
  )
}

export default Post
