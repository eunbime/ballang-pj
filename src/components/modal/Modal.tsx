import { useModal } from '@/contexts/modal-context/ModalContext';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const { close } = useModal();

  return (
    <div
      onClick={close}
      className="bg-black/40 fixed top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center z-20"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] p-10 bg-white rounded-md shadow-2xl px-5 py-8"
      >
        {children}
      </section>
    </div>
  );
}

export default Modal;
