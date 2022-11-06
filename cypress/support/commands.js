// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.token().then(response => {
        console.log(response.body.user.token)
        // JSON Patch -> navegação através de um json (Objeto javascript)
        window.localStorage.setItem('jwtToken', response.body.user.token)
    })
})

Cypress.Commands.add('token', () => {
    cy.request({
        url: 'https://api.realworld.io/api/users/login',
        method: 'POST',
        body: {
            "user": {
                "email": "thiago@mail.com",
                "password": "123456"
            }
        }
    })
})