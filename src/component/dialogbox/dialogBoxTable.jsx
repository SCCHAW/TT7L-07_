import React from 'react';

const ProductComparisonModal = ({ isDialogTableOpen, handleDialogTableClose, cartItems }) => {
  return (
    <div 
    className={`modal fade ${
        isDialogTableOpen ? "show" : ""} modal-dialog-scrollable`}
      style={{
        display: isDialogTableOpen ? "block" : "none",
        margin: "100px auto",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!isDialogTableOpen}
    role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Comparison</h5>
            <button type="button" className="close" onClick={handleDialogTableClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Description</th>
              
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td className='col-5'>{item.productDescription}</td>
                    <td className='col-3' style={{alignItems:'flex-end', justifyContent:'flex-end'}}>RM {item.productPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonModal;