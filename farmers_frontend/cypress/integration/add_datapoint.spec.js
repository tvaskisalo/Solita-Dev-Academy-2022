/* eslint-disable no-undef */
describe('Add a datapoint', function() {
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        cy.visit('http://localhost:3000')
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#submit').click()
    })

    it('New datapoint form opens properly', function() {
        cy.get('#addDataButton').click()
        cy.contains('Date')
        cy.contains('Temperature')
        cy.contains('Rainfall')
    })

    it('Missing date gives an error', function() {
        cy.get('#addDataButton').click()
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })

    it('Incorrect date gives an error', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('Incorrect')
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })
    
    it('Correct data gives a notification 1', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#temperature').type(100)
        cy.get('#rainfall').type(500)
        cy.get('#pH').type(14)
        cy.get('#submitData').click()
        cy.contains('Added a new datapoint!')
    })

    it('Correct data gives a notification 2', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#temperature').type(-50)
        cy.get('#rainfall').type(0)
        cy.get('#pH').type(0)
        cy.get('#submitData').click()
        cy.contains('Added a new datapoint!')
    })

    it('Incorrect temperature gives an error 1', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#temperature').type(101)
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })

    it('Incorrect temperature gives an error 2', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#temperature').type(-51)
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })

    it('Incorrect rainfall gives an error 1', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#rainfall').type(501)
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })

    it('Incorrect rainfall gives an error 2', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#rainfall').type(-1)
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })
    it('Incorrect pH gives an error 1', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#pH').type(15)
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })
    it('Incorrect pH gives an error 2', function() {
        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#pH').type(-1)
        cy.get('#submitData').click()
        cy.contains('Failed to add a new datapoint')
    })
})