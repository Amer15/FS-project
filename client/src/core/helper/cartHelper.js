export const addCartToLocalStorage = (product, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      // console.log(cart);

      const isSameProduct = cart.filter(prod => prod._id === product._id);

      if (isSameProduct.length === 0) {
        cart.push(product);
      }
      else {
        console.log('Same product cannot be added')
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
    else {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    next();
  }
}


export const getCartDetails = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
}

export const updateCartItems = (items) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart');
      cart = items;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}

export const getCartTotalPrice = () => {
  let priceArray = [];
  let amount = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      cart.forEach(item => {
        priceArray.push(item.price);
      });
      if (priceArray.length > 0) {
       amount = priceArray.reduce((total, currPrice) => total + currPrice);
      }
      return amount;
    }
    else {
      return 0;
    }
  }
}

export const emptyCart = next => {
  if (typeof window !== undefined) {
    localStorage.removeItem('cart');
    next();
  }
}

export const getDetailsOfCartItems = () => {
  let cartItems = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      let cartProducts = JSON.parse(localStorage.getItem('cart'));
      if (cartProducts.length > 0) {
        cartProducts.forEach(product => {
          cartItems.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category.name,
            quantity: 1
          });
        })
        return cartItems;
      }
    }
    else {
      return null;
    }
  }
}