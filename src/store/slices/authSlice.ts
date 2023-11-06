import { createSlice } from '@reduxjs/toolkit'

import { UserInfo } from 'common/types/common'
import {
  IS_COLLAPSED_SIDEBAR,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY
} from 'common/constants'

type State = {
  userInfo: UserInfo
  userToken: string
  isCollapsed: boolean
  success: boolean
  loading: boolean
  error: string
}

const initialState: State = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)),
  userToken: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  isCollapsed: JSON.parse(localStorage.getItem(IS_COLLAPSED_SIDEBAR)),
  error: '',
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userInfo } = action.payload
      state.userToken = token
      state.userInfo = userInfo
    },
    collapseNavbar: (state) => {
      localStorage.setItem(IS_COLLAPSED_SIDEBAR, String(!state.isCollapsed))
      state.isCollapsed = !state.isCollapsed
    },
    logOut: state => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
      state.userToken = null
    },
  },
})

export default authSlice

export const { setCredentials, logOut, collapseNavbar } = authSlice.actions
