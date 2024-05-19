import React from "react";

const DialogBoxError = ({
  isDialogOpenError,
  handleCloseModalError,
  errorTitle,
  errorMessage,
}) => {
  return (
    <div
      className={`modal fade ${isDialogOpenError ? "show" : ""}`}
      style={{ display: isDialogOpenError ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!isDialogOpenError}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-bg-danger">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {errorTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                handleCloseModalError();
              }}
            ></button>
          </div>
          <div className="modal-body bg-danger-subtle">{errorMessage}</div>
          <div className="modal-footer bg-danger-subtle">
            <button
              type="button"
              className="btn text-bg-danger"
              data-bs-dismiss="modal"
              onClick={() => {
                handleCloseModalError();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBoxError;