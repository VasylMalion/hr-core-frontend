import { selectByTestId } from '../helpers/selectByTestId'

describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Renders input fields and login button', () => {
    cy.get('input[placeholder="Email"]').should('exist')
    cy.get('input[placeholder="Password"]').should('exist')
    cy.get(selectByTestId('login-btn')).should('exist')
  })

  it('Allows input and submission', () => {
    const email = 'vasamalon@gmail.com'
    const password = '12345678q'

    cy.get('input[placeholder="Email"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)

    cy.get(selectByTestId('login-btn')).click()

    cy.url().should('include', '/dashboard')
  })
})
