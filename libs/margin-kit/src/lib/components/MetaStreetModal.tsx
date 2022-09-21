import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { Fragment, ReactNode, useEffect, useState } from "react";

export type ModalState = {
  isOpen: boolean;
  onClose: () => void;
};

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

type ModalTitleProps = {
  children: ReactNode;
  className?: string;
};

const Title = (props: ModalTitleProps) => {
  const { className, children } = props;
  return (
    <Dialog.Title className={classNames("text-center text-2xl font-bold text-msPrimaryDark", className)}>
      {children}
    </Dialog.Title>
  );
};

type ModalBodyProps = {
  children: ReactNode;
  className?: string;
  onClose: () => void;
  hideCloseButton?: boolean;
};

const Body = (props: ModalBodyProps) => {
  const { className, children, onClose, hideCloseButton } = props;
  return (
    <Dialog.Panel
      className={classNames(
        "relative flex max-h-full w-[26rem] max-w-full flex-col overflow-hidden rounded-xl bg-white p-8 transition-all",
        className
      )}
    >
      {!hideCloseButton && (
        <button className="absolute top-4 right-4 p-2" onClick={onClose}>
          <XIcon className="h-5 w-5 text-gray-500" />
        </button>
      )}
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
      <Dialog onClose={onClose} className="relative z-[2147483648]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-msOverlay/60" area-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center">{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const MetaStreetModal = Object.assign(Modal, { Body, Title });

export default MetaStreetModal;
