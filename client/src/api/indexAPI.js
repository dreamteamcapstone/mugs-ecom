const BASE_URL = `http://localhost:8080/api`;

//API calls here


// Get All Products 
export const fetchAllProducts = async () => {
   try {
    const response = await fetch(`${BASE_URL}/products`, {
       headers: {
        'Content-Type': 'application/json',
       }, 
    });

    const result = await response.json()
    
    console.log("This is the result:", result)
    return result;
   } catch (error) {
    console.error(error)
   }
}

