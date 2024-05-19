import React from "react";

const DoubleDialogBox = ({
  firstTitle,
  firstDescription,
  firstButtonText,
  secondButtonText,
  handleCloseFirstModal,
  handleDeleteModal,
  isModalOpen
}) => {
  return (
    <div>
      {/* First Modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
        id="exampleModalToggle"
        aria-hidden={!isModalOpen}
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                {firstTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseFirstModal}
              ></button>
            </div>
            <div className="modal-body">{firstDescription}</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                {firstButtonText}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCloseFirstModal}
              >
                {secondButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Proceed to delete product
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              If you delete this product, it cannot be retrieved.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDeleteModal();
                }}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleDialogBox;