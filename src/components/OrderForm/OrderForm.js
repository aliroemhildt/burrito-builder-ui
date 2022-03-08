import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length) {
      this.props.addOrder(this.state);
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    const newIngredient = e.target.name
    if (this.state.ingredients.includes(newIngredient)) {
      const newList = this.state.ingredients.filter(ingredient => {
        return ingredient !== newIngredient;
      });
      this.setState({ ingredients: newList });
    } else {
      this.setState({ ingredients: [...this.state.ingredients, e.target.name] });
    }
  }

  handleNameChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    );
  }
}

export default OrderForm;
