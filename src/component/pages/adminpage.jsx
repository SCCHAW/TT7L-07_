import React , {useState} from "react";
import "./adminpage.css";
import AdminNavHeader from "../adminNav/adminNavHeader";

const Adminpage = () => {
    const initialFormState = {
        productName: "",
        productDescription: "",
        productPrice: "",
        productYear: "",
        productCategory: "",
        productImage:""
      };

      const [productFormData, setProductFormData] = useState(initialFormState)

    const handleSubmitProduct =() => {
        console.log("product")
        const product = {
            productName: productFormData.productName,
            productDescription: productFormData.productDescription,
            productPrice: productFormData.productPrice,
            productYear: productFormData.productYear,
            // productCategory: productFormData.productCategory,
            productImage:productFormData.productImage
          };
          console.log(product)


    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
       setProductFormData({
          ...productFormData,
          [name]: value,
        });
      };


  return (
    <div>
      <AdminNavHeader />
      <div className="container mt-5 yellow-200">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="mb-4 text-center">Add Product</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name</label>
                  <input type="text" className="form-control" id="productName" placeholder="Enter product name" name="productName" value={productFormData.productName} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">Product Description</label>
                  <textarea className="form-control" id="productDescription" rows="3" placeholder="Enter product description" name="productDescription" value={productFormData.productDescription} onChange={handleInputChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">Product Price</label>
                  <input type="number" className="form-control" id="productPrice" placeholder="Enter product price" name="productPrice" value={productFormData.productPrice} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="productYear" className="form-label">Product Year</label>
                  <input type="number" className="form-control" id="productYear" placeholder="Enter product year" name="productYear" value={productFormData.productYear} onChange={handleInputChange}/>
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="productCategory" className="form-label">Product Category</label>
                  <select className="form-select" id="productCategory" aria-label="Default select example" name="productCategory" value={productFormData.productCategory} onChange={handleInputChange}>
  <option value="" disabled selected>Open this select menu</option>
  <option value="1">Laptops</option>
  <option value="2">Printers</option>
  <option value="3">Desktop</option>
  <option value="4">Phone</option>
</select>
                </div> */}
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">Product Image</label>
                  <input type="text" className="form-control" id="productImage" placeholder="Enter product image URL" name="productImage" value={productFormData.productImage} onChange={handleInputChange}/>
                </div>
                <div className="text-center">
                  <button type="submit" onClick={handleSubmitProduct} className="btn btn-primary">Add Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;