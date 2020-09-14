const API = process.env.REACT_APP_SERVER_URL;

export const createOrder = (userId, token, cartProducts, orderData) => {
    const orderDetails = {
        order: {
            products: cartProducts,
            order: orderData
        }
    }
   return fetch(`${API}/order/create/${userId}`, {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
       },
       body: JSON.stringify(orderDetails)
   })
   .then( response => {
       return response.json();
   })
   .catch(err => console.log(err))
}
