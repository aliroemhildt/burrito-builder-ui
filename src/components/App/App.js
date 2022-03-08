import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder, deleteOrder } from '../../apiCalls';
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
    this.updateOrders();
  }

  updateOrders = () => {
    getOrders()
      .then(data => this.setState({ orders: data.orders }))
  }

  addOrder = (order) => {
    postOrder(order)
      .then(() => this.updateOrders())
  }

  removeOrder = (id) => {
    deleteOrder(id)
      .then(() => this.updateOrders())
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder}/>
      </main>
    );
  }
}


export default App;
