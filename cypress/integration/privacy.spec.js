Cypress._.times(5, function () {
//esse comando me ajuda a validar, por exemplo, que um teste é estavel, pois passa as 5 vezes que executa!!

    it('testa a página da política de privacidade de forma independente ', function () {
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible')
    });

})