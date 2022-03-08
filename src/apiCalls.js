const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
    .catch(err => console.error('Error fetching:', err))
}

const postOrder = (order) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .catch(err => console.error('Error fetching:', err))
}

const deleteOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {method: 'DELETE'})
    .catch(err => console.error('Error fetching:', err))
}

export { getOrders, postOrder, deleteOrder }
