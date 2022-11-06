/// <reference types="cypress" />

describe('Articles', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    });
    it.only('Cadastro de novo artigo com sucesso', () => {
        const articleName = 'Artigo de testes ' + new Date().getTime()
        cy.get('a[href*=editor]').click()
        cy.get('input[ng-model$=title]').type(articleName)
        cy.get('input[ng-model$=description]').type('Descrição do artigo de testes')
        cy.get('textarea[ng-model$=body]').type('Corpo do texto do artigo que está sendo criado')
        cy.get('input[ng-model$=tagField]').type('cypress')
        cy.get('button[ng-click$="submit()"]').click()
        cy.get('h1').should('have.text', articleName)
    });
});