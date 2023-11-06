import { v4 as uniqueId } from 'uuid'

import { RootState } from 'store/store'

export const formatDate = (date: Date, separator: string = '-'): string => {
  const local = new Date(date)
  const day = local.getDate()
  const month = local.getMonth() + 1
  const year = local.getFullYear()

  return (
    year + separator +
    (month <= 9 ? '0' + month : month) + separator +
    (day <= 9 ? '0' + day : day)
  )
}

export const errorHandler = (error: any) => {
  if (!error) return ''
  if ('data' in error) return error.data
}

export const getToken = (headers: Headers, getState: () => unknown) => {
  const token = (getState() as RootState).auth.userToken

  if (token) headers.set('authorization', `Bearer ${token}`)

  return headers
}

export const getUniqueId = (prefix = 'id') => `${prefix}-${uniqueId()}`
