
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
// import {
//   //components go here
// } from "../components/";
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from './components';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // useEffect(() => {
  //   const getData = async () => {
  //     const fetchedProducts = await fetchProducts();
  //     setProducts(fetchedProducts);
  //     if(token) {
  //       const me = await getMe(token);
  //       setUser(me);
  //       setIsLoggedIn(true);
  //     }
  //   }
  //   getData();
  // }, [])

  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path='/login' element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
        <Route path='/register' element={<Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
      </Routes>
    </div>
  )
}

export default App
