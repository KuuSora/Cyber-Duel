
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, buttonText, onButtonClick }) => {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-8 max-w-2xl text-center shadow-lg shadow-green-500/20">
        <h2 className="text-3xl font-bold text-green-400 mb-4">{title}</h2>
        <div className="text-gray-300 mb-6 space-y-4">
          {children}
        </div>
        <button
          onClick={onButtonClick}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
