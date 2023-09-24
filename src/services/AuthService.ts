import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL } from 'common/constants';
import { UserInfo } from 'common/types/common';

type LoginParams = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string
  userInfo: UserInfo
}

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginParams>({
      query: (params) => ({
        url: '/login',
        method: 'POST',
        body: params,
      })
    })
  })
})

export const { useLoginMutation } = AuthApi