import React,{useState , useEffect} from 'react'
import AdminNavHeader from '../adminNav/adminNavHeader'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DialogBoxError from '../dialogbox/dialogError';
import DialogShoppingCart from '../dialogbox/dialogBoxCart';



const UsersProductDetails=()=>{
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    // Retrieve cart items from local storage
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  console.log("product in localstorage-->", cartItems);
    const storedFirstName = storedUserData ? storedUserData.firstName : '';
  
    const [userFirstName, setUserFirstName] = useState(storedFirstName);
    const location = useLocation();
    const navigate = useNavigate()
    const [product, setProduct] = useState(location?.state?.product || null);
    const [showDialogCartModal, setShowDialogCartModal] = useState(false);
    const [isDialogOpenError, setIsDialogOpenError] = useState(false)

    useEffect(() => {
        if (cartItems.length <= 0){
        handleCloseCartDialog()
        }
      }, [cartItems]);
    
    

    const handleCancel=()=>{
        console.log('handleCancel')
        navigate('/home')
    }

    const handleCloseCartDialog = () => {
        setShowDialogCartModal(false);
      };

      const handleCart = () => {
        setShowDialogCartModal(true);
      };

      const handleAddToCart = (product) => {
        console.log("added to cart--", product);
        if (!cartItems.some((item) => item.id === product.id)) {
          const updatedProductAddedToCart = [
            ...cartItems,
            { ...product, quantity: 1 },
          ];
          setCartItems(updatedProductAddedToCart);
          // Store the state in local storage
          localStorage.setItem('cart', JSON.stringify(updatedProductAddedToCart));
        } else {
          setIsDialogOpenError(true);
          console.log("Product already added to cart");
        }
      };

      const handleRemoveCartItem = (productToRemove) => {
        const updatedCart = cartItems.filter((item) => item !== productToRemove);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      };

      const handleCloseModalError =()=>{
        setIsDialogOpenError(false)
      }

    return(
        <div>
            <AdminNavHeader
            navTitle={userFirstName}
            cartItems={cartItems}
            handleCart={handleCart}/>
            
            <div style={{marginTop:40, marginBottom:50
            }}>
<ul className="nav nav-pills justify-content-center">
  <li className="nav-item">
    <a className="nav-link active nav-link disabled" aria-disabled="true" style={{ margin:20, textAlign:"center", height:70, fontSize:30}} >{product.productName}</a>
  </li></ul>
      {product ? (
        
        <div className="card mb-3" style={{ maxWidth: "50%", margin: "auto",marginBottom:50 }}>
    <img style={{ width: "100%", margin: "auto" }} src={product.productImage} className="card-img-top" alt="Product Image" />
    <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.productDescription}</p>
        <h6 >Price: RM {product.productPrice} : 00 </h6>
            <h6 style={{marginBottom: 10}}>Year: {product.productYear}</h6>
            <h6 style={{marginBottom: 10}}>Platform: {product.productPlatform}</h6>

        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            <div>
                <button type="button" className="btn btn-primary me-2" style={{ width:"100%", height:48}}  onClick={()=> {handleAddToCart(product)}}>Add To Compare</button>
                
            </div>
        </div>
    </div>
</div>
      
      ) : (
        <p>No product details available.</p>
      )}
    </div>
            
    <DialogShoppingCart
      isDialogCartOpen={showDialogCartModal}
      handleCloseCartDialog={handleCloseCartDialog}
      cartItems={cartItems}
      handleRemoveCartItem={handleRemoveCartItem}
      // total_per_quantity={total_per_quantity}
      // totalPerProductPrice={totalPerProductPrice}
      // handleIncreaseProduct_Quantity={handleIncreaseProduct_Quantity}
      // handleDecreaseProduct_Quantity={handleDecreaseProduct_Quantity}
      
      />

<DialogBoxError errorTitle={"Error"} errorMessage={"Product is already in cart"} isDialogOpenError={isDialogOpenError} handleCloseModalError={handleCloseModalError}/>

        </div>

    )
}

export default UsersProductDetails