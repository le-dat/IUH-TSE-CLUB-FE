export const getToday = () => {
  return new Date().toISOString().split('T')[0]
}

export const getYesterday = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0]
}

export const getLastWeek = () => {
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)
  return lastWeek.toISOString().split('T')[0]
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
