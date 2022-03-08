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
    // fetch('http://localhost:3001/api/v1/orders')
    //   .then(response => response.json())
    //   .then(data => this.setState({ orders: data.orders }))
    //   .catch(err => console.error('Error fetching:', err));
    this.getOrders()
  }

  getOrders = () => {
    fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(data => this.setState({ orders: data.orders }))
      .catch(err => console.error('Error fetching:', err))
  }

  addOrder = (order) => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      // .then(data => this.setState({ orders: [...this.state.orders, data]}))
      .then(() => this.getOrders())
      .catch(err => console.error('Error fetching:', err))
  }

  deleteOrder = (id) => {
    id = parseInt(id);
    fetch(`http://localhost:3001/api/v1/orders/${id}`, { method: 'DELETE' })
      .then(() => this.getOrders())
      .catch(err => console.error('Error fetching:', err))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} deleteOrder={this.deleteOrder}/>
      </main>
    );
  }
}


export default App;
