Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Joao',
    lastName: 'Silva',
    email: 'JSilva@email.com',
    phone: '11999997777',
    text: 'Texto preenchido pelo cypress'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})