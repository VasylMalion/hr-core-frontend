import React from 'react'
import Candidates from './Candidates'

describe('<Candidates />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Candidates />)
  })
})