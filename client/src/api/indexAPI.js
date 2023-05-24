// const BASE_URL = `http://localhost:8080/api`;


// Get All Products 
export const fetchAllProducts = async () => {
   try {
    const response = await fetch(`api/products`, {
       headers: {
        'Content-Type': 'application/json',
       }, 
    });

    const result = await response.json()
    
    return result;
   } catch (error) {
    console.error(error)
   }
}

//API calls here
export const fetchUserOrders = async (user, token) => {
    try {
        const response = await fetch(`api/users/${user.id}/orders`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
};

export const createUserOrder = async ({userId, purchased}, token) => {
  try {
    console.log("hello from create user order")
    const response = await fetch(`api/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({userId, purchased})
    });
      console.log(response);
    const result = await response.json();
    console.log("create user order result:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const fetchOrderProducts = async (token, orderId) => {
  try {
    const response = await fetch(`api/orders/${orderId}/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch(error) {
    console.error(error);
  }
}

export const updateCartItem = async ({id, quantity, purchasePrice}) => {
  try {
    const response = await fetch(`api/order_products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({quantity, purchasePrice})
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export const removeCartItem = async (id) => {
  try {
    const response = await fetch(`api/order_products/${id}`, {
      method: "DELETE"
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}