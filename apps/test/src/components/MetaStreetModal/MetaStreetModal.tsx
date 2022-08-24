import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

export interface ModalState {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalTitleProps {
  children: ReactNode;
  className?: string;
}

const Title = (props: ModalTitleProps) => {
  const { className, children } = props;
  return (
    <Dialog.Title className={classNames("text-textImportantColor text-center text-xl font-semibold", className)}>
      {children}
    </Dialog.Title>
  );
};

type ModalProps = ModalState & {
  children: ReactNode;
  hideCloseButton?: string;
  className?: string;
};

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, children, className, hideCloseButton } = props;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[1000]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" area-hidden="true" />
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
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel
              className={classNames(
                "relative flex max-h-full w-[26rem] max-w-full flex-col overflow-hidden rounded-xl bg-white p-4 pt-8 transition-all",
                className
              )}
            >
              {hideCloseButton ? null : (
                <button className="absolute top-2 right-2 p-2" onClick={onClose}>
                  <XMarkIcon className="h-4 w-4 text-black" />
                </button>
              )}
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

const MetaStreetModal = Object.assign(Modal, { Title });

export default MetaStreetModal;
