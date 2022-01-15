/* eslint-disable no-undef */
//This eslint error should not pop-up because I do have cypress libraries for eslint, but it still does, so I disabled it for all cypress files

describe('Month datapoints', function () {
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
        cy.get('#monthDataButton').click()
    })

    it('Page shows correct data 1', function() {
        cy.get('#month').type(2)
        cy.get('#year').type(2020)
        cy.get('#fetchMonth').click()

        cy.contains('2020-2-2-5000')
        cy.contains('2020-2-310014500')
        cy.contains('Average pH7')
        cy.contains('Maximum pH14')
        cy.contains('Minimum pH0')
        cy.contains('Average rainfall250')
        cy.contains('Maximum rainfall500')
        cy.contains('Minimum rainfall0')
        cy.contains('Sum of rainfall values500')
        cy.contains('Average temperature25')
        cy.contains('Maximum temperature100')
        cy.contains('Minimum temperature-50')
        cy.contains('Sum of all temperature values50')
    })

    it('Page shows correct data 2', function() {
        cy.get('#month').type(3)
        cy.get('#year').type(2020)
        cy.get('#fetchMonth').click()

        cy.contains('2020-3-310014500')
        cy.contains('Average pH14')
        cy.contains('Maximum pH14')
        cy.contains('Minimum pH14')
        cy.contains('Average rainfall500')
        cy.contains('Maximum rainfall500')
        cy.contains('Minimum rainfall500')
        cy.contains('Sum of rainfall values500')
        cy.contains('Average temperature100')
        cy.contains('Maximum temperature100')
        cy.contains('Minimum temperature100')
        cy.contains('Sum of all temperature values100')
    })
})