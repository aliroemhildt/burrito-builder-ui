describe('On page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      { fixture: 'initial_get_data.json' }
    )
      .visit('http://localhost:3000')
  });

  it('Should display existing orders', () => {
    cy.get('.order').should('have.length', 2)
      
      .get('.order').eq(0).find('h3').contains('Pat')
      .get('.order').eq(0).find('li').should('have.length', 4)
      .get('.order').eq(0).find('li').eq(0).contains('beans')
      .get('.order').eq(0).find('li').eq(1).contains('lettuce')
      .get('.order').eq(0).find('li').eq(2).contains('carnitas')
      .get('.order').eq(0).find('li').eq(3).contains('queso fresco')

      .get('.order').eq(1).find('h3').contains('Sam')
      .get('.order').eq(1).find('li').should('have.length', 2)
      .get('.order').eq(1).find('li').eq(0).contains('steak')
      .get('.order').eq(1).find('li').eq(1).contains('pico de gallo')
  });

  it('Should show form on page load', () => {
    cy.get('h1').contains('Burrito Builder')
    
      .get('input[type=text').should('have.length', 1)
      .should('have.attr', 'value', '')

      .get('.ingredient-btn').should('have.length', 12)
      .get('.ingredient-btn').eq(0).contains('beans')
      .get('.ingredient-btn').eq(1).contains('steak')
      .get('.ingredient-btn').eq(2).contains('carnitas')
      .get('.ingredient-btn').eq(3).contains('sofritas')
      .get('.ingredient-btn').eq(4).contains('lettuce')
      .get('.ingredient-btn').eq(5).contains('queso fresco')
      .get('.ingredient-btn').eq(6).contains('pico de gallo')
      .get('.ingredient-btn').eq(7).contains('hot sauce')
      .get('.ingredient-btn').eq(8).contains('guacamole')
      .get('.ingredient-btn').eq(9).contains('jalapenos')
      .get('.ingredient-btn').eq(10).contains('cilantro')
      .get('.ingredient-btn').eq(11).contains('sour cream')
      
      .get('form > p:first').contains('Order: Nothing selected')
      .get('.submit-btn').contains('Submit Order')

  })

});