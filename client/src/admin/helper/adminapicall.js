const API = process.env.REACT_APP_SERVER_URL;

//CATEGORY API CALLS

//Create Category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

//Get all categories
export const getAllcategories = () => {
    return fetch(`${API}/category/all-categories`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//Get category by ID
export const getCategoryById = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
      method:'GET'
  })
  .then( response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

//Update Category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

//Delete Category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}



//PRODUCT API CALLS

//get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//get product by Id
export const getProductById = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//get products by Category
export const getProductsByCategory = (categoryId) => {
    return fetch(`${API}/products/category/${categoryId}`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//create product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//update product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error))
}

//Delete product
export const deleteProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then( response => {
        return response.json()
    })
    .catch(error => console.log(error))
}