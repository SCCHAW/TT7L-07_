import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavHeader from "../adminNav/adminNavHeader";
import axios from "axios";

const AdminViewAllProduct = () =>{
    const navigate = useNavigate()

    const [allProductData, setAllProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getAllProduct();

  }, []);


    const handleAddProduct = () => {
        navigate("/admin");
      };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log('Selected category:', value); 
        setSelectedCategory({
          ...selectedCategory,
          [name]: value,
        });
      };


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

      const handleProductDetails=(product)=>{
        console.log('product details', product)
        navigate("/adminProductDetail", {state:{product}})
    }
  


    return(
        <div>
            <AdminNavHeader
        navTitle={"Admin - View Product"}
        handleAddProduct={handleAddProduct}
        productCategory={selectedCategory}
        handleInputChange={handleInputChange}
        
      />
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
      {allProductData.map((product)=> (
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
            <button to="#" className="btn btn-primary mt-auto" onClick={()=> {handleProductDetails(product)}}>
              Product Details
            </button>
          </div>
        </div>

      ))}
      
      </div>
        </div>
    )
}

export default AdminViewAllProduct