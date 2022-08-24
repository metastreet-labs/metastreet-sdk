import { Menu, Transition } from "@headlessui/react";
import { ChevronDoubleDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

export const ConnectWalletButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="text-textImportantColor bg-cardBackgroundColor focus-visible:ring-cardBackgroundColor flex h-14 w-48 items-center justify-center rounded-md p-3 text-base font-medium hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
    >
      <div className="flex w-full flex-1 items-center justify-between">
        <UserCircleIcon className="h-10 w-10" />
        <div className="flex flex-1 justify-center">
          <span>Connect wallet</span>
        </div>
      </div>
    </button>
  );
};

interface MenuItemButtonProps {
  warning?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const MenuItemButton = ({ warning = false, onClick, children }: MenuItemButtonProps) => {
  return (
    <Menu.Item>
      {({ active }) => {
        return (
          <button
            className={`${active ? "bg-gray-50" : ""} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            onClick={onClick}
          >
            {typeof children === "string" ? (
              <span className={`${warning ? "text-orange-500" : "text-purple-900"} font-medium`}>{children}</span>
            ) : (
              children
            )}
          </button>
        );
      }}
    </Menu.Item>
  );
};

interface WalletInfoProps {
  address: string;
}

export const WalletInfo = ({ address }: WalletInfoProps) => {
  return <span className="whitespace-nowrap">{address}</span>;
};

interface WalletInfoButtonProps {
  menuItems: MenuItemButtonProps[];
  content: React.ReactNode;
  davatar: React.ReactNode;
}

export const WalletInfoButton = ({ menuItems, davatar, content }: WalletInfoButtonProps) => {
  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button className="text-textImportantColor bg-cardBackgroundColor focus-visible:ring-cardBackgroundColor flex h-14 w-52 items-center justify-end rounded-md p-3 text-base font-medium hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75">
        <div className="flex flex-1 items-center justify-between">
          {davatar}
          <div className="flex flex-1 items-center justify-center">{content}</div>
          <ChevronDoubleDownIcon className="h-3 w-3" aria-hidden="true" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="divide-backgroundColor ring-textImportantColor absolute z-50 mt-2 w-48 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none">
          <div className="px-3 py-2">
            {menuItems.map((props, ind) => (
              <MenuItemButton key={`walletStatus-menuItem-${ind}`} {...props} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
