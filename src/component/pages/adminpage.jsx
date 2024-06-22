import React , {useState, useEffect} from "react";
import "./adminpage.css";
import AdminNavHeader from "../adminNav/adminNavHeader";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DialogBoxError from "../dialogbox/dialogError";
import DialogBoxSuccess from "../dialogbox/dialogSuccess";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";

const Adminpage = () => {
    const initialFormState = {
        productName: "",
        productDescription: "",
        productPrice: "",
        productYear: "",
        productCategory: "",
        productImage:"",
        productLink:"",
        productPlatform:""
      };
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const storedUserData = JSON.parse(localStorage.getItem('user'));
      const adminFirstName = storedUserData ? storedUserData.firstName: ""
      const [userFirstName, setUserFirstName] = useState(adminFirstName)

      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(loginSuccess(storedUser)); // Restore user data from Local Storage to Redux store
          setUserFirstName(storedUser.firstName);
        }
        console.log("userFirstName", userFirstName)
      }, [dispatch]);
    
      useEffect(() => {
        localStorage.setItem('firstName', userFirstName);
      }, [userFirstName]);
    
    
      if (!userFirstName) {
        <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      }

      console.log("adminStoreData", storedUserData)

      const [productFormData, setProductFormData] = useState(initialFormState)

      const [isDialogOpenError, setIsDialogOpenError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
  }

  
      const handleSubmitProduct = async (event) => {
        event.preventDefault();
        console.log("product");
    
        if(!productFormData.productName || !productFormData.productDescription || !productFormData.productPrice || !productFormData.productImage 
          || !productFormData.productYear || !productFormData.productCategory || !productFormData.productLink || !productFormData.productPlatform
        ){
          setIsErrorMessage("All fields are required")
          setIsDialogOpenError(true)
          return
        }
    
        const product = {
          productName: productFormData.productName,
          productDescription: productFormData.productDescription,
          productPrice: productFormData.productPrice,
          productYear: productFormData.productYear,
          productCategory: productFormData.productCategory,
          productImage: productFormData.productImage,
          productLink: productFormData.productLink,
          productPlatform: productFormData.productPlatform,
        };
        console.log(product);
    
        try {
          const response = await axios.post('http://localhost:3000/api/products', product)
    
          console.log('product success--', response.data) 
          if(response.data){
            setIsSuccessMessage(response.data.message)
            setIsModalOpen(true)
            setProductFormData(initialFormState)
          }
        } catch (error) {
          setIsErrorMessage(error.response.data);
          setIsDialogOpenError(true);
          console.log("error 1", error.response.data);
          console.log("error2, ", error.response);
        }
      };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
       setProductFormData({
          ...productFormData,
          [name]: value,
        });
      };

      const handleViewAllProduct = () => {
        navigate('/adminViewProduct')
      }

      const handleCloseModalError = () => {
        setIsDialogOpenError(false);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

      


  return (
    <div>
      <AdminNavHeader handleViewAllProduct={handleViewAllProduct} navTitle={userFirstName} />
      <div className="container mt-5 yellow-200">
        <div className="row justify-content-center col-md-10">
          <div className="col-md-10">
            <div className="card p-4">
              <h2 className="mb-4 text-center">Add Product</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                    name="productName"
                    value={productFormData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Product Description
                  </label>
                  <textarea
                    className="form-control"
                    id="productDescription"
                    rows="3"
                    placeholder="Enter product description"
                    name="productDescription"
                    value={productFormData.productDescription}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">
                    Product Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    placeholder="Enter product price"
                    name="productPrice"
                    value={productFormData.productPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productYear" className="form-label">
                    Product Year
                  </label>
                  <select
                    className="form-select"
                    id="productYear"
                    name="productYear"
                    value={productFormData.productYear}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="productCategory" className="form-label">
                    Product Category
                  </label>
                  <select
                    className="form-select"
                    id="productCategory"
                    aria-label="Default select example"
                    name="productCategory"
                    value={productFormData.productCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">
                      Open this select menu
                    </option>
                    <option value="Laptops">Laptops</option>
                    <option value="Printers">Printers</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">
                    Product Image
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productImage"
                    placeholder="Enter product image URL"
                    name="productImage"
                    value={productFormData.productImage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productLink" className="form-label">
                    Product Link
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productLink"
                    placeholder="Enter product URL"
                    name="productLink"
                    value={productFormData.productLink}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productPlatform" className="form-label">
                    Product Platform
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productPlatform"
                    placeholder="Enter product Platform: Lazada,Shopee,..."
                    name="productPlatform"
                    value={productFormData.productPlatform}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={handleSubmitProduct}
                    className="btn btn-primary"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

        {/* error Modal */}
        < DialogBoxError
        errorTitle={"Error"}
        errorMessage={isErrorMessage.error || isErrorMessage}
        handleCloseModalError={handleCloseModalError}
        isDialogOpenError={isDialogOpenError}
      />

         {/* Success Modal */}
         <DialogBoxSuccess
        dialogTitle={"Success"}
        dialogMessage={isSuccessMessage.message || isSuccessMessage}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Adminpage;