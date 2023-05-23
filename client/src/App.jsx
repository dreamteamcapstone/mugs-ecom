
import { useState, useEffect } from 'react'
// import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Login, Register, Home, Navbar} from './components';
import { fetchAllProducts } from './api/indexAPI';


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
        setUser(me);
        setIsLoggedIn(true);
      }
    }
    getData();
  }, [])

  return (

    <div className="App">
      { <Navbar setUser={setUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setToken={setToken} /> }
      <Routes>
        <Route path="/" element={<Home  products={products} setProducts={setProducts} />} />
        <Route path='/login' element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
        <Route path='/register' element={<Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
      </Routes>

   
     

     
      


     


    </div>
  )
}

export default App;
