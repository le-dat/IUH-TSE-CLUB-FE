export const color = Object.freeze({
  pending: 'bg-yellow-100',
  approved: 'bg-teal-100',
  borrow: 'bg-yellow-500',
  register: 'bg-cyan-100',
  hover: 'bg-gray-100',
  default: 'bg-white',
})

export const config = Object.freeze({
  pending: {
    bg: color.pending,
    text: 'Pending Approval',
    color: 'text-yellow-500',
  },
  approved: {
    bg: color.approved,
    text: 'Approved',
    color: 'text-green-500',
  },
  borrow: {
    bg: color.borrow,
    text: 'Borrowed',
    color: 'text-brown-700',
  },
  register: {
    bg: color.register,
    text: 'Registered',
    color: 'text-blue-700',
  },
})
