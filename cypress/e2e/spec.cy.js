
describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

 

  it(' login invalid pass or email', () => {
    cy.get('input[id="email"]').type('denitsa@abv.com');
    cy.get('input[id="password"]').type('123');
    cy.get('form').submit();

    cy.contains('Invalid password or email').should('be.visible');
  });
  it(' login valid pass or email', () => {
    cy.get('input[id="email"]').type('rali@abv.bg');
    cy.get('input[id="password"]').type('0882704459dD#');
    cy.get('form').submit();
    cy.url().should('include', '/home')

  });



});

