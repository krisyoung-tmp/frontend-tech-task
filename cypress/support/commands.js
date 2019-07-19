import '@testing-library/cypress/add-commands'

Cypress.Commands.add('seed', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:9001/reset',
    })
})

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:9001/auth/session',
        body: {
            username: 'standarduser1',
        },
    }).then((res) => {
        window.localStorage.setItem('auth_token', res.body.username)
    })
})
