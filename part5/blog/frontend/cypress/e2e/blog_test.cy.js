const user = {
  name: 'admin',
  username: 'admin',
  password: 'salainen'
}

const user2 = {
  name: 'super',
  username: 'super',
  password: 'admin'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/resetAll')

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function() {
    cy.contains('Blog site login')
    cy.get('[data="username-input"]')
    cy.get('[data="password-input"]')
  })

  it('Allows login', function(){
    cy.get('[data="username-input"]').type('admin')
    cy.get('[data="password-input"]').type('salainen')
    cy.get('[data="login-button"]').click()
  })

  it('login fails with wrong password', function() {
    cy.get('[data="username-input"]').type('admin')
    cy.get('[data="password-input"]').type('admin')
    cy.get('[data="login-button"]').click()

    cy.contains('Incorrect password or username')
  })

})


describe('User is logged in', function(){
  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.get('[data="username-input"]').type('admin')
    cy.get('[data="password-input"]').type('salainen')
    cy.get('[data="login-button"]').click()
  })

  it('Shows the blog site as a logged in user & no blogs', function() {
    cy.get('[data="heading-h1"]').should('have.text', `Welcome ${user.name} !`)
    cy.get('[data="logout-button"]')

    cy.get('[data="add-new-blog-button"]')

    cy.get('[data="blog-heading-h2"]').should('have.text', 'Blog List')
    cy.get('[data="table-heading-row"] > th').should(($headingRow) => {
      expect($headingRow).to.have.length(4)
    })
  })

  it('New blog can be created', function() {
    cy.get('[data="add-new-blog-button"]').click()
    cy.get('[data="title-input"]').type('Cypress testing')
    cy.get('[data="author-input"]').type('Cypress tests')
    cy.get('[data="url-input"]').type('www.cypress.io')
    cy.get('[data="submit-new-blog-button"]').click()
  })

  describe('After a new blog is added', function(){
    it('blog is in the list', function(){
      cy.get('[data="list-table"]').contains('Cypress testing')
    })

    it('cannot like your own blog', function(){
      cy.get('[data="like-button"]').click()
      cy.contains('You\'ve already liked \'Cypress testing\'!')
    })

    it('can delete your own blog', function(){
      cy.get('[data="delete-button"]').click()
      cy.get('[data="list-table"]').should('not.have.text','Cypress testing')
    })
  })

  it('user can logout', function(){
    cy.get('[data="logout-button"]').click()
    cy.contains('Blog site login')
    cy.get('[data="username-input"]')
    cy.get('[data="password-input"]')
  })
})

describe('Different user logs in & likes blog added by admin', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/resetAll')
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
    cy.get('[data="username-input"]').type('admin')
    cy.get('[data="password-input"]').type('salainen')
    cy.get('[data="login-button"]').click()

    cy.get('[data="add-new-blog-button"]').click()
    cy.get('[data="title-input"]').type('Cypress testing')
    cy.get('[data="author-input"]').type('Cypress tests')
    cy.get('[data="url-input"]').type('www.cypress.io')
    cy.get('[data="submit-new-blog-button"]').click()

    cy.get('[data="add-new-blog-button"]').click()
    cy.get('[data="title-input"]').type('Test blog 2')
    cy.get('[data="author-input"]').type('Cypress tests')
    cy.get('[data="url-input"]').type('www.cypress.io')
    cy.get('[data="submit-new-blog-button"]').click()

    cy.get('[data="add-new-blog-button"]').click()
    cy.get('[data="title-input"]').type('Blog test 3')
    cy.get('[data="author-input"]').type('Cypress tests')
    cy.get('[data="url-input"]').type('www.cypress.io')
    cy.get('[data="submit-new-blog-button"]').click()

    cy.get('[data="logout-button"]').click()

    cy.request('POST', 'http://localhost:3003/api/users/', user2)
  })

  it('Second user can login', function(){
    cy.contains('Blog site login')
    cy.get('[data="username-input"]').type('super')
    cy.get('[data="password-input"]').type('admin')
    cy.get('[data="login-button"]').click()
  })

  describe('second user has logged in', function(){
    beforeEach(function(){
      cy.get('[data="username-input"]').type('super')
      cy.get('[data="password-input"]').type('admin')
      cy.get('[data="login-button"]').click()
    })

    it('shows the 3 blogs the admin added', function(){
      cy.get('[data="table-body"] > tr').should(($row) => {
        expect($row.eq(0)).to.contain('Cypress testing')
      })
    })

    it('can like a blog', function (){
      cy.get('[data="like-button"]').first().click()
      cy.get('[data="table-body"] > tr').should(($row) => {
        expect($row.eq(0)).to.contain('2')
      })
    })

    it('lists the blogs in descending order', function(){
      cy.get('[data="like-button"]').last().click()
      cy.get('[data="table-body"] > tr').should(($row) => {
        expect($row.eq(0)).to.contain('Blog test 3')
      })
    })
  })

})
