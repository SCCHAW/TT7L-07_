import React from "react";

const DialogBoxSuccess = ({ dialogTitle, dialogMessage, handleCloseModal, isModalOpen }) => {
  return (
    <div
    className={`modal fade ${isModalOpen ? "show" : ""}`}
      style={{ display: isModalOpen ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!isModalOpen}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body bg-warning-subtle">{dialogMessage}</div>
          <div className="modal-footer bg-warning-subtle">
            <button
              type="button"
              className="btn bg-warning"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBoxSuccess;