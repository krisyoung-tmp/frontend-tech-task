describe('Task List', () => {
    beforeEach(() => {
        cy.server({ urlMatchingOptions: { matchBase: false } })
        cy.request('POST', 'http://localhost:9001/reset')
        cy.login()
        cy.visit('http://localhost:3000/tasks')
        cy.route('GET', 'http://localhost:9001/tasks').as('getTasks')
        cy.wait('@getTasks')
    })

    it('should show all tasks', () => {
        cy.getByTestId('tasklist.footer').should(
            'have.text',
            'Showing 2000 of 2000 tasks'
        )
    })

    it('should filter tasks by status', () => {
        cy.getByTestId('filters.trigger').click()
        cy.getByTestId('filters.status').select('IN_PROGRESS')
        cy.getByTestId('tasklist.footer').should(
            'have.text',
            'Showing 523 of 2000 tasks'
        )
    })

    it('should filter by assignment', () => {
        cy.getByTestId('filters.trigger').click()
        cy.wait(200)
        cy.getAllByTestId('filters.relationship')
            .filter('[value="ASSIGNEE"]')
            .check()
        cy.getByTestId('tasklist.footer').should(
            'have.text',
            'Showing 646 of 2000 tasks'
        )
    })

    it('should filter by search query', () => {
        cy.getByTestId('filters.query').type('chicken')
        cy.wait(300)
        cy.getByTestId('tasklist.footer').should(
            'have.text',
            'Showing 400 of 2000 tasks'
        )
    })

    it('should sort', () => {
        cy.getByTestId('filters.trigger').click()
        cy.wait(200)
        cy.getAllByTestId('sort')
            .filter('[value="due_date"]')
            .check()
        cy.getAllByTestId('tasklist.item')
            .first()
            .find('h1')
            .should('contain.text', 'Is she dead, yes or no?')

        cy.getByTestId('filters.trigger').click()
        cy.wait(200)
        cy.getAllByTestId('sort')
            .filter('[value="created_date"]')
            .check()
        cy.getAllByTestId('tasklist.item')
            .first()
            .find('h1')
            .should('contain.text', 'Are you ready for the truth?')
    })
})
