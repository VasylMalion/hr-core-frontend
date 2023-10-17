import { createSlice } from '@reduxjs/toolkit'
import { UserInfo } from 'common/types/common'

type State = {
  userInfo: UserInfo
  userToken: string
  success: boolean
  loading: boolean
  error: string
}

const initialState: State = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  userToken: localStorage.getItem('token'),
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
		logOut: state => {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      state.userToken = null;
		},
	},
})

export default authSlice

export const { setCredentials, logOut } = authSlice.actions;
