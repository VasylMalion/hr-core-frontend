import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL } from 'common/constants';
import { RootState } from 'store/store';

type GetAllJobsResponse = {
  _id: string
  department?: string
  position: string
  location: string
  description: string
  createdAt: string
  totalCandidates: number
}

type AddJobParams = {
  department: string
  position: string
  location: string
  description: string
}

type AddJobResponse = {}

export const JobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    }
  }),
  endpoints: (build) => ({
    getAllJobs: build.query<GetAllJobsResponse, {}>({
      query: () => ({
        url: '/jobs',
        method: 'GET',
      })
    }),
    addJob: build.mutation<AddJobResponse, AddJobParams>({
      query: (params) => ({
        url: '/jobs/add',
        method: 'POST',
        body: params,
      })
    }),
  })
})

export const { useGetAllJobsQuery, useAddJobMutation } = JobApi
