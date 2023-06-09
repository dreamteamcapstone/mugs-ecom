
import { useState, useEffect } from 'react'
//import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Login, Register, Home, Navbar, Profile, SingleProduct, Cart, Admin, Checkout, OrderPlaced} from './components';
import { fetchAllProducts, fetchUserOrders } from './api/indexAPI';
import { getMe } from './api/auth';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
      if(token) {
        const me = await getMe(token);
        setUser(me);
        setIsLoggedIn(true);
        const userOrders = await fetchUserOrders(me, token);
        const openOrder = userOrders.find(order => order.purchased === false);
        setCart(openOrder);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const getUserData = async() => {
      if(token) {
        const me = await getMe(token);
        setUser(me);
        setIsLoggedIn(true);
        const userOrders = await fetchUserOrders(me, token);
        const openOrder = userOrders.find(order => order.purchased === false);
        setCart(openOrder);
      }
    }
    getUserData();
  }, [token])
  
  return (
    
    <div className="App">
      { <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setToken={setToken} setCart={setCart}/> }
      <Routes>
        <Route path="/" element={<Home  products={products} setProducts={setProducts} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} user={user} token={token}/>} />
        <Route path='/login' element={<Login user={user} setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}></Route>
        <Route path='/register' element={<Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} token={token} setCart={setCart} />}></Route>
        <Route path='/profile' element={<Profile token={token} user={user} isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/singleproduct' element={<SingleProduct selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} cart={cart} setCart={setCart} token={token} user={user} />}></Route>
        <Route path='/cart' element={<Cart cart={cart} token={token} user={user} setCart={setCart} setItems={setItems} items={items} products={products}/>}></Route>
        <Route path='/admin' element={<Admin user={user} token={token} setProducts={setProducts} />}></Route>
        <Route path='/checkout' element={<Checkout user={user} token={token} items={items} cart={cart} setCart={setCart} products={products} />}></Route>
        <Route path='/OrderPlaced' element={<OrderPlaced />}></Route>
      </Routes>

   
     

     
      


     


    </div>
  )
}

export default App;
