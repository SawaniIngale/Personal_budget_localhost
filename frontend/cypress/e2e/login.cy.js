describe('Login Test', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000') 
  })

  it('greets with Login Here', () => {
      cy.contains('h2', 'Login Here')
  })

  it('requires email', () => {
      cy.get('form').contains('Log In').click()
      cy.get('.ui-1').should('contain', 'Email Id')
  })

  it('requires password', () => {
      cy.get('form').contains('Log In').click()
      cy.get('.ui-2').should('contain', 'Password')
  })

  it('requires valid email and password', () => {
      cy.get('[name=email]').type('si@gmail.com')
      cy.get('[name=password]').type('Si123457{enter}')
      cy.get('form').contains('Log In').click()
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Retry')
    })
  })

  it('navigates to /home on successful login', () => {
    
    cy.get('[name=email]').type('si@gmail.com');
    cy.get('[name=password]').type('Si123456{enter}');
    cy.get('form').contains('Log In').click()

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/home');
    
    
  });




})
