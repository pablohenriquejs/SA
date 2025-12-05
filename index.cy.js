describe('Tela de Login - Poke+', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/login.html'); 
  });

  it('Deve exibir o título Poke+ no topo da página', () => {
    cy.get('.logo').should('be.visible').and('contain', 'Poke+');
  });

  it('Deve exibir corretamente todos os elementos do formulário de login', () => {
    cy.get('h1').should('contain', 'Bem-vindo de volta!');
    cy.get('p').first().should('contain', 'Entre na sua conta para continuar');

    cy.get('#usuario')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite seu usuário');

    cy.get('#senha')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite sua senha');

    cy.get('.btn-login-page')
      .should('be.visible')
      .and('contain', 'Entrar');
  });

  it('Deve exibir mensagem de erro ao tentar logar sem preencher os campos', () => {
    cy.get('.btn-login-page').click();
    cy.get('#mensagemErro').should('be.visible');
  });

  it('Deve conseguir digitar nos campos de usuário e senha', () => {
    cy.get('#usuario')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com');

    cy.get('#senha')
      .type('123456')
      .should('have.value', '123456');
  });

  it('Deve acessar a página de cadastro ao clicar no link "Cadastre-se"', () => {
    cy.contains('Cadastre-se').click();
    cy.url().should('include', 'cadastro.html');
  });

  it('O rodapé deve ser visível e com o texto correto', () => {
    cy.get('footer').should('be.visible');
    cy.get('footer p')
      .should('contain', '© 2025 Poke+. Todos os direitos reservados.');
  });

});


describe('Tela Home - Poke+', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  // --- Barra de navegação ---
  it('Deve exibir o logo Poke+ no topo da página', () => {
    cy.get('.logo')
      .should('be.visible')
      .and('contain', 'Poke+');
  });

  it('Deve exibir os botões Login e Cadastrar na barra de navegação', () => {
    cy.get('.btn-login')
      .should('be.visible')
      .and('contain', 'Login');

    cy.get('.btn-cadastro')
      .should('be.visible')
      .and('contain', 'Cadastrar');
  });

  it('Deve navegar para a página de login ao clicar no botão Login', () => {
    cy.get('.btn-login').click();
    cy.url().should('include', 'login.html');
  });

  it('Deve navegar para a página de cadastro ao clicar no botão Cadastrar', () => {
    cy.get('.btn-cadastro').click();
    cy.url().should('include', 'cadastro.html');
  });

  // --- Seção Herói ---
  it('Deve exibir o título principal da Hero Section', () => {
    cy.get('.hero-text h1')
      .should('be.visible')
      .and('contain', 'Feito para quem ama aprender');
  });

  it('Deve exibir o botão "Comece sua jornada"', () => {
    cy.get('.btn-app')
      .should('be.visible')
      .and('contain', 'Comece sua jornada');
  });

  it('O botão "Comece sua jornada" deve redirecionar para o cadastro', () => {
    cy.get('.btn-app').click();
    cy.url().should('include', 'cadastro.html');
  });

  it('Deve exibir a imagem principal da Home', () => {
    cy.get('.hero-animation img')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'poke.jpg');
  });

  // --- Seção de Informações ---
  it('Deve exibir o título da seção de informações', () => {
    cy.get('.info h2')
      .should('be.visible')
      .and('contain', 'Descubra o mundo dos Pokémons');
  });

  // --- Rodapé ---
  it('O rodapé deve ser visível e com o texto correto', () => {
    cy.get('footer p')
      .should('be.visible')
      .and('contain', '© 2025 Poke+. Todos os direitos reservados.');
  });

});
