import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";

interface InfoDropdownProps {
  label: ReactNode;
  value: ReactNode;
  children: ReactNode;
  labelVariant?: "normal" | "important";
}

const InfoDropdown = (props: InfoDropdownProps) => {
  const { label, value, children, labelVariant } = props;
  const [open, setOpen] = useState(false);

  return (
    <Disclosure>
      <div className="flex flex-col">
        <div className="flex items-center">
          <InfoRowLabel variant={labelVariant}>
            <Disclosure.Button className="space-x- flex items-center" type="button" onClick={() => setOpen((o) => !o)}>
              {label}
              <ChevronDownIcon
                className={classNames("h-5 w-5 transition-all", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
          </InfoRowLabel>
          <InfoRowValue className="font-semibold">{value}</InfoRowValue>
        </div>
        <Transition
          as="div"
          className="mt-1 overflow-hidden"
          enter="transition-all duration-300 ease-out"
          enterFrom="max-h-[0px]"
          enterTo="max-h-[5rem]"
          leave="transition-all duration-300 ease-out"
          leaveFrom="max-h-[5rem]"
          leaveTo="max-h-[0px]"
        >
          <Disclosure.Panel className={classNames("ml-4 flex flex-col space-y-2 overflow-hidden transition-all")}>
            {children}
          </Disclosure.Panel>
        </Transition>
      </div>
    </Disclosure>
  );
};

export default InfoDropdown;
