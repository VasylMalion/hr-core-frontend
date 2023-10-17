import { createSlice } from '@reduxjs/toolkit'
import { IS_COLLAPSED_SIDEBAR } from 'common/constants'
import { UserInfo } from 'common/types/common'

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
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  userToken: localStorage.getItem('token'),
  isCollapsed: JSON.parse(localStorage.getItem(IS_COLLAPSED_SIDEBAR)),
  error: '',
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
		setCredentials: (state, action) => {
			const { token, userInfo } = action.payload;
			state.userToken = token;
      state.userInfo = userInfo;
		},
    collapseNavbar: (state) => {
      localStorage.setItem(IS_COLLAPSED_SIDEBAR, String(!state.isCollapsed))
      state.isCollapsed = !state.isCollapsed
    },
		logOut: state => {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      state.userToken = null;
		},
	},
})

export default authSlice

export const { setCredentials, logOut, collapseNavbar } = authSlice.actions;
