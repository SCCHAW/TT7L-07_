import React from "react";
import './adminNavHeader.css'

const AdminNavHeader = ({
  handleViewAllProduct,
  handleAddProduct,
  navTitle,
  productCategory,
  handleInputChange
}) => {
  return (
    <nav className="navbar navbar-dark bg-warning fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand me-3" href="#">
            {navTitle}
          </a>
        </div>
        <div className="d-flex justify-content-end align-items-end">
          <select
            className="form-select me-2"
            aria-label="Default select example"
            name="productCategory"
            value={productCategory}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Laptops">Laptops</option>
            <option value="Printers">Printers</option>
            <option value="Desktop">Desktop</option>
            <option value="Phone">Phone</option>
          </select>

          <button
            className="navbar-toggler bg-secondary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end bg-warning-subtle"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Admin
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="offcanvas-body"
                  aria-current="page"
                  href="#"
                  onClick={handleAddProduct}
              
                >
                  Add Product
                </a>
              </li>
              <li className="nav-item">
                <a className="offcanvas-title" href="#" onClick={handleViewAllProduct}>
                  View All product
                </a>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavHeader;