
import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { 
  Login, 
  Register, 
  Profile } from './components';
//import { getMe } from './api/auth';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // const fetchedProducts = await fetchProducts();
      // setProducts(fetchedProducts);
      if(token) {
        // const me = await getMe(token);
        // console.log(me);  
        // setUser(me);
        setIsLoggedIn(true);
      }
    }
    getData();
  }, [])

  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path='/login' element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
        <Route path='/register' element={<Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
        <Route path='/profile' element={<Profile token={token} user={user} isLoggedIn={isLoggedIn} />}></Route>
      </Routes>
    </div>
  )
}

export default App
