
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, buttonText, onButtonClick }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-modal-bg)' }}>
      <div 
        className="rounded-lg p-8 max-w-2xl text-center shadow-lg"
        style={{ 
          backgroundColor: 'var(--color-bg-primary)',
          borderColor: 'var(--color-modal-border)', 
          borderWidth: 2,
          boxShadow: `0 0 15px var(--color-modal-shadow)`,
        }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-accent)' }}>{title}</h2>
        <div className="mb-6 space-y-4" style={{ color: 'var(--color-text-secondary)' }}>
          {children}
        </div>
        <button
          onClick={onButtonClick}
          className="font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
          style={{ backgroundColor: 'var(--color-accent-green)', color: 'white' }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;