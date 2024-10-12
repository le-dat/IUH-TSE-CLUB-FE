/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { GrDown } from 'react-icons/gr'

import { FILTER_TAG_USER, GROUP_TAG_USER } from '@/constants/filter'
import useClickOutside from '@/hooks/use-click-outside'

import Label from './ui/label'
import Tag from './ui/tag'

interface Props {
  value: string
  onChange: (value: string) => void
  onTagSelect: (tags: string[]) => void
}

const Filter = ({ value, onChange, onTagSelect }: Props) => {
  const [tags, setTags] = useState<string[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useClickOutside(boxRef, () => setIsPopupOpen(false))

  const handleTagSelect = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag))
    } else {
      setTags([...tags, tag])
    }
    onTagSelect(tags)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newTag = e.currentTarget.value.trim()
      if (newTag) {
        setTags([...tags, newTag])
        e.currentTarget.value = ''
        onTagSelect(tags)
      }
    }
  }

  return (
    <div ref={boxRef} className='relative flex flex-grow'>
      <div className='flex flex-1 items-center rounded-lg border border-gray-800'>
        <Label htmlFor='search' className='px-3 text-gray-400'>
          <FiSearch />
        </Label>
        <div className={`flex flex-1 flex-wrap items-center gap-1 py-2`}>
          {tags.map((tag) => (
            <Tag key={tag} label={tag} onRemove={() => handleTagSelect(tag)} />
          ))}
          <input
            id='search'
            name='search'
            placeholder='Search name...'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className='h-full flex-1 bg-transparent px-2 focus:outline-none'
          />
        </div>

        <button
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className={`p-3 transition ${isPopupOpen ? 'rotate-180' : ''}`}
        >
          <GrDown />
        </button>
      </div>
      {isPopupOpen && (
        <div className='absolute top-full z-10 mt-1 grid w-full grid-cols-2 gap-2 rounded-lg border bg-white p-4 shadow'>
          <div>
            Filter by
            {FILTER_TAG_USER.map((tag) => (
              <button
                key={tag.value}
                onClick={() => handleTagSelect(tag.value)}
                className={`flex w-full items-center gap-4 rounded-lg px-3 py-2 hover:bg-gray-200 ${tags.includes(tag.value) ? 'bg-gray-200' : ''}`}
              >
                {tag.label}
              </button>
            ))}
          </div>
          <div>
            Group by
            {GROUP_TAG_USER.map((tag) => (
              <button
                key={tag.value}
                onClick={() => handleTagSelect(tag.value)}
                className={`flex w-full items-center gap-4 rounded-lg px-3 py-2 hover:bg-gray-200 ${tags.includes(tag.value) ? 'bg-gray-200' : ''}`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
