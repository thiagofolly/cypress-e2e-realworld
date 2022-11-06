/// <reference types="cypress" />

describe('Cadastro', () => {
    it('Cadastro com sucesso', () => {
        cy.fixture('cadastro-com-sucesso').then(function (data) {
            this.cadastro = data
            cy.intercept({
                //url      = https://api.realworld.io/api/users
                //hostname = https://api.realworld.io
                //path     = /api/users
                method: 'POST',
                path: '/api/users'
            }, {
                statusCode: 200,
                body: this.cadastro
            }).as('postUsers')

            cy.visit('register')

            cy.get('input[ng-model="$ctrl.formData.username"]').type(this.cadastro.user.username)
            cy.get('input[ng-model="$ctrl.formData.email"]').type(this.cadastro.user.email)
            cy.get('input[ng-model="$ctrl.formData.password"]').type('123456')

            cy.get('button[type="submit"]').click()

            cy.get(`a[href="#/@${this.cadastro.user.username}"]`).should('be.visible')
        })
    });
    it('Cadastro com usuário já existente', () => {
        cy.intercept({
            method: 'POST',
            path: '/api/users'
        }, {
            statusCode: 422,
            fixture: 'cadastro-usuario-existente'
        }).as('postUsers')

        cy.visit('register')
        cy.get('input[ng-model="$ctrl.formData.username"]').type('Thiago')
        cy.get('input[ng-model="$ctrl.formData.email"]').type('thiago@email.com')
        cy.get('input[ng-model="$ctrl.formData.password"]').type('123456')

        cy.get('button[type="submit"]').click()

        cy.contains('username has already been taken').should('be.visible')
    });
    
    it('Cadastro com email já existente', () => {
        cy.intercept({
            method: 'POST',
            path: '/api/users'
        }, {
            statusCode: 422,
            fixture: 'cadastro-email-existente'
        }).as('postUsers')

        cy.visit('register')
        cy.get('input[ng-model="$ctrl.formData.username"]').type('Thiago')
        cy.get('input[ng-model="$ctrl.formData.email"]').type('thiago@email.com')
        cy.get('input[ng-model="$ctrl.formData.password"]').type('123456')

        cy.get('button[type="submit"]').click()

        cy.contains('email has already been taken').should('be.visible')
    });
});