import { selectByTestId } from '../helpers/selectByTestId'

describe('Routing', () => {
  describe('Unauthorized user', () => {
    it('Login page', () => {
      cy.visit('/login')
      cy.get(selectByTestId('login-page')).should('exist')
    })
    it('Dashboard page', () => {
      cy.visit('/dashboard')
      cy.get(selectByTestId('login-page')).should('exist')
    })
    it('Unable path', () => {
      cy.visit('/wrong-path')
      cy.get(selectByTestId('login-page')).should('exist')
    })
  })

  describe('Authorized user (admin)', () => {
    beforeEach(() => {
      cy.login()
    })
    it('Profile page', () => {
      cy.visit('/profile')
      cy.get(selectByTestId('profile-page')).should('exist')
    })
    it('Vacancies page', () => {
      cy.visit('/vacancies')
      cy.get(selectByTestId('vacancies-page')).should('exist')
    })
    it('Unable path', () => {
      cy.visit('/wrong-path')
      cy.get(selectByTestId('dashboard-page')).should('exist')
    })
  })

  describe('Authorized user (employee)', () => {
    beforeEach(() => {
      cy.login('vasamalon2@gmail.com')
    })
    it('Profile page', () => {
      cy.visit('/profile')
      cy.get(selectByTestId('profile-page')).should('exist')
    })
    it('Vacancies page', () => {
      cy.visit('/vacancies')
      cy.get(selectByTestId('vacancies-page')).should('not.exist')
      cy.get(selectByTestId('dashboard-page')).should('exist')
    })
    it('Unable path', () => {
      cy.visit('/wrong-path')
      cy.get(selectByTestId('dashboard-page')).should('exist')
    })
  })
})
