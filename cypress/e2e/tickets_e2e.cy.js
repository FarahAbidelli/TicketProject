
describe('Test End-to-End - Gestion des Tickets', () => {
  const baseUrl = "http://localhost:3002";
  const ticketTitle = "Ticket Cypress E2E";

  it('🟢 Ajouter un nouveau ticket via l’interface', () => {
    cy.visit(`${baseUrl}/index.html`);

    cy.get('#title').type(ticketTitle);
    cy.get('#description').type('Créé automatiquement pour un test E2E');
    cy.get('#requester').type('Farah QA');
    cy.get('#priority').select('haute');

    cy.get('.submit-btn').click();

    cy.get('#message').should('contain.text', "✅ Ticket ajouté avec succès !");
  });

  it('🔵 Consulter la liste des tickets', () => {
    cy.visit(`${baseUrl}/liste.html`);
    cy.wait(1000); // attendre le chargement de la liste

    cy.contains(ticketTitle).should('exist');
  });

  it('🟠 Modifier le statut du ticket', () => {
    cy.visit(`${baseUrl}/liste.html`);
    cy.wait(1000);

    cy.contains(ticketTitle)
      .parents('tr')
      .find('select')
      .select('en cours');

    cy.contains(ticketTitle)
      .parents('tr')
      .find('select')
      .should('have.value', 'en cours');
  });

 it('🔴 Supprimer le ticket', () => {
  cy.visit('http://localhost:3002/liste.html');
  cy.wait(1000);

  // Confirmer la suppression
  cy.contains(ticketTitle).parents('tr').find('.delete-btn').click();
  cy.on('window:confirm', () => true);

  // Attendre que le fetch DELETE et le rechargement soient terminés
  cy.wait(2000);

  // Recharger la page pour être sûr que le tableau se met à jour
  cy.reload();
  cy.wait(2000);

  // Vérifier que le ticket n’existe plus
  cy.get('table').should('not.contain', ticketTitle);
});

});
