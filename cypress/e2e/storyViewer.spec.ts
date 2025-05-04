describe('Story Viewer App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the stories list', () => {
    cy.get('.story-list-wrapper').should('be.visible');
    
    cy.get('.story-item').its('length').should('be.greaterThan', 0);
  });

  it('should navigate to the next story on clicking right', () => {
    cy.get('.story-item').eq(0).click();
  
    cy.get('.story-viewer-container').should('be.visible');
  
    cy.get('.story-image')
      .invoke('attr', 'src')
      .then((firstSrc) => {
        cy.get('.story-right').click();
  
        cy.get('.loader', { timeout: 5000 }).should('not.exist');
  
        cy.get('.story-image')
          .invoke('attr', 'src')
          .should('not.equal', firstSrc);
      });
  });
  
  it('should navigate to the previous story on clicking left', () => {
    cy.get('.story-item').eq(1).click();
  
    cy.get('.story-viewer-container').should('be.visible');
  
    cy.get('.story-image')
      .invoke('attr', 'src')
      .then((firstSrc) => {
        cy.get('.story-right').click(); 
        cy.get('.loader', { timeout: 5000 }).should('not.exist'); 
  
        cy.get('.story-left').click(); 
        cy.get('.loader', { timeout: 5000 }).should('not.exist'); 
  
        cy.get('.story-image')
          .invoke('attr', 'src')
          .should('equal', firstSrc);
      });
  });  

  it('should automatically advance to the next story after 5 seconds', () => {
    cy.get('.story-item').first().click();

    cy.wait(5100);
  });

  it('should show loading state while image is loading', () => {
    cy.get('.story-item').first().click();

    cy.get('.loader').should('not.exist');
  });

  it('should close the viewer on swipe down', () => {
    cy.get('.story-item').first().click();

    cy.get('.story-viewer-container').should('be.visible');

    cy.get('.story-viewer-overlay')
      .trigger('touchstart', { touches: [{ clientY: 0 }] })
      .trigger('touchmove', { touches: [{ clientY: 100 }] });

    cy.get('.story-viewer-container').should('not.exist');
  });
});
