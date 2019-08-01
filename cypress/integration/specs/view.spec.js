describe('View Task', () => {
    beforeEach(() => {
        cy.server({ urlMatchingOptions: { matchBase: false } })
        cy.seed()
        cy.login()
        cy.visit('http://localhost:3000/tasks')
        cy.route('GET', 'http://localhost:9001/tasks').as('getTasks')
        cy.wait('@getTasks')
    })

    it('should show a task when selected', () => {
        cy.getAllByTestId('tasklist.item')
            .first()
            .find('a')
            .click()

        cy.getByTestId('viewTask').should('exist')
    })

    it('should not allow editing of tasks that arent owned by the current user', () => {
        cy.getByTestId('filters.query').type('i can do that')
        cy.wait(300)
        cy.getAllByTestId('tasklist.item')
            .eq(2)
            .find('a')
            .click()

        cy.getByTestId('showEdit').should('be.disabled')
    })
    it('should allow editing of tasks that are owned by the current user', () => {
        cy.getByTestId('filters.trigger').click()
        cy.wait(200)

        cy.getAllByTestId('filters.relationship')
            .filter('[value="AUTHOR"]')
            .check()

        cy.getAllByTestId('tasklist.item')
            .first()
            .find('a')
            .click()

        cy.getByTestId('showEdit')
            .should('not.be.disabled')
            .click()

        cy.getByTestId('editTask').should('exist')
    })
})
