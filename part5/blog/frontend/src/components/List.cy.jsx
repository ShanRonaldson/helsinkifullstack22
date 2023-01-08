import React from 'react'
import { List } from './List'

describe('<List /> with no data', () => {
  it('renders with no blogs', () => {
    const data= []
    // see: https://on.cypress.io/mounting-react
    cy.mount(<List blogs={data} />)
  })
})


describe('<List /> with data', () => {
  it('renders with test data', () => {

    const data =[{
      title: 'Cypress testing',
      author: 'Cypress',
      url: 'www.cypress.io',
      likes: ['cypress']
    }]
    // see: https://on.cypress.io/mounting-react
    cy.mount(<List blogs={data} />)
  })
})

