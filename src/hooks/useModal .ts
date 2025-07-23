import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState('create'); // 'create' | 'edit' | 'view'

  const openModal = (modalMode = 'create', modalData = null) => {
    setMode(modalMode);
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
    setMode('create');
  };

  return {
    isOpen,
    data,
    mode,
    openModal,
    closeModal
  };
};

export default useModal;
