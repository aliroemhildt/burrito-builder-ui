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
    
      .get('input').should('have.length', 1)
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
  });
});

describe('User input', () => {
  it('Should update form on input change or ingredient button click', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      { fixture: 'initial_get_data.json' }
      )
      .visit('http://localhost:3000')
    
      .get('input')
      .should('have.attr', 'value', '')
      .type('Ali')
      .should('have.attr', 'value', 'Ali')

      .get('form > p:first').contains('Order: Nothing selected')
      .get('.ingredient-btn:first').click()
      .get('form > p:first').contains('Order: beans')
  });

  it('Should add a new order to the page when submit button is clicked', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      { fixture: 'initial_get_data.json' }
      )
      .visit('http://localhost:3000')
      .intercept('POST', 'http://localhost:3001/api/v1/orders',
      { fixture: 'post_order.json' }
      )
      .intercept('GET', 'http://localhost:3001/api/v1/orders',
      { fixture: 'after_post_data.json' }
      ) 
  
      .get('input').type('Ali')
      .get('.ingredient-btn').eq(0).click()
      .get('.ingredient-btn').eq(1).click()
      .get('.submit-btn').click()
      
      .wait(2000)
      .get('.order').eq(2).find('h3').contains('Ali')
      .get('.order').eq(2).find('li').eq(0).contains('beans')
      .get('.order').eq(2).find('li').eq(1).contains('steak')
    });

  it.only('Should show an error message on submit if name or ingredients is empty', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',
      { fixture: 'initial_get_data.json' }
      )
      .visit('http://localhost:3000')
      
      .get('input').type('Ali')
      .get('.submit-btn').click()
      .get('.error-msg').contains('Please enter a name and select ingredients')

      .get('.ingredient-btn').eq(0).click()
      .get('.error-msg').should('not.exist')

      .get('input').clear()
      .get('.submit-btn').click()
      .get('.error-msg').contains('Please enter a name and select ingredients')
  });
});