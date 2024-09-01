import { getLastWeek, getToday, getYesterday } from '@/utils/function'

describe('getToday', () => {
  it("should return today's date in YYYY-MM-DD format", () => {
    const today = new Date().toISOString().split('T')[0]
    expect(getToday()).toBe(today)
  })
})

describe('getYesterday', () => {
  it("should return yesterday's date in YYYY-MM-DD format", () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const expectedDate = yesterday.toISOString().split('T')[0]
    expect(getYesterday()).toBe(expectedDate)
  })
})

describe('getLastWeek', () => {
  it('should return the date of last week in YYYY-MM-DD format', () => {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)
    const expectedDate = lastWeek.toISOString().split('T')[0]
    expect(getLastWeek()).toBe(expectedDate)
  })
})
