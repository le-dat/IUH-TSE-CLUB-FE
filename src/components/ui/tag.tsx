import { IoClose } from 'react-icons/io5'

type Props = {
  label: string
  onRemove: () => void
}

const Tag = ({ label, onRemove }: Props) => {
  return (
    <div className='flex w-fit items-center justify-between rounded-lg border border-gray-300 bg-gray-200 px-4 py-1'>
      <span className='flex-shrink-0 text-sm font-semibold'>{label}</span>
      <button onClick={onRemove} className='ml-4'>
        <IoClose />
      </button>
    </div>
  )
}

export default Tag
