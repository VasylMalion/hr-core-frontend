import { RootState } from 'store/store'

export const formatDate = (date: Date): string => {
  const local = new Date(date)
  const day = local.getDate()
  const month = local.getMonth() + 1
  const year = local.getFullYear()

  return (
    (day <= 9 ? '0' + day : day) + '-' +
    (month <= 9 ? '0' + month : month) + '-' +
    year
  )
}

export const errorHandler = (error: any) => {
  if ('data' in error) return error.data
}

export const getToken = (headers: Headers, getState: () => unknown) => {
  const token = (getState() as RootState).auth.userToken

  if (token) headers.set('authorization', `Bearer ${token}`)

  return headers
}
