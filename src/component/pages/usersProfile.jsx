import React, { Fragment , useState , useEffect} from 'react';
import AdminNavHeader from '../adminNav/adminNavHeader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { defaultAvatar } from '../assets';
import DialogShoppingCart from '../dialogbox/dialogBoxCart';

const UserProfile = () => {
   

const storedUserData = JSON.parse(localStorage.getItem('user'));
console.log("xxx", storedUserData)

    // Retrieve cart items from local storage
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const storedFirstName = storedUserData ? storedUserData.firstName : '';
    const [userFirstName, setUserFirstName] = useState(storedFirstName);

    const [showDialogCartModal, setShowDialogCartModal] = useState(false);

   

    useEffect(() => {
        if (cartItems.length <= 0){
        handleCloseCartDialog()
        }
      }, [cartItems]);

      const handleCart = () => {
        setShowDialogCartModal(true);
      };

      const handleCloseCartDialog = () => {
        setShowDialogCartModal(false);
      };

      const handleRemoveCartItem = (productToRemove) => {
        const updatedCart = cartItems.filter((item) => item !== productToRemove);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      };

      if ( !storedUserData) {
        return <div>Loading...</div>;
    }


    return (
        <Fragment>
            <AdminNavHeader navTitle={userFirstName} 
            cartItems={cartItems}
            handleCart={handleCart} />
            <div className="container mt-5">
                <h2 className="mb-5 text-center">My Profile</h2>
                <div className="row justify-content-center user-info">
                    <div className="col-12 col-md-4 text-center">
                        {defaultAvatar && defaultAvatar ? (
                            <figure className="avatar avatar-profile">
                                <img
                                    className="rounded-circle img-fluid"
                                    src={ defaultAvatar }
                                    alt= "Defaut Avatar"
                                />
                            </figure>
                        ) : (
                            <div className="placeholder-avatar">No avatar available</div>
                        )}
                        <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-3">
                            Edit Profile
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Full Name</h4>
                                <p>{userFirstName || 'Not available'}</p>

                                <h4>Email Address</h4>
                                <p>{storedUserData.email || 'Not available'}</p>

                                <h4>Joined on</h4>
                                <p>{storedUserData.createdAt ? String(storedUserData.createdAt).substring(0, 10) : 'Not available'}</p>

                                
                                <Link to="/userForgetPassword" className="btn btn-primary btn-block mt-3">
                                    Change Password
                                </Link>
                                
                            </div>
                        </div>
                    </div>
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

            </div>
        </Fragment>
    );
}

export default UserProfile;
