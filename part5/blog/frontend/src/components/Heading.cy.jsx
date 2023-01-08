import React from 'react'
import { Heading } from './Heading'

describe('<Heading />', () => {
  const text = 'Cypress testing'
  it('renders with the text', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Heading message={text} />)
    cy.get('[data="heading-h1"]').should('have.text',text)
  })
})
