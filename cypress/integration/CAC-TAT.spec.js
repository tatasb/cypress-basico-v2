// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    //it.only('preenche os campos obrigatórios e envia', function (){
    it('preenche os campos obrigatórios e envia', function (){
        const longText = 'texto muito longo leva muito tempo pra escrever, mesmo na automação, então vamos usar o delay pra poder otimizar o tempo e não demorar nada! assim o teste vai mais rápido.'
        cy.get('#firstName').type('Tamiris', {delay:100})
        cy.get('#lastName').type('Fernandes')
        cy.get('#email').type('email@hh.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Tamiris')
        cy.get('#lastName').type('Fernandes')
        cy.get('#email').type('email')
        cy.get('#open-text-area').type('bla bla bla')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('campo de telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone').type('abcd')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Tamiris')
        cy.get('#lastName').type('Fernandes')
        cy.get('#email').type('email@hh.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('bla bla bla')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Tamiris')
            .should('have.value', 'Tamiris')
            .clear().should('have.value', '')
        cy.get('#lastName').type('Fernandes')
            .should('have.value', 'Fernandes')
            .clear().should('have.value', '')
        cy.get('#email').type('email@hh.com')
            .should('have.value', 'email@hh.com')
            .clear().should('have.value', '')
        cy.get('#phone').type('12345678')
            .should('have.value', '12345678')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function (){
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function (){
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function (){
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function (){
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function (){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último ', function () {
        cy.get('input[type="checkbox"]').check()
            .last().uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures ', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop ', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function ($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias ', function () {
        //fixture é o caminho do arquivo, 'as' é o alias que tô usando
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique ', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        //é funcionamento padrão de qlqr navegador, que se ele tiver o atributo target = _blank, esse link será aberto em outra guia
        //OBS: Cypress nao sabe lidar qdo algo abre em uma nova aba
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link ', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible')
    });

})
