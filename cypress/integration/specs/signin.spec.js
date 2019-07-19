describe('Sign In', () => {
    before(() => {
        cy.request('POST', 'http://localhost:9001/reset')
        cy.visit('http://localhost:9000')
    })

    it('should contain a sign in form', () => {})

    it('should redirect to tasks when a user signs in successfully', () => {
        cy.server({ urlMatchingOptions: { matchBase: false } })
        cy.route('POST', 'http://localhost:9001/auth/session').as('signin')
        cy.getByTestId('signin.username').type('standarduser1')
        cy.getByTestId('signin.submit').click()
        cy.wait('@signin')
        cy.url().should('include', '/tasks')
    })
})
