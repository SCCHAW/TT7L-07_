import React from "react";

const DialogBoxUpdate = ({
  isDialogOpenUpdate,
  modalTitle,
  handleUpdate,
  handleCloseDialogUpdate,
  productFormData,
  handleInputChange
}) => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
  }



  return (
    <div>
      <div
        className={`modal fade ${isDialogOpenUpdate ? "show" : ""}`}
        style={{ display: isDialogOpenUpdate ? "block" : "none" }}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isDialogOpenUpdate}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseDialogUpdate}
              ></button>
            </div>
            <div className="modal-body">
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
                    <option value="">Open this select menu</option>
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
                    placeholder="Enter product platform: Lazada,Shopee,..."
                    name="productPlatform"
                    value={productFormData.productPlatform}
                    onChange={handleInputChange}
                    required
                  />
                </div>
           
           
              </form>
            </div>
            <div className="modal-footer">
              <button
              style={{width:"20%", height:48}} 
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseDialogUpdate}
              >
                Close
              </button>
              <button style={{width:"20%"}} type="button" className="btn btn-primary" onClick={handleUpdate}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBoxUpdate;