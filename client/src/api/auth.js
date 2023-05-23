
export const authenticateUser = async ({email, password}) => {
    try {
    const response = await fetch(`api/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    // console.log("RESPONSE", response)
    
        const result = await response.json();
        console.log("authenticate user result", result);
        const {user, message, token}  = result;
        if(token) {
          localStorage.setItem('token', token);
          return {user, token, message};
        } else return {message};

        } catch(error) {
            console.error(error);
        }
    }

    export const authenticateNewUser = async ({email, password}) => {
        try {
          const response = await fetch(`api/users/register`, {
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