describe('Create Sub-Task', () => {
	beforeEach(() => {
		cy.visit('/dashboard')
	})

	it('should display create a sub-task button on task card', () => {
		cy.get('[data-testid=task-card]').should('exist')
		cy.get('[data-testid=create-subtask-button]').should('exist')
	})

	it('should open subtask creation dialog', () => {
		cy.get('[data-testid="task-card"]')
			.find('[data-testid="create-subtask-button"]')
			.click()

		cy.get('[data-testid="create-subtask-dialog"]').should('be.visible')
	})

	it('should create a new subtask successfully', () => {
		const subtaskTitle = `Test Subtask ${Date.now()}`

		cy.get('[data-testid="create-subtask-button"]').click()

		cy.get('[data-testid="subtask-title-input"]')
			.type(subtaskTitle)
			.should('have.value', subtaskTitle)

		cy.get('[data-testid="submit-subtask-button"]').click()

		cy.contains('Subtask added successfully').should('be.visible')
	})

	it('should show error when title is empty', () => {
		cy.get('[data-testid="create-subtask-button"]').click()
		cy.get('[data-testid="submit-subtask-button"]').click()

		cy.contains('Subtask title cannot be empty').should('be.visible')
	})

	it('should create multiple subtasks', () => {
		const subtasks = ['First Task', 'Second Task', 'Third Task']

		subtasks.forEach(title => {
			cy.get('[data-testid="create-subtask-button"]').click()
			cy.get('[data-testid="subtask-title-input"]').type(title)
			cy.get('[data-testid="submit-subtask-button"]').click()
			cy.contains('Subtask added successfully').should('be.visible')
			cy.wait(500)
		})

		subtasks.forEach(title => {
			cy.contains(title).should('be.visible')
		})
	})
})
