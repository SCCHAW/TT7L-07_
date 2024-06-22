import React from "react";

const DialogShoppingCart = ({
  handleCloseCartDialog,
  // shoppingCart,
  isDialogCartOpen,
  // handleCart,
  handleRemoveCartItem,
  cartItems = [],
  // total_per_quantity,
  // handleIncreaseProduct_Quantity,
  // handleDecreaseProduct_Quantity,
  // totalProductPrice,
  // totalPerProductPrice
}) => {
    



  return (
    <div
      className={`modal fade ${
        isDialogCartOpen ? "show" : ""
      } modal-dialog-scrollable`}
      style={{
        display: isDialogCartOpen ? "block" : "none",
        margin: "100px auto",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!isDialogCartOpen}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Comparison Cart
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseCartDialog}
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="row mb-3"
              style={{ marginLeft: 20, marginRight: 20 }}
            >
              <div className="" style={{ flex: 1, display: "flex" }}>
                <h2>Comparison Cart</h2>
              </div>
              <div className=" text-end" style={{ flex: 1 }}>
                <span>{cartItems.length} items</span>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-7" style={{ width: "100%"}}>
                <div style={{marginLeft:10, marginRight:10}}>
                  {cartItems.map((item, index) => (
                    <div className="row my-2" key={index}>
                      <div className="col-2">
                        <img
                          src={item.productImage}
                          alt="Item"
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: "100%",
                            objectFit: 'cover',
                            
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <h5>{item.productName}</h5>
                        <p>
                          {item.productDescription.length > 100
                            ? item.productDescription.substring(0, 100) + "..."
                            : item.productDescription}
                        </p>
                      </div>

                      <div
                        className="col-6 d-flex align-items-center"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div
                          className="col-5"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          {/* <button className="btn btn-outline-secondary btn-sm" onClick={()=> handleDecreaseProduct_Quantity(item, index)}>
                            -
                          </button>
                          <span className="m-2 auto" style={{}}>
                            {total_per_quantity > 1 ? total_per_quantity: item.quantity}
                          </span>
                          <button className="btn btn-outline-secondary btn-sm" onClick={()=> handleIncreaseProduct_Quantity(item, index)}>
                            +
                          </button> */}
                        </div>

                       <div className="col-4">
                        <h5>{item.productPlatform}</h5>
              
                      </div>


                        <div>
                          <span className="ms-3">{`RM${item.totalPrice > 0 ?  item.totalPrice : item.productPrice}`}</span>
                        </div>

                        <div>
                          <button
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={()=> handleRemoveCartItem(item)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="col-4 bg-warning-subtle">
                <div className="container">
                  <div className="row mb-3">
                    <h3>Summary</h3>
                  </div>
                  <div className="row my-3">
                    <div className="col-8">
                      <p>Items</p>
                    </div>
                    <div className="col-4">
                      <p>{RM${totalPerProductPrice > 0 ?  totalPerProductPrice: 0}}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <h5>Shipping</h5>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="5">(RM)Standard Delivery - 5.00</option>
                      <option value="10">(RM)Express Delivery - 10.00</option>
                    </select>
                  </div>
                  <div className="row my-3">
                    <h5>GIVE CODE</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your code"
                    />
                  </div>
                  <div className="row my-3">
                    <div className="col-8">
                      <h5>Total Price</h5>
                    </div>
                    <div className="col-4">
                      <h5>€137.00</h5>
                    </div>
                    <button className="btn btn-dark w-100 mt-2">
                      Checkout
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseCartDialog}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogShoppingCart;