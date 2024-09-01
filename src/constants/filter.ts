import { getLastWeek, getToday, getYesterday } from '@/utils/function'

export const options = [
  {
    label: 'Today',
    value: getToday(),
  },
  {
    label: 'Yesterday',
    value: getYesterday(),
  },
  {
    label: 'Last 7 days',
    value: getLastWeek(),
  },
]
