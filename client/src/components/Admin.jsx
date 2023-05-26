import React, {useState} from 'react';
import { createProduct, deleteProduct } from '../api/indexAPI';

const Admin = ({user, token, setProducts}) => {
const [productId, setProductId] = useState(0);
const [productName, setProductName] = useState("");
const [productDesc, setProductDesc] = useState("");
const [productImage, setProductImage] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productInventory, setProductInventory] = useState(0);

const handleCreate = async (event) => {
    event.preventDefault();
    const product = await createProduct(token, {name: productName, description: productDesc, imageUrl: productImage, price: productPrice, inventory: productInventory});
    console.log(product);
}

const handleEdit = async (event) => {
    event.preventDefault()
}

const handleDelete = async (event) => {
    event.preventDefault()
    const product = await deleteProduct(productId, token)
    console.log("Deleted product:", product);
}
    return(
        <>
        {user.admin ? 
        (<div>
            <form onSubmit={handleCreate}>
                <input placeholder="name" type="text" value={productName} onChange={(event) => setProductName(event.target.value)}/>
                <input placeholder="description" type="text" value={productDesc} onChange={(event) => setProductDesc(event.target.value)}/>
                <input placeholder="imageUrl" type="text" value={productImage} onChange={(event) => setProductImage(event.target.value)}/>
                <input placeholder="price" type="text" data-type="currency" value={productPrice} onChange={(event) => setProductPrice(event.target.value)}/>
                <input placeholder="inventory" type="number" value={productInventory} onChange={(event) => setProductInventory(event.target.value)}/>
                <button type="submit">Add New Product</button>
            </form>
            <form onSubmit={handleEdit}>
                <input id="name" type="text" />
                <input id="description" type="text" />
                <input id="imageUrl" type="text" />
                <input id="price" type="" />
                <input id="inventory" type="number" />
                <button type="submit">Edit Product</button>
            </form>
            <form onSubmit={handleDelete}>
            <input type="number" value={productId} onChange={(event) => setProductId(event.target.value)}/>
            <button type="submit">Delete Product</button>
            </form>
        </div>)
        :
        (<div>
            <p>HALT! You need to be an Admin to hangout here!</p>
        </div>)}
        </>
    )
}

export default Admin