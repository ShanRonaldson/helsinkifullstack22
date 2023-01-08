import React from 'react'
import { Input } from './Input'


const data ={
  title: 'Cypress testing',
  author: 'Cypress',
  url: 'www.cypress.io',
  likes: ['cypress']
}

describe('<Input />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Input />)

    cy.get('[data="title-input"]')
    cy.get('[data="author-input"]')
    cy.get('[data="url-input"]')
  })

  it('can type in test data', () => {
    // see: https://on.cypress.io/mounting-react
    const onChangeSpy = cy.spy().as('onChangeSpy')
    const setMessage = cy.spy().as('setMessage')

    cy.mount(<Input handleAdd={onChangeSpy} setMessage={setMessage}/>)
    cy.get('[data="title-input"]').type(data.title)
    cy.get('[data="author-input"]').type(data.author)
    cy.get('[data="url-input"]').type(data.url)
    cy.get('[data="submit-new-blog-button"]').click()
    cy.get('@onChangeSpy').should('have.been.calledWith', data)
  })
})
