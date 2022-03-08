import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount = () => {
    getOrders()
      .catch(err => console.error('Error fetching:', err));
  }

  getOrders = () => {
    fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(data => this.setState({ orders: data.orders}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
