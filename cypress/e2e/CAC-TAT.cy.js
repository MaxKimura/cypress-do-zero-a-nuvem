describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche campos obrigatórios e preenche e envia form', () => {
    cy.clock()
    cy.get('#firstName').type('Maxwell')
    cy.get('#lastName').type('Kimura')
    cy.get('#email').type('max@email.com')
    cy.get('#phone').type('18999998888')
    cy.get('#open-text-area').type('Formulário preenchido pelo framework cypress')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })
  
  it('Exibe msg de erro ao submeter form com email sem formatação', () => {
    cy.get('#firstName').type('Maxwell')
    cy.get('#lastName').type('Kimura')
    cy.get('#email').type('maxemail.com')
    cy.get('#phone').type('18999998888')
    cy.get('#open-text-area').type('Formulário preenchido pelo framework cypress')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido valor nao-numerico', () => {
    cy.get('#phone')
      .type('ABCDE')
      .should('have.value', '')
  })

  it('exibe msg de erro qdo o tel se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Maxwell')
    cy.get('#lastName').type('Kimura')
    cy.get('#email').type('max@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Formulário preenchido pelo framework cypress')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Maxwell').should('have.value', 'Maxwell')
      .clear().should('have.value', '')

    cy.get('#lastName').type('Kimura').should('have.value', 'Kimura')
      .clear().should('have.value', '')

    cy.get('#email').type('max@email.com').should('have.value', 'max@email.com')
    .clear().should('have.value', '')

    cy.get('#phone').type('18999998888').should('have.value', '18999998888')
    .clear().should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Maxwell',
    //   lastName: 'Kimura',
    //   email: 'max@email.com',
    //   phone: '18999998888',
    //   text: 'Texto preenchido pelo cypress'
    // }
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })

  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"][name="email"]')
      .check()
      .should('be.checked')

    cy.get('input[type="checkbox"][name="phone"]')
      .check()
      .should('be.checked')

    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche textarea usando o comando invoke', () => {
    const textoQualquer = 'Texto inserdio pelo comando invoke'
    cy.get('#open-text-area')
      .invoke('val', textoQualquer)
      .should('have.value', textoQualquer)

  })

  it('faz uma requisição HTTP', () => {
    cy.request(`https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html`)
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)

    cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')

    cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')

  })

  it.only('encontre o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')

    cy.get('#title')
      .invoke('text', 'CAT TAT')

    cy.get('#subtitle')
      .invoke('text', 'I ♥ CATs')
  })


})