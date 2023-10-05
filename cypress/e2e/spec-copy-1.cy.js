describe('Settings', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

 
  it('register not possible because email', () => {
    cy.get('input[name="firstName"]').clear().type('Denitsa');
    cy.get('input[name="lastName"]').clear().type('Goranova');
    cy.get('input[name="email"]').clear().type('denica_goranova@abv.bg');
    cy.get('input[name="address"]').clear().type('12');
    cy.get('input[name="password"]').clear().type('088uihuhiguugigD#1');
    cy.get('form').submit();
    cy.contains('Failed to create user:Error: Email already exists').should('be.visible');

  });it('register not possible because password ', () => {
    cy.get('input[name="firstName"]').clear().type('Denitsa');
    cy.get('input[name="lastName"]').clear().type('Goranova');
    cy.get('input[name="email"]').clear().type('denica_goranodva@abv.bg');
    cy.get('input[name="address"]').clear().type('12');
    cy.get('input[name="password"]').clear().type('#1');
    cy.get('form').submit();
    cy.contains('Failed to create user:Error: Invalid password, must contain 8 character,one upper case, one lower, one special symbol(@#$%^&+=), one digit').should('be.visible');

  });
});
