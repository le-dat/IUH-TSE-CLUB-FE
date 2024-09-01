/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import Image from 'next/image'

import React, { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import SendIcon from '@/icons/post/send.svg'
import DefaultAvatar from '@/images/default-avatar.png'
import postService from '@/service/post.service'
import { usePostStore } from '@/store/post.store'
import { IPost } from '@/types/post.type'

interface FormCommentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  data: IPost
  className?: string
  isFocusInput?: boolean
  refetch?: () => void
}

const FormComment: React.FC<FormCommentProps> = ({ data, refetch, isFocusInput, className, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [comment, setComment] = React.useState<string>('')
  const { addComment } = usePostStore()
  const { mutateAsync, isPending } = useMutation({ mutationFn: postService.addComment })
  const disabled = !comment || isPending

  const onClick = async () => {
    if (disabled) return
    mutateAsync({ postId: data._id, comment: { user_id: data.user_id, content: comment } })
      .then(() => {
        addComment(data._id, { user_id: data.user_id, content: comment })
        refetch && refetch()
        setComment('')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  useEffect(() => {
    if (isFocusInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocusInput])

  return (
    <div className={`relative flex w-full items-center gap-4 ${className}`}>
      <Image src={DefaultAvatar} alt='avatar' width={40} height={40} className='rounded-full shadow-sm' />

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        className='text-4 w-full rounded-lg border px-3 py-2 leading-6 text-[rgb(46,54,96)] outline-none focus:ring-1 focus:ring-primary'
        placeholder='Write your comment'
        {...props}
      />
      <button
        disabled={disabled}
        onClick={onClick}
        className='absolute right-2 top-1/2 -translate-y-1/2 transform p-3 disabled:opacity-50'
      >
        <Image src={SendIcon} alt='send-icon' width={20} height={20} />
      </button>
    </div>
  )
}

export default FormComment
