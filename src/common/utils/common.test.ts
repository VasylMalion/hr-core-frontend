import { errorHandler, formatDate, getUniqueId } from './common'

describe('formatDate', () => {
  it('Test correct value', () => {
    expect(formatDate(new Date('Thu Nov 02 2023 17:22:50 GMT+0200'))).toBe(
      '2023-11-02'
    )
  })
})

describe('errorHandler', () => {
  it('Test correct value', () => {
    expect(
      errorHandler({
        data: 'INVALID_BODY',
        status: 400,
      })
    ).toBe('INVALID_BODY')
  })
})

describe('getUniqueId', () => {
  it('with params', () => {
    expect(getUniqueId('button')).toMatch(`button-`)
  })
  it('without params', () => {
    expect(getUniqueId()).toMatch(`id-`)
  })
})
