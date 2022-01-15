//This eslint error should not pop-up because I do have cypress libraries for eslint, but it still does, so I disabled it for all cypress files
/* eslint-disable no-undef */
describe('Login', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login fails missing credintials', function() {
        cy.get('#submit').click()
        cy.contains('Failed to log in')
    })

    it('Login fails with incorrect credintials', function() {
        cy.get('#username').type('incorrect')
        cy.get('#password').type('incorrect')
        cy.get('#submit').click()
        cy.contains('Failed to log in')
    })

    it('Login succeeds with correct credintials', function() {
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#submit').click()
        cy.contains('Year')
    })
})