import React , {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from "../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';

const AdminNavHeader = ({
  handleViewAllProduct,
  // handleAddProduct,
  navTitle,
  productCategory,
  handleInputChange,
  // HandleHome,
  handleCart,
  // handleLogout
}) => {
const dispatch = useDispatch()
const navigate = useNavigate()


useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser) {
    navigate('/'); // Redirect to login if user data is not found in Local Storage
  } else {
    dispatch(loginSuccess(storedUser)); // Restore user data from Local Storage to Redux store
  }
}, [dispatch, navigate])


const handleLogout = () => {
  dispatch(logoutSuccess());
  localStorage.removeItem('user'); // Remove user data from Local Storage
  navigate('/');
}

const handleHome = () => {
  navigate('/home')
}
   

const handleAddProduct=()=>{
  if(navTitle === 'Admin')
    {
      navigate('/admin')
    
    }else{
      navigate('/usersProfile')
    }
}

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand me-3" href="#">
            Welcome {navTitle}!
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
            className="navbar-toggler"
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
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              {navTitle}
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
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={handleHome}
                >
                 { navTitle !== 'Admin'? 'Home': null}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  aria-current="page"
                  href="#"
                  onClick={handleAddProduct}
                >
                 { navTitle !== 'Admin'? 'Profile': 'Add Product'}
                </a>
              </li>
          
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleCart}>
                 { navTitle !== 'Admin'?  'Cart' : " "}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
               Logout
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