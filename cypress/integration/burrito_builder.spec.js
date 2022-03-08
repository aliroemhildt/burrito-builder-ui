describe('On page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      { fixture: 'initial_get_data.json' }
    )
      .visit('http://localhost:3000')
  })

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
  })
})