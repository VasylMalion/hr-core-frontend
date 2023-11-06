import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { BASE_URL } from 'common/constants'
import { getToken } from 'common/utils/common'

type ChangingPasswordParams = {
  passwordOld: string
  passwordNew: string
}

export const PasswordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,    
    prepareHeaders: (headers, { getState }) => getToken(headers, getState)
}),
  endpoints: (build) => ({
    updatePassword: build.mutation<{}, ChangingPasswordParams>({
      query: (params) => ({
        url: '/password',
        method: 'POST',
        body: params,
      })
    })
  })
})

export const { useUpdatePasswordMutation, util } = PasswordApi
