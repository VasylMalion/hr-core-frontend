import authSlice, {
  setCredentials,
  logOut,
  collapseNavbar,
  State,
} from './authSlice'

describe('authSlice reducers', () => {
  let initialState: State

  beforeEach(() => {
    initialState = {
      loading: false,
      success: false,
      error: '',
      userInfo: null,
      userToken: null,
      isCollapsed: false,
    }
  })

  it('Should handle setCredentials', () => {
    const action = setCredentials({
      token: 'exampleToken',
      userInfo: { id: 1, username: 'exampleUser' },
    })
    const newState = authSlice.reducer(initialState, action)

    expect(newState.userToken).toEqual('exampleToken')
    expect(newState.userInfo).toEqual({ id: 1, username: 'exampleUser' })
  })

  it('Should handle collapseNavbar', () => {
    const action = collapseNavbar()
    const stateWithCollapsedFalse = { ...initialState, isCollapsed: false }
    const newState = authSlice.reducer(stateWithCollapsedFalse, action)

    expect(newState.isCollapsed).toEqual(true)
  })

  it('Should handle logOut', () => {
    const stateWithToken = { ...initialState, userToken: 'exampleToken' }
    const action = logOut()
    const newState = authSlice.reducer(stateWithToken, action)

    expect(newState.userToken).toBeNull()
  })
})
