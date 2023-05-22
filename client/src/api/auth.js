const BASE_URL = `http://localhost.com:8080/api`

export const authenticateUser = async ({email, password}) => {
    try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    // console.log("RESPONSE", response)
    
        const result = await response.json();
        console.log("authenticat user result", result);
        const {user, message, token}  = result;
        if(token) {
          localStorage.setItem('token', token);
          return {user, token, message};
        } else return {message};

        } catch (err) {
            console.error(err);
        }
    }

    export const authenticateNewUser = async ({email, password}) => {
        try {
          const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
          });
        //   console.log("RESPONSE", response)
          
              const result = await response.json();
              console.log("authenticate new user result", result);
              const {user, message, token}  = result;
              if(token) {
                localStorage.setItem('token', token);
                return {user, token, message};
              } else return {message};
              
          } catch (err) {
              console.error(err);
          }
      }