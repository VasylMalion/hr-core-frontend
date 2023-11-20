import {
  BASE_URL,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from 'common/constants'

export const login = (
  email: string = 'vasamalon@gmail.com',
  password: string = '12345678q'
) => {
  cy.request({
    method: 'POST',
    url: `${BASE_URL}/login`,
    body: {
      email,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(
      LOCAL_STORAGE_TOKEN_KEY,
      JSON.stringify(body.token)
    )
    window.localStorage.setItem(
      LOCAL_STORAGE_USER_KEY,
      JSON.stringify(body.userInfo)
    )
  })
}
