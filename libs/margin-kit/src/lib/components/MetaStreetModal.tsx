import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactNode, useEffect, useState } from "react";
import XMarkIcon from "./icons/XMarkIcons";

export interface ModalState {
  isOpen: boolean;
  onClose: () => void;
}

export const useModalStateWithKey = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (key) setIsOpen(true);
  }, [key]);

  const openModal = () => setKey((key) => key + 1);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal, key };
};

interface ModalTitleProps {
  children: ReactNode;
  className?: string;
}

const Title = (props: ModalTitleProps) => {
  const { className, children } = props;
  return <Dialog.Title className={classNames("bwl-modal-title", className)}>{children}</Dialog.Title>;
};

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
  onClose: () => void;
  hideCloseButton?: boolean;
}

const Body = (props: ModalBodyProps) => {
  const { className, children, onClose, hideCloseButton } = props;
  return (
    <Dialog.Panel className={classNames("bwl-modal-panel", className)}>
      {!hideCloseButton ? (
        <button className="bwl-modal-panel-close-button" onClick={onClose}>
          <XMarkIcon className="bwl-modal-panel-close-button-icon" />
        </button>
      ) : null}
      {children}
    </Dialog.Panel>
  );
};

type ModalProps = ModalState & {
  children: ReactNode;
};

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, children } = props;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="bwl-modal-dialog">
        <Transition.Child
          as={Fragment}
          enter="bwl-modal-overlay-transition-enter"
          enterFrom="bwl-modal-overlay-transition-enter-from"
          enterTo="bwl-modal-overlay-transition-enter-to"
          leave="bwl-modal-overlay-transition-leave"
          leaveFrom="bwl-modal-overlay-transition-leave-from"
          leaveTo="bwl-modal-overlay-transition-leave-to"
        >
          <div className="bwl-modal-overlay" area-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="bwl-modal-body-transition-enter"
          enterFrom="bwl-modal-body-transition-enter-from"
          enterTo="bwl-modal-body-transition-enter-to"
          leave="bwl-modal-body-transition-leave"
          leaveFrom="bwl-modal-body-transition-leave-from"
          leaveTo="bwl-modal-body-transition-leave-to"
        >
          <div className="bwl-modal-body">{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const MetaStreetModal = Object.assign(Modal, { Body, Title });

export default MetaStreetModal;
