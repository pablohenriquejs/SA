# Poke+ — Testes End-to-End com Cypress

Este repositório contém os testes automatizados E2E do projeto Poke+, cobrindo as telas Home e Login.
Os testes validam navegação, layout, campos, interações e funcionalidades básicas da aplicação.
```
Tecnologias Utilizadas

Cypress 13+

JavaScript

Node.js

HTML/CSS da aplicação Poke+
```
# Estrutura do Projeto
```
/cypress
  └── e2e
      ├── index.cy.js
      └── login.cy.js
/login.html
/index.html
/README.md
```
# O que é testado?
```
Tela de Login

Os testes verificam:

Exibição do título Poke+

Estrutura completa do formulário (inputs, placeholders, botão)

Mensagem de erro ao tentar logar sem preencher

Digitação nos campos de usuário e senha

Navegação para a página de cadastro

Verificação do rodapé
```
# Tela Home

Os testes incluem:
```
Logo exibido corretamente

Botões "Login" e "Cadastrar"

Navegação entre páginas

Hero Section (título, botão e imagem)

Seção de informações

Rodapé
```
# Como rodar o projeto
```
1. Instalar dependências
npm install

2. Abrir o Cypress
npx cypress open

3. Rodar os testes
```
Escolha o arquivo:

index.cy.js → testa a Home

login.cy.js → testa o Login

Ou execute todos via terminal:
```
npx cypress open
```
# URLs usadas nos testes
```
http://127.0.0.1:5500/index.html
http://127.0.0.1:5500/login.html
```

É necessário rodar a aplicação com algum servidor local, como a extensão Live Server do VSCode.

Arquivos de Teste
index.cy.js

Testes completos da tela inicial (Home), utilizando seletores como .btn-login, .btn-cadastro, .hero-animation, .info.

login.cy.js

Testes da tela de Login, validando inputs, textos, placeholders, botão Entrar e mensagem de erro.
