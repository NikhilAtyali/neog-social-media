import "./Modal.css";
export const Modal = ({ children, open, close }) => {
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="overlay-styles" onClick={close} />
      <div className="modal-styles">
        <div>
          <button onClick={close}>Close</button>
        </div>
        {children}
      </div>
    </>
  )
}