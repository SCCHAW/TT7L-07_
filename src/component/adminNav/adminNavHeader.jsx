const AdminNavHeader =()=> {
    return (
        <div>
 <nav className="navbar navbar-dark bg-warning fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand black-text" href="#">
            Admin page
          </a>
          <button
            className="navbar-toggler bg-dark"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" ></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Admin Account Page
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
                  <a className="nav-link active" aria-current="page" href="#">
                    Add product
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    View all product
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
                <button className="btn btn-warning" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
        </div>
    )
}
export default AdminNavHeader