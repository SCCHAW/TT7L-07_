import React , {useState, useEffect} from "react";
import "./homepage.css"
import { useDispatch  } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import web_logo from '../assets/Assets/treasure-hunt-logo1.jpeg'
import AdminNavHeader from "../adminNav/adminNavHeader";
import { loginSuccess } from "../../features/auth/authSlice";
import { authenticity, freeshipping, giftcard, notFound, photo1, photo2, photo3, voucher } from "../assets";
import axios from "axios";



const Homepage = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const storedUserData = JSON.parse(localStorage.getItem('user'));
  const storedFirstName = storedUserData ? storedUserData.firstName : '';

  const [userFirstName, setUserFirstName] = useState(storedFirstName);
  const [allProductData, setAllProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");


  useEffect(() => {
    getAllProduct();

  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(loginSuccess(storedUser)); // Restore user data from Local Storage to Redux store
      setUserFirstName(storedUser.firstName);
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('firstName', userFirstName);
  }, [userFirstName]);


  if (!userFirstName) {
    <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  }

  const carouselData = [photo1, photo2, photo3];

  const dataText =[
    {
      id: 0,
      image: authenticity,
      name:'Treasure Hunt',
      text: "100% Authentic brand"
    },
    {
      id: 1,
      image: freeshipping,
      name: 'Free Shipping',
      text: "Fast & Free Delivery"
    },
    {
      id: 2,
      image: giftcard,
      name:'Top Up', 
      text: "Free gifst & top up for eStore"
    },
    {
      id: 3,
      image: voucher,
      name:'Vouchers', 
      text: "Collect & Redeem Now!"
    }
  ]

  const getAllProduct = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/products", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          console.log("getAllProduct", response.data)
          setAllProductData(response.data)
    } catch (error) {
        
    }
  }
   
  const handleAddCart =()=>{
    console.log('successfully add cart')
    navigate('/userCart')
    }
    
const handleProductDetails=(product)=>{
console.log('cc',product)
navigate('/usersProductDetail', {state:{product}})
}

const handleInputChange = (event) => {
  const { name, value } = event.target;
  console.log('Selected category:', value);
  setSelectedCategory(value);
};


const filteredProducts = selectedCategory
? allProductData.filter(product => product.productCategory === selectedCategory)
: allProductData;


    return (
        <div className="text-bg-light p-3">
            <AdminNavHeader 
            navTitle={userFirstName}
            home={"Home"}
            productCategory={selectedCategory}
            handleInputChange={handleInputChange}/>
            
             {/* <img src={web_logo} alt=""/> */}

             <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 80,
        height: "100vh",
      }}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          style={{ width: "60%" }}
        >
          <div className="carousel-indicators">
            {carouselData.map((item, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {carouselData.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={item}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: 500 }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div
          style={{
            width: "25%",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={photo3}
            className="img-thumbnail"
            alt="..."
            style={{ width: "100%", height: 500 }}
          />
        </div>
      </div>

      <div className="container mt-4">
  <div className="row">
    {dataText.map((item, index) => (
      <div key={index} className="col-md-3">
        <div className="card mb-4">
          <div className="card-body" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={item.image} className="card-img-top" alt={`Content ${index + 1}`} style={{ width: '20%', marginRight: '10px' }} />
            <h5 className="card-title" style={{color:"#000000", fontWeight:"bolder"}}>{item.name}</h5>
            <div>
            </div>
          </div>
          <div style={{  }}>
          <p className="card-text" style={{display: "flex",textAlign:'center'}}>{item.text}</p>
            </div>
    
        </div>
      </div>
    ))}
  </div>
</div>

<div
        style={{
          marginTop: 100,
          marginLeft: 40,
          marginRight: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      > 
      { filteredProducts.length > 0 ? filteredProducts.map((product)=> (
          <div
          className="card"
          style={{ width: "20%", flexBasis: "20%",}}
          key={product.id}
        >
          <img
            src={product.productImage}
            className="card-img-top"
            alt={product.productName}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{product.productName}</h5>
            <p
              className="card-text"
              style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
            >
              {product.productDescription}
            </p>
            <h6 >Price: RM {product.productPrice} : 00 </h6>
            <h6 style={{marginBottom: 10}}>Year: {product.productYear}</h6>
            <div style={{display:"flex" ,flexDirection:"column"}}>
            <button to="#" className="btn btn-primary" style={{marginBottom:10, width:"60%", height:48}} onClick={()=> {handleProductDetails(product)}} >
              Product Details 
              
            </button>
            <button to="#" className="btn btn-primary" style={{ width:"60%", height:48}}  onClick={handleAddCart}>
              Add to cart
            </button>
            </div>
          </div>
        </div>

      )): 
      
      <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50vh",
            }}
          >
            <h3 style={{ marginBottom: 20 }}>NOT FOUND</h3>
            <img
              src={notFound}
              alt="Not Found"
              style={{ height: 300, objectFit: "contain" }}
            />
          </div>
    
    }
    
      
      </div>
    </div>
           
        </div>
    )

}

export default Homepage