import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 text-4xl hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">{children}</div>
        <div className="flex justify-end mt-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#2d6a4f] text-white rounded-md hover:bg-[#1b4332] mr-2"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
