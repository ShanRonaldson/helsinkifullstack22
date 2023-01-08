import React from 'react'
import { Row } from './Row'

const data ={
  title: 'Cypress testing',
  author: 'Cypress',
  url: 'www.cypress.io',
  likes: ['cypress']
}
describe('<Row />', () => {
  it('renders with test data and not logged in', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Row id={1} blog={data} />)
    cy.get('[data="row-1"] > td').should(($tableRow) => {
      expect($tableRow).to.have.length(4)
      expect($tableRow.eq(0)).to.contain(data.title)
      expect($tableRow.eq(1)).to.contain(data.author)
      expect($tableRow.eq(2)).to.contain(data.url)
      expect($tableRow.eq(3)).to.contain(1)
    })
  })

  it('renders with test data and logged in', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Row id={1} blog={data} loggedInState={true}/>)
    cy.get('[data="row-1"] > td').should(($tableRow) => {
      expect($tableRow).to.have.length(7)
      expect($tableRow.eq(0)).to.contain(data.title)
      expect($tableRow.eq(1)).to.contain(data.author)
      expect($tableRow.eq(2)).to.contain(data.url)
      expect($tableRow.eq(3)).to.contain(1)
    })
  })


  it('Like can be clicked', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Row id={1} blog={data} loggedInState={true}/>)
    cy.get('[data="row-1"] > td').should(($tableRow) => {
      $tableRow.click()
    })
  })

})
