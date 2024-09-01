import Image from 'next/image'

import SpinIcon from '@/icons/spinner.svg'

const Loading = () => {
  return <Image src={SpinIcon} alt='spinner-icon' width={56} height={56} className='mx-auto my-16 object-contain' />
}

export default Loading
