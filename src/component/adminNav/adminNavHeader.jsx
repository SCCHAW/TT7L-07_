import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../../features/auth/authSlice";
import { cart } from "../assets";


const AdminNavHeader = ({
  handleViewAllProduct,
  // handleAddProduct,
  navTitle,
  productCategory,
  handleInputChange,
  handleCart,
  home,
  viewAllProduct,
  cartItems,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/"); // Redirect to login if user data is not found in Local Storage
    } else {
      dispatch(loginSuccess(storedUser)); // Restore user data from Local Storage to Redux store
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    localStorage.removeItem("user"); // Remove user data from Local Storage
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleAddProduct = () => {
    if (navTitle === "Admin") {
      navigate("/admin");
    } else {
      navigate("/usersProfile");
      console.log(navTitle);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-warning fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a
            className="navbar-brand me-3"
            href="#"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Welcome {navTitle}!
          </a>
        </div>

        <div className="d-flex justify-content-end align-items-end">
        

          {navTitle === "Admin" && viewAllProduct === "View All Product" && (
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
          )}

          {navTitle !== "Admin" && home === "Home" && (
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
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
            style={{ borderColor: "black", borderWidth: 2 }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end  bg-warning-subtle"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title"
              id="offcanvasDarkNavbarLabel"
              style={{ fontWeight: "bold", fontSize: 24 }}
            >
              {navTitle}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-black"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={handleHome}
                  style={{ color: "black" }}
                >
                  {navTitle !== "Admin" ? "Home" : null}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  aria-current="page"
                  href="#"
                  onClick={handleAddProduct}
                  style={{ color: "black" }}
                >
                  {navTitle !== "Admin" ? "Profile" : "Add Product"}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link "
                  aria-current="page"
                  href="#"
                  onClick={handleViewAllProduct}
                  style={{ color: "black" }}
                >
                  {navTitle !== "Admin" ? null : "View All Product"}
                </a>
              </li>

              
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={handleLogout}
                  style={{ color: "black" }}
                >
                  Logout
                </a>
              </li>
            </ul>
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavHeader;