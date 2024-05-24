import React from "react";

const DialogBoxYesNo = ({
  modalTitle,
  description,
  firstButtonText,
  secondtButtonText,
  handleFirstClick,
  handleSecondClick,
  isDialogOpenYesNo,
}) => {
  return (
    <div
      className={`modal fade ${isDialogOpenYesNo ? "show" : ""}`}
      style={{ display: isDialogOpenYesNo ? "block" : "none" }}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!isDialogOpenYesNo}
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
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{description}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleFirstClick}
            >
              {firstButtonText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSecondClick}
            >
              {secondtButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBoxYesNo;