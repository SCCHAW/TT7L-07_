import React,{useState} from 'react'
import AdminNavHeader from '../adminNav/adminNavHeader'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';



const UsersProductDetails=()=>{
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const storedFirstName = storedUserData ? storedUserData.firstName : '';
  
    const [userFirstName, setUserFirstName] = useState(storedFirstName);
    const location = useLocation();
    const navigate = useNavigate()
    const { product } = location.state || {};
    
    const handleAddToCart=()=>{
        console.log('handleAddToCart')
    }

    const handleCancel=()=>{
        console.log('handleCancel')
        navigate('/home')
    }
    return(
        <div>
            <AdminNavHeader
            navTitle={userFirstName}/>
            
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

        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            
        </div>
    </div>
</div>
      
      ) : (
        <p>No product details available.</p>
      )}
    </div>
            
        </div>

    )
}

export default UsersProductDetails