import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DialogBoxSuccess from "../dialogbox/dialogSuccess";
import DoubleDialogBox from "../dialogbox/doubleDiologBox";
import DialogBoxYesNo from "../dialogbox/dialogBoxYesNo";
import DialogBoxUpdate from "../dialogbox/dialogBoxUpdate";
import DialogBoxError from "../dialogbox/dialogError";



const AdminProductDetail =() => {

  const location = useLocation();
  const { product } = location.state || {};
  console.log("check", product);
  const navigate = useNavigate();

  const [productFormData, setProductFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productYear: "",
    productCategory: "",
    productImage: "",
    productLink:"",
  });

  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isDialogModalUpdateOpen, setIsDialogModalUpdateOpen] = useState(false);
  const [isDialogOpenError, setIsDialogOpenError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setProductFormData({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productYear: product.productYear,
        productCategory: product.productCategory,
        productImage: product.productImage,
        productLink: product.productLink,
      });
    }
  }, [product]);

  const handleCancel = () => {
    navigate("/adminViewProduct");
  };

  const handleDelete = async () => {
    try {
      setIsFirstModalOpen(true);
    } catch (error) {}
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${product.id}`
      );
      if (response.data) {
        setIsSuccessMessage(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCloseSecondModal = () => {
    setIsSecondModalOpen(false);
    handleCancel();
  };

  const handleFirstClick = () => {
    setIsFirstModalOpen(false);
    deleteProduct();
    setIsSecondModalOpen(true);
  };

  const handleSecondClick = () => {
    setIsFirstModalOpen(false);
  };

  const handleProductUpdate = () => {
    setIsDialogModalUpdateOpen(true);
  };

  const handleCloseDialogUpdate = () => {
    setIsDialogModalUpdateOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductFormData({
      ...productFormData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      if (
        !productFormData.productName ||
        !productFormData.productDescription ||
        !productFormData.productPrice ||
        !productFormData.productImage ||
        !productFormData.productYear ||
        !productFormData.productCategory ||
        !productFormData.productLink
      ) {
        setIsErrorMessage("All fields are required");
        setIsDialogOpenError(true);
        return;
      }

      const productUpdateData = {
        productName: productFormData.productName,
        productDescription: productFormData.productDescription,
        productPrice: productFormData.productPrice,
        productYear: productFormData.productYear,
        productCategory: productFormData.productCategory,
        productImage: productFormData.productImage,
        productLink: productFormData.productLink,
  
      };
      console.log(product);

      const response = await axios.put(
        `http://localhost:3000/api/updateProduct/${product.id}`,
        productUpdateData
      );
      console.log("product success--", response.data);
      if (response.data) {
        setIsSuccessMessage(response.data.message);
        setIsDialogModalUpdateOpen(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsErrorMessage(error.response.data);
      setIsDialogOpenError(true);
      console.log("error 1", error.response.data);
      console.log("error2, ", error.response);
    }
  };

  const handleCloseModalError = () => {
    setIsDialogOpenError(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleCancel();
  };


    return (
        <div>
<div>
<ul className="nav nav-pills justify-content-center">
  <li className="nav-item">
    <a className="nav-link active nav-link disabled" aria-disabled="true" style={{ margin:20, textAlign:"center", height:70, fontSize:30}} >{product.productName}</a>
  </li></ul>
      {product ? (
        
        <div className="card mb-3" style={{ maxWidth: "50%", margin: "auto" }}>
    <img style={{ width: "100%", height:500, objectFit: "contain" , margin: "auto" }} src={product.productImage} className="card-img-top" alt="Product Image" />
    <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.productDescription}</p>
        <h6 >Price: RM {product.productPrice} : 00 </h6>
            <h6 style={{marginBottom: 10}}>Year: {product.productYear}</h6>
            

        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        {isDialogModalUpdateOpen ? null : (
  <div className="row">
    <div className="col d-flex justify-content-start">
      <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
    <div className="col d-flex justify-content-end">
      <button style={{width:"26%"}} type="button" className="btn btn-primary me-2" onClick={handleProductUpdate}>Update</button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
    </div>
  </div>
)}
        
    </div>
</div>
      
      ) : (
        <p>No product details available.</p>
      )}
    </div>

    <DialogBoxSuccess
        dialogTitle={"Success"}
        dialogMessage={isSuccessMessage.message || isSuccessMessage}
        isModalOpen={isSecondModalOpen}
        handleCloseModal={handleCloseSecondModal}
      />

<DialogBoxSuccess
        dialogTitle={"Success"}
        dialogMessage={isSuccessMessage.message || isSuccessMessage}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />

<DialogBoxError
        errorTitle={"Error"}
        errorMessage={isErrorMessage.error || isErrorMessage}
        handleCloseModalError={handleCloseModalError}
        isDialogOpenError={isDialogOpenError}
      />

      <DialogBoxYesNo 
      modalTitle={"Info"}
      description={"Do you wish to delete this product?"}
      firstButtonText={"Yes"}
      secondtButtonText={"No"}
      handleFirstClick={handleFirstClick}
      handleSecondClick={handleSecondClick}
      isDialogOpenYesNo={isFirstModalOpen}

      />

<DialogBoxUpdate
modalTitle={"Update Product"}
isDialogOpenUpdate={isDialogModalUpdateOpen}
handleCloseDialogUpdate={handleCloseDialogUpdate}
productFormData={productFormData}
handleInputChange={handleInputChange}
handleUpdate={handleUpdate}

/>


        </div>
    )
}

export default AdminProductDetail 