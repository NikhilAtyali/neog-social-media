import { useEffect } from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
export const Modal = ({ children, open, close }) => {
  useEffect(() => {
    open && (document.body.style.overflow = "hidden");
    !open && (document.body.style.overflow = "unset");
  }, [open]);
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="overlay-styles" onClick={close} />
      <div className="modal-styles">
      <div className="close-modal">
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </>
  )
}