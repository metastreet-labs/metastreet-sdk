import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { ReservoirCollection } from "meta-street/lib/fetchers/getReservoirCollections";
import useSupportedReservoirCollections from "meta-street/lib/hooks/useSupportedReservoirCollections";
import Link from "next/link";
import { forwardRef, Fragment } from "react";
import MetaStreetBadge from "./MetaStreetBadge";
import Spinner from "./Spinner";

const SupportedCollectionsDropdown = () => {
  const { collections } = useSupportedReservoirCollections();

  return (
    <Menu as="div" className="relative z-10 flex">
      <Menu.Button className="flex items-center space-x-4 text-lg font-black italic">
        <MetaStreetBadge className="h-10 w-10" title="MetaStreet supported collections" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          as="ul"
          className="absolute right-1/2 top-10 flex w-72 translate-x-1/2 flex-col divide-y overflow-hidden rounded-xl border shadow-lg"
        >
          {collections &&
            collections.map((c, idx) => (
              <Menu.Item key={idx}>{({ active }) => <DropdownItem collection={c} active={active} />}</Menu.Item>
            ))}
          {!collections && (
            <Menu.Item>
              <a className="flex items-center justify-center bg-white py-4">
                <Spinner className="h-6 w-6" />
              </a>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type DropdownItemProps = {
  active: boolean;
  collection: ReservoirCollection;
};

type DropdownItemRef = HTMLAnchorElement;

const DropdownItem = forwardRef<DropdownItemRef, DropdownItemProps>(function DropdownItem(props, ref) {
  const { active, collection, ...rest } = props;
  return (
    <li>
      <Link href={`/collections/${collection.id}`}>
        <a
          ref={ref}
          className={classNames("flex w-full cursor-pointer items-center space-x-4 py-4 px-6 font-bold italic", {
            "bg-gray-50": active,
            "bg-white": !active,
          })}
          {...rest}
        >
          <img
            src={collection.image}
            alt={`${collection.name}'s logo.`}
            className="h-9 w-9 overflow-hidden rounded-full"
          />
          <span>{collection.name?.toUpperCase()}</span>
        </a>
      </Link>
    </li>
  );
});

export default SupportedCollectionsDropdown;
