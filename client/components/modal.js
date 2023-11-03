import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
};

export default Modal


// import React from 'react';
// import ReactDOM from 'react-dom';
// import Form from './form'
// import FocusTrap from 'focus-trap-react';
// export const Modal = ({
//   onClickOutside,
//   onKeyDown,
//   modalRef,
//   buttonRef,
//   closeModal,
//   onSubmit
// }) => {
//   return ReactDOM.createPortal(
//     <FocusTrap>
//       <aside
//         tag="aside"
//         role="dialog"
//         tabIndex="-1"
//         aria-modal="true"
//         className="modal-cover"
//         onClick={onClickOutside}
//         onKeyDown={onKeyDown}
//       >
//         <div className="modal-area" ref={modalRef}>
//           <button
//             ref={buttonRef}
//             aria-label="Close Modal"
//             aria-labelledby="close-modal"
//             className="_modal-close"
//             onClick={closeModal}
//           >
//             <span id="close-modal" className="_hide-visual">
//               Close
//             </span>
//             <svg className="_modal-close-icon" viewBox="0 0 40 40">
//               <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
//             </svg>
//           </button>
//           <div className="modal-body">
//             <Form onSubmit={onSubmit} />
//           </div>
//         </div>
//       </aside>
//     </FocusTrap>,
//     document.body
//   );
// };

// export default Modal;
