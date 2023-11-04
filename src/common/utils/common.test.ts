import { formatDate } from './common'

describe('formatDate', () => {
  test('test', () => {
    expect(formatDate(new Date('Thu Nov 02 2023 17:22:50 GMT+0200'))).toBe('02-11-2023')
  })
  test('test', () => {
    expect(formatDate(new Date('sadasdas'))).toBe('02-11-2023')
  })
})