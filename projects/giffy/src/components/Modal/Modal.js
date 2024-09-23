import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = ({ children, onClose }) => {
    return <article className="modal">
        <div className="modal-content">
            <button className="btn" onClick={onClose}>🅧</button>
            {children}
        </div>
    </article>
};

export const ModalPortal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <Modal onClose={onClose}>
            {children}
        </Modal>,
        document.getElementById("modal-root")
    )
}