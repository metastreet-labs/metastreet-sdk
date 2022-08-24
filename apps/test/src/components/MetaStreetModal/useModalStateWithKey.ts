import { useEffect, useState } from "react";

// This hook provides modal state(management), with `key` that increments every time the modal closes
// the `key` can be used to reset modal state after it closes
export default function useModalStateWithKey() {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isOpen) setTimeout(() => setKey((k) => k + 1), 300);
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal, key };
}
