describe('Create Task', () => {
    beforeEach(() => {
        cy.server({ urlMatchingOptions: { matchBase: false } })
        cy.seed()
        cy.login()
        cy.visit('http://localhost:9000/tasks')
        cy.getByTestId('showCreate').click()
    })

    it('should create a task', () => {
        cy.server({ urlMatchingOptions: { matchBase: false } })
        cy.route('POST', 'http://localhost:9001/tasks').as('createTask')
        cy.getByTestId('createTask').should('exist')
        cy.getByTestId('task.submit').should('be.disabled')
        cy.get('[name="task.title"]').type('New Task')
        cy.get('[name="task.description"]').type('New task description')
        cy.get('[name="task.assignee"]').select('standarduser2')
        cy.get('[name="task.due_date"]').type('2020-01-01')
        cy.getByTestId('task.submit')
            .should('not.be.disabled')
            .click()
        cy.wait('@createTask')
        cy.getAllByTestId('tasklist.item')
            .first()
            .find('h1')
            .should('contain.text', 'New Task')
        cy.getByTestId('tasklist.footer').should(
            'have.text',
            'Showing 2001 of 2001 tasks'
        )
    })
})
