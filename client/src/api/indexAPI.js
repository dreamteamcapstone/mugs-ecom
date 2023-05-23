
// const BASE_URL = `http://localhost:8080/api`


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