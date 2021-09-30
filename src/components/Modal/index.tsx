import { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: () => void;
}

ReactModal.setAppElement('#root');

export function Modal({ isOpen, children, setIsOpen }: ModalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
      setModalStatus(isOpen)
  }, [isOpen])


  return (
    <ReactModal
    onRequestClose={setIsOpen}
    isOpen={modalStatus}
    ariaHideApp={false}
    className="react-modal-content"
    overlayClassName="react-modal-overlay"
    >
        {children}
    </ReactModal>
  );
}