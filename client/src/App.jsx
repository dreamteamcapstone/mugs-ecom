
import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Login, Register, Home, Navbar, Profile} from './components';
import { fetchAllProducts } from './api/indexAPI';
import { getMe } from './api/auth';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
      if(token) {
        const me = await getMe(token);
        // console.log(me);  
        setUser(me);
        setIsLoggedIn(true);
      }
    }
    getData();
  }, [])

  return (

    <div className="App">
      { <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setToken={setToken} /> }
      <Routes>
        <Route path="/" element={<Home  products={products} setProducts={setProducts} />} />
        <Route path='/login' element={<Login user={user} setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
        <Route path='/register' element={<Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} token={token} />}></Route>
        <Route path='/profile' element={<Profile token={token} user={user} isLoggedIn={isLoggedIn} />}></Route>
      </Routes>

   
     

     
      


     


    </div>
  )
}

export default App;
