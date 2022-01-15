/* eslint-disable no-undef */
//This eslint error should not pop-up because I do have cypress libraries for eslint, but it still does, so I disabled it for all cypress files

describe('Metric datapoints', function() {
    before(function() {
        // This just adds three datapoints with the ui before the tests. This could be done with usual post requests as well
        // but the point is also to test the overall functionality of the application. 
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        cy.visit('http://localhost:3000')
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#submit').click()

        cy.get('#addDataButton').click()
        cy.get('#date').type('2020-02-02')
        cy.get('#temperature').type(-50)
        cy.get('#rainfall').type(0)
        cy.get('#pH').type(0)
        cy.get('#submitData').click()

        cy.get('#date').type('2020-02-03')
        cy.get('#temperature').type(100)
        cy.get('#rainfall').type(500)
        cy.get('#pH').type(14)
        cy.get('#submitData').click()

        cy.get('#date').type('2020-03-03')
        cy.get('#temperature').type(100)
        cy.get('#rainfall').type(500)
        cy.get('#pH').type(14)
        cy.get('#submitData').click()

        //Exit the modal
        cy.get('body').click(0,0)

        //Ensure correct page is open
        cy.get('#metricDataButton').click()
    })

    it('Temperature shows correct datapoints', function() {
        cy.get('#temperatureRadio').click()
        cy.get('#metricFetch').click()
        cy.contains('2020-2-2-50')
        cy.contains('2020-2-3100')
        cy.contains('2020-3-3100')
    })

    it('pH shows correct datapoints', function() {
        cy.get('#pHRadio').click()
        cy.get('#metricFetch').click()
        cy.contains('2020-2-20')
        cy.contains('2020-2-314')
        cy.contains('2020-3-314')
    })

    it('rainfall shows correct datapoints', function() {
        cy.get('#rainfallRadio').click()
        cy.get('#metricFetch').click()
        cy.contains('2020-2-20')
        cy.contains('2020-2-3500')
        cy.contains('2020-3-3500')
    })
})